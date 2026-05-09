import { getMeta } from "@/lib/actions/meta";
import { BookOpen, GraduationCap } from "lucide-react"; // Using your preferred icon library

// Type definition based on your new data structure
interface MentorData {
  id: string;
  name: string;
  subject: string;
  imageUrl: string;
  education: string;
}

const Mentors = async () => {
  const response: any = await getMeta("tutors");
  // Extracting the array from the 'value' property as per your data structure
  const tutors: MentorData[] = response?.value || [];

  if (!tutors || tutors.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No mentors available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8">
      {tutors.map((mentor) => (
        <div
          key={mentor.id}
          className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
        >
          {/* Image Container with subtle zoom on hover */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              alt={`Portrait of ${mentor.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={mentor.imageUrl}
            />
          </div>

          {/* Content Container */}
          <div className="p-5 flex flex-col flex-grow items-center text-center">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {mentor.name}
            </h4>

            {/* Subject Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 transition-colors">
              <BookOpen size={14} />
              <span>{mentor.subject}</span>
            </div>

            {/* Education Info */}
            <div className="mt-auto flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <GraduationCap size={16} />
              <span className="font-medium">{mentor.education}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mentors;
