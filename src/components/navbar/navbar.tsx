"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { useRecoilValue } from "recoil";

interface NavbarProps {
  navbarType: "recruiter" | "candidate" | "admin"; // Add supported navbar types here
}

export function Navbar({ navbarType }: NavbarProps) {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, ""); // Normalize pathname to avoid trailing slash issues
  // const { logout } = useAuth();
  // const auth = useRecoilValue(authState);

  const candidateNavItems = [
    { title: "Dashboard", href: "/candidate/dashboard" },
    { title: "Explore Jobs", href: "/candidate/jobs" },
    { title: "Job Applications", href: "/candidate/applications" },
    { title: "Profile", href: "/candidate/profile" }
  ];

  const recruiterNavItems = [
    { title: "Dashboard", href: "/recruiter/dashboard" },
    { title: "Jobs", href: "/recruiter/jobs" },
    { title: "Team", href: "/recruiter/team" },
    { title: "Clients", href: "/recruiter/clients" },
    { title: "Candidates", href: "/recruiter/candidates" },
    { title: "Source", href: "/recruiter/source" },
    { title: "Reports", href: "/recruiter/reports" }
  ];

  const adminNavItems = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Manage Users", href: "/admin/users" },
    { title: "Settings", href: "/admin/settings" }
  ];

  // Select the nav items based on navbarType
  const navItems =
    navbarType === "recruiter" ? recruiterNavItems : navbarType === "candidate" ? candidateNavItems : adminNavItems;

  // Select logo and navbar styles based on navbarType
  const logoSrc =
    navbarType === "recruiter"
      ? "/logo/xseed-job.svg"
      : navbarType === "candidate"
      ? "/logo/xseed.svg"
      : "/logo/admin-logo.svg";

  const navbarClass = navbarType === "recruiter" ? "bg-black text-white" : "bg-white text-black";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b h-[60px] ${navbarClass} flex justify-center p-2 px-6 items-center`}
    >
      <div className="container flex h-16 items-center">
        <Link href={`/${navbarType}/dashboard`} className="flex items-center space-x-2">
          <Image src={logoSrc} alt="Xseed Logo" width={150} height={40} className="mr-2" />
        </Link>

        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-5 text-[15px]",
                normalizedPathname !== link.href && "hover:text-gray-500",
                normalizedPathname === link.href &&
                  "text-primary before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-primary"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
          </Button>
          {/* <UserMenu user={auth?.user} onLogout={logout} /> */}
        </div>
      </div>
    </header>
  );
}
