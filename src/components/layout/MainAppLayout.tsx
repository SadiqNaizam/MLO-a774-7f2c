import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-background', className)}>
      <Sidebar />
      <Header />
      {/* Main content area positioned to the right of the sidebar and below the header */}
      <main
        className={cn(
          'ml-56',                     // Offset for the fixed sidebar (width w-56)
          'mt-[70px]',                 // Offset for the fixed header (height h-[70px])
          'p-6',                       // Padding for the content area itself (as per mainContent.layout)
          'min-h-[calc(100vh-70px)]',  // Ensure content area fills at least the remaining viewport height
          'min-w-0',                   // From mainContent.sizing in Layout Requirements
          'overflow-y-auto'            // From mainContent.sizing in Layout Requirements
        )}
      >
        {/* Inner container for content, applying 'flex flex-col gap-6' from mainContent.container */}
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
