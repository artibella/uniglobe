import { FC, useMemo } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { checkIsCurrentRoute } from './helpers';
import { LinkProps } from '.';

export const HeaderLink: FC<LinkProps> = ({ title, link, styles }) => {
  const router = useRouter();
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);
  return (
    <li tabIndex={0}>
      <Link
        className={classNames(
          '!rounded-none text-base focus:!text-secondary-content active:!text-secondary-content hover:text-secondary-content',
          styles?.link,
          {
            'font-extrabold': isCurrentRoute,
            [styles?.activeLink || '']: isCurrentRoute,
          }
        )}
        href={link?.path || '#'}
        locale={false}
      >
        {title}
      </Link>
    </li>
  );
};
