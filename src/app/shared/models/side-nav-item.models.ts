interface SideNavItem {
  label: string;
  icon: string;
  link?: string;
  isExpanded?: boolean;
  children?: { label: string; link: string }[];
}