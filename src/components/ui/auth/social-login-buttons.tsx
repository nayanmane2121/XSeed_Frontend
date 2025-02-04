"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SocialLoginButtons() {
  const handleSocialLogin = async (provider: string) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin("google")}
      >
        <Image
          src="/logo/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="md:mr-2"
        />
        <span className="md:block hidden">Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin("linkedin")}
      >
        <Image
          src="/logo/linkedin.svg"
          alt="LinkedIn"
          width={20}
          height={20}
          className="md:mr-2"
        />
        <span className="md:block hidden">LinkedIn</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSocialLogin("microsoft")}
      >
        <Image
          src="/logo/microsoft.svg"
          alt="Microsoft"
          width={20}
          height={20}
          className="md:mr-2"
        />
        <span className="md:block hidden">Microsoft</span>
      </Button>
    </div>
  );
}
