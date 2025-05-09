import { FC, MouseEvent } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getButtonAnimationClass, getButtonClass } from '../../utilities/styling';
import { ButtonProps } from './';
import { useUniformContext } from '@uniformdev/context-react';

const Button: FC<ButtonProps> = ({
  href,
  copy,
  style,
  className,
  onClick,
  disable = false,
  animationType,
  clickTags = [],
}) => {
  const { context } = useUniformContext();

  const buttonStyle = classNames(
    'btn rounded-none',
    className,
    animationType ? getButtonAnimationClass(style, animationType) : getButtonClass(style),
    {
      'btn-disabled': disable,
    }
  );

  const buttonContent = () => (
    <>
      {copy}
      {style === 'link' && (
        <svg
          className="mx-2 stroke-primary"
          width="23"
          height="25"
          viewBox="0 0 23 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 12.7561L20.4878 12.7561" stroke="stroke-primary" strokeWidth="3" />
          <path d="M10.8823 23L20.881 12.4956L10.8823 2" stroke="stroke-primary" strokeWidth="3" />
        </svg>
      )}
    </>
  );

  // send click tags to the context
  const setClickTagEnrichments = async () => {
    if (clickTags.length > 0) {
      try {
        await context.update({
          enrichments: clickTags,
        });
      } catch (error) {
        console.error('Failed to update context with click tags:', error);
      }
    }
  };

  // Handle click events for regular buttons
  const handleButtonClick = async (e?: MouseEvent<HTMLButtonElement>) => {
    try {
      await setClickTagEnrichments();
      onClick?.(e);
    } catch (error) {
      console.error('Failed to process button click:', error);
      onClick?.(e);
    }
  };

  // Handle click events for link buttons
  const handleLinkClick = async () => {
    try {
      await setClickTagEnrichments();
    } catch (error) {
      console.error('Failed to process link click:', error);
    }
  };

  // Only add click handlers when needed
  const shouldTrackClicks = clickTags.length > 0;

  return href ? (
    <Link
      role="button"
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      className={buttonStyle}
      onClick={shouldTrackClicks ? handleLinkClick : undefined}
    >
      {buttonContent()}
    </Link>
  ) : (
    <button onClick={shouldTrackClicks ? handleButtonClick : onClick} className={buttonStyle}>
      {buttonContent()}
    </button>
  );
};

export default Button;
