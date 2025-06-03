import React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Home,
  FileText,
  PieChart as PieChartIcon,
  Database,
  Settings,
  HelpCircle,
  ChevronDown,
  Award,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  subItems?: NavItem[];
  isActive?: boolean;
}

const navItemsData: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: Home, href: '#', isActive: true },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    subItems: [
      { id: 'reports-sales', label: 'Sales Reports', icon: FileText, href: '#' },
      { id: 'reports-users', label: 'User Reports', icon: FileText, href: '#' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: PieChartIcon,
    subItems: [
      { id: 'analytics-traffic', label: 'Traffic Analysis', icon: PieChartIcon, href: '#' },
      { id: 'analytics-conversion', label: 'Conversion Rates', icon: PieChartIcon, href: '#' },
    ],
  },
  {
    id: 'datasources',
    label: 'Data Sources',
    icon: Database,
    subItems: [
      { id: 'ds-api', label: 'API Connections', icon: Database, href: '#' },
      { id: 'ds-integrations', label: 'Integrations', icon: Database, href: '#' },
    ],
  },
  {
    id: 'setting',
    label: 'Setting',
    icon: Settings,
    subItems: [
      { id: 'setting-profile', label: 'Profile', icon: Settings, href: '#' },
      { id: 'setting-billing', label: 'Billing', icon: Settings, href: '#' },
    ],
  },
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('overview');

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActuallyActive = item.id === activeItem || item.isActive;

    if (item.subItems && item.subItems.length > 0) {
      return (
        <AccordionItem value={item.id} key={item.id} className="border-b-0">
          <AccordionTrigger
            className={cn(
              'flex items-center justify-between w-full py-2.5 px-4 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring',
              isActuallyActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
            )}
          >
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.label}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-8 py-0 space-y-1">
            {item.subItems.map((subItem) => {
              const SubIcon = subItem.icon;
              return (
                <a
                  key={subItem.id}
                  href={subItem.href}
                  onClick={() => setActiveItem(subItem.id)}
                  className={cn(
                    'flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring',
                    subItem.id === activeItem ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground opacity-80'
                  )}
                >
                  <SubIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  {subItem.label}
                </a>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        onClick={() => setActiveItem(item.id)}
        className={cn(
          'flex items-center py-2.5 px-4 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring',
          isActuallyActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
        )}
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        {item.label}
      </a>
    );
  };

  return (
    <div className={cn('h-screen w-56 bg-sidebar text-sidebar-foreground flex flex-col', className)}>
      <div className="px-4 py-5 flex items-center space-x-2 border-b border-sidebar-border">
        <BarChart3 className="h-8 w-8 text-sidebar-foreground" />
        <h1 className="text-xl font-bold text-sidebar-foreground">DataAI</h1>
      </div>

      <nav className="flex-grow px-2 py-4 space-y-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full space-y-1">
          {navItemsData.map(renderNavItem)}
        </Accordion>
      </nav>

      <div className="p-4 mt-auto">
        <Card className="bg-sidebar-primary text-sidebar-primary-foreground shadow-md">
          <CardHeader className="p-4 text-center">
            <Award className="h-10 w-10 mx-auto mb-2 text-sidebar-primary-foreground" />
            <CardTitle className="text-lg">Data AI Pro</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <CardDescription className="text-xs text-sidebar-primary-foreground opacity-80 mb-3">
              Get access to all features on Data AI
            </CardDescription>
            <Button size="sm" className="w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-opacity-80">
              Get Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SidebarNav;
