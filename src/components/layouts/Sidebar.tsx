import { TABS_SIDEBAR } from '@/constants/sidebar';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CaretLeft } from 'phosphor-react';
import { Line } from '../Line';
import { Logo } from '../Logo';

export const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <aside className="h-full w-full flex-col gap-4 items-center bg-white px-6 py-8 relative hidden lg:flex border-r border-r-[#00000010]">
      <Logo className="hidden lg:flex" />
      <Line />
      <div className="w-full flex flex-col items-center">
        <ul className="flex flex-col gap-4 mt-8">
          {TABS_SIDEBAR.map((tab) => {
            const isActive = tab.route === pathname;

            return (
              <Link
                key={tab.title}
                className="flex items-center justify-start gap-2 py-3"
                href={tab.route}
              >
                <div>{tab.icon(isActive)}</div>
                <span
                  className={clsx('text-base', {
                    'text-primary': isActive,
                  })}
                >
                  {tab.title}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      {/* <button className="rounded-full bg-primary flex items-center justify-center w-8 h-8 absolute top-8 right-[-10px] hover:bg-opacity-80 active:bg-opacity-60">
        <CaretLeft color="#FFF" size={20} />
      </button> */}
    </aside>
  );
};
