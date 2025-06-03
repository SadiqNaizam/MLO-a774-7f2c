import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Assuming SidebarNav is in src/components/Dashboard/

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav handles its own dimensions (w-56, h-screen), background (bg-sidebar),
  // and internal flex layout (flex flex-col).
  // This 'aside' wrapper provides the fixed positioning and z-index as per layout requirements.
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen',
        // w-56, bg-sidebar, flex flex-col are effectively determined by SidebarNav
        className
      )}
    >
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
