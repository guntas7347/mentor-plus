import PdfViewer from "@/components/PdfViewer";

const Page = async ({ params }: { params: Promise<{ fileId: string }> }) => {
  const { fileId } = await params;

  return (
    <div className="p-1 rounded md:p-5 bg-primary/20 min-h-screen">
      <PdfViewer id={fileId} />
    </div>
  );
};

export default Page;
