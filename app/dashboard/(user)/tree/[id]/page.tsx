import prisma from "@/lib/prisma";
import TestSeriesDirectoryPage from "./pageClient";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const courseDetails = await prisma.testSeries.findUnique({
    where: {
      id: id,
    },
    select: {
      accessLink: true,
    },
  });

  if (!courseDetails) {
    return <div>Course not found</div>;
  }

  return <TestSeriesDirectoryPage rootFolderId={courseDetails.accessLink!} />;
};

export default Page;
