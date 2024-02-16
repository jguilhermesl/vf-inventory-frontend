import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';
import { Paragraph } from '../Paragraph';
import { Logo } from '../Logo';
import { List, SignOut, X } from 'phosphor-react';
import { TABS_SIDEBAR } from '@/constants/sidebar';
import clsx from 'clsx';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const LayoutWithSidebar = ({
  children,
  title = 'This is the default title',
}: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { user, handleSignOut } = useAuth();

  return (
    <div className="flex h-full">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full pb-8 bg-background h-full min-h-screen transition-all duration-1000 ease-in-out">
        <div className="lg:w-[16%] fixed h-[100vh] hidden lg:flex">
          <Sidebar />
        </div>
        <div className="w-full lg:w-[84%] lg:ml-[16%] ">
          <header className="flex w-full justify-between items-center bg-white px-8 py-6 top-0 border-b border-b-[#00000010] shadow ">
            <button
              className="flex lg:hidden"
              onClick={() => setSidebarIsOpen(true)}
            >
              <List size={24} color="#b80105" />
            </button>
            <Logo className="lg:hidden flex" />
            <div className="flex items-center gap-4">
              <Paragraph>{user.name}</Paragraph>
              <button
                className="lg:flex hidden w-8 h-8 rounded-full bg-primary items-center justify-center"
                onClick={handleSignOut}
              >
                <SignOut size={20} color="#fff" />
              </button>
            </div>
          </header>
          <div className="mt-6 px-4 lg:px-8">{children}</div>
        </div>
      </div>
      {sidebarIsOpen && (
        <div
          className={clsx(
            'bg-[#00000030] h-[100vh] w-full fixed top-0 right-0 left-0 transition-all duration-1000 ease-in-out flex lg:hidden'
          )}
        >
          <div
            className={clsx(
              'bg-white flex w-full h-content flex-col z-100 transition-all duration-1000 ease-in-out ',
              {
                'mr-[100%] ': !sidebarIsOpen,
              }
            )}
          >
            <header className="flex w-[full] justify-between items-center bg-white py-6 px-8 top-0 border-b border-b-[#00000010] ">
              <button
                className="flex lg:hidden"
                onClick={() => setSidebarIsOpen(false)}
              >
                <X size={24} color="#b80105" />
              </button>
              <Logo className="lg:hidden flex" />
              <div className="flex items-center gap-4">
                <Paragraph>João Guilherme</Paragraph>
              </div>
            </header>
            <ul className="flex flex-col">
              {TABS_SIDEBAR.map((tab) => {
                return (
                  <Link
                    href={tab.route}
                    className="flex items-center gap-2 py-6 border-y cursor-pointer border-y-[#00000010] hover:bg-[#00000005] px-4"
                  >
                    <div>{tab.icon(false)}</div>
                    <Paragraph className="">{tab.title}</Paragraph>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
