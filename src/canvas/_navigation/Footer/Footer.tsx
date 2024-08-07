import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from '../../../components/Image';
import classNames from 'classnames';
import { UniformRichText, UniformSlot } from '@uniformdev/canvas-react';
import { ScreenContainer } from '../../../components/Container';
import { getMediaUrl } from '../../../utilities';
import { useUniformContext } from '@uniformdev/context-react';
import { FooterProps } from '.';

const BuildTimestamp = dynamic(() => import('../../../components/BuildTimestamp'), { ssr: false });

export const Footer: FC<FooterProps> = ({ logo, displayBuildTimestamp = false, copyright, styles }) => {
  const imageUrl = getMediaUrl(logo);
  const context = useUniformContext({ throwOnMissingProvider: false });
  // callback to set user OS
  const setUserOS = (os: string) => {
    context?.context.update({
      quirks: {
        os: os,
      },
    });
  };

  return (
    <div className={classNames('bg-secondary', styles?.container)}>
      <ScreenContainer>
        <footer
          className={classNames(
            'footer py-10 flex flex-col-reverse md:flex-row justify-between border-info-content w-full border-t-[1px]',
            styles?.footerSection
          )}
        >
          <div className="w-full md:w-1/2">
            <Image src={imageUrl} width="200" height="50" alt="Uniform" />
            {displayBuildTimestamp && <BuildTimestamp style={styles?.buildTimestamp} />}
            <div
              className="footer-content text-secondary-content"
              dangerouslySetInnerHTML={{ __html: `2023 ${copyright}` }}
            />
            <div className="footer-content text-secondary-content">
              <UniformRichText parameterId="footerText" />
            </div>
            <div>
              <button className="inline-block mr-5" onClick={() => setUserOS('android')}>
                Android
              </button>
              <button onClick={() => setUserOS('ios')}>iOS</button>
            </div>
          </div>
          <UniformSlot name="section" />
          <div className="flex">
            <UniformSlot name="iconLinks" />
          </div>
        </footer>
      </ScreenContainer>
    </div>
  );
};
