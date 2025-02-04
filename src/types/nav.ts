export interface User {
    email: string;
  }
  
  export type NavItem = {
    title: string
    href: string
  }
  
  export interface NavbarProps {
    user?: User | null
    items: NavItem[]
  }
  
  