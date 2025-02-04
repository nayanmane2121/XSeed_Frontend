interface Props {
  text: string;
  className?: string;
}
export const Title = ({ text, className }: Props) => (
  <div className="text-center ">
    <h2
      className={`text-2xl tracking-wide font-inter font-light text-[#667085] ${className}`}
    >
      {text}
    </h2>
  </div>
);
