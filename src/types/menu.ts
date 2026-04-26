// Menu configuration for sidebar navigation
export interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: MenuItem[];
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}
