export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl border border-outline-variant/20 shadow-sm p-6">
      <h2 className="font-headline font-bold text-base text-on-surface dark:text-gray-100 mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
