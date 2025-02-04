"use client";

import Wrapper from "@/components/wrapper";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const isCandidate =
    pathname.startsWith("/candidate") ||
    pathname.includes("candidate") ||
    params.get("type") === "candidate";

  return (
    <Wrapper>
      <Card className="p-2 z-10 md:w-[440px]   max-w-[440px]">
        <CardHeader className="mb-3 text-center">
          <div className="flex items-center justify-center gap-2">
            {isCandidate ? (
              <Image
                src="/logo/xseed-job.svg"
                alt="Xseed Job"
                width={150}
                height={40}
                className="mr-2"
              />
            ) : (
              <Image
                src="/logo/xseed.svg"
                alt="Xseed"
                width={120}
                height={50}
                className="mr-2"
              />
            )}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Wrapper>
  );
}
