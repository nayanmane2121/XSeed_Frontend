import { Navbar } from "@/components/navbar/navbar";

export default function layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F9FAFB] w-full h-full">
      <Navbar navbarType="recruiter" />
      <div className="px-4">{children}</div>
    </div>
  );
}