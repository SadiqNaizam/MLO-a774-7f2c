import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Assuming TopHeader is in src/components/Dashboard/

interface HeaderProps {
  className?: string; // This className will be passed to the root element of TopHeader
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader component handles its own fixed positioning (top-0, left-56, right-0, z-10),
  // height (h-[70px]), background (bg-card), and internal layout.
  // This Header component primarily serves as a structural include for TopHeader.
  return (
    <TopHeader className={className} />
  );
};

export default Header;
