// app/dashboard/play/[id]/page.tsx
import PdfViewer from "@/components/PdfViewer";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="p-5 bg-primary/20 min-h-screen">
      <PdfViewer id={id} />
    </div>
  );
};

export default Page;
