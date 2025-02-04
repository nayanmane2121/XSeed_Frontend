import Image from "next/image";
import { ReactNode } from "react";
interface Props {
  children?: ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full relative min-h-screen p-6 flex items-center justify-center bg-mainBackground">
      <Image
        width={620}
        height={590}
        src="/images/Vector.svg"
        alt="Xseed Job"
        priority
        className="absolute  h-full top-0 bottom-0 right-0"
      />
      {children}
    </div>
  );
};

export default Wrapper;
