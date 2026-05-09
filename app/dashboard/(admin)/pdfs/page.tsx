// "use client";

// import { deletePdf, getAllPdfs } from "@/lib/actions/pdf";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Eye, Trash2 } from "lucide-react";

// type Pdf = {
//   id: string;
//   key: string;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date | null;
// };

// const PdfPage = () => {
//   const [pdfs, setPdfs] = useState<Pdf[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const loadPdfs = async () => {
//     try {
//       const data = await getAllPdfs();
//       setPdfs(data as Pdf[]);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPdfs();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this PDF?")) {
//       try {
//         await deletePdf(id);
//         await loadPdfs();
//       } catch (error) {
//         console.error("Failed to delete PDF:", error);
//         alert("Failed to delete PDF");
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center p-8 text-gray-500">
//         Loading PDFs...
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">PDF Management</h1>
//       </div>

//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-gray-600">
//             <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-700">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-4 font-semibold border-b border-gray-200"
//                 >
//                   PDF ID
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-4 font-semibold border-b border-gray-200"
//                 >
//                   PDF Key
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-4 font-semibold border-b border-gray-200 text-right"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//               {pdfs.length > 0 ? (
//                 pdfs.map((pdf) => (
//                   <tr
//                     key={pdf.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
//                       {pdf.id}
//                     </td>
//                     <td className="px-6 py-4 truncate max-w-md" title={pdf.key}>
//                       {pdf.key}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex justify-end gap-3">
//                         <Link
//                           href={`/dashboard/play/${pdf.id}`}
//                           className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
//                         >
//                           <Eye className="h-4 w-4" />
//                           View
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(pdf.id)}
//                           className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={3}
//                     className="px-6 py-8 text-center text-gray-500"
//                   >
//                     No PDFs found in the system.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfPage;
