import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';
import { Paragraph } from '../Paragraph';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const LayoutWithSidebar = ({
  children,
  title = 'This is the default title',
}: Props) => (
  <div className="flex h-full">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex w-full pb-8 bg-background h-full min-h-screen">
      <div className="w-[16%] fixed h-[100vh]">
        <Sidebar />
      </div>
      <div className="w-[84%] ml-[16%]">
        <header className="flex w-full justify-between items-center bg-white px-8 py-4">
          <div className="flex flex-col ">
            <Paragraph>Olá João</Paragraph>
          </div>
          <div className="flex items-center gap-4">
            <Paragraph>João Guilherme</Paragraph>
          </div>
        </header>
        <div className="mt-8 px-8">{children}</div>
      </div>
    </div>
  </div>
);
