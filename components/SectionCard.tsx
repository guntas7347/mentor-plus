export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background dark:bg-[#1f2937] rounded-2xl border border-gray-200/20 shadow-sm p-6">
      <h2 className="font-headline font-bold text-base text-text dark:text-gray-100 mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
