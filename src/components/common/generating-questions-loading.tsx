import Image from "next/image";

export default function GeneratingQuestionsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#F3F8FE]">
      <p className="rounded-full bg-white px-4 py-2 color-primary">
        <Image src="/logo/ai-stars.svg" alt="Ai Stars" className="inline" width={24} height={24} /> Generating Questions
      </p>
    </div>
  );
}
