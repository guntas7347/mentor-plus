import { X, Images, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const categories = ["All Photos", "Classroom", "Events", "Results"];

  const galleryItems = [
    {
      span: "md:col-span-8",
      height: "h-[500px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDRDOKZsNAjFXgbkpHLDk26f4gPg3Ie7a3HyRxhvp_7Th6ZCyKRcrVvuVPFMjz8jIRqgULeVMEsFc6iZu4fBCv-F8eVNhRVrWYLx4yHPFNrJJFgn8t1u3c1UzK0T6bIyO6QBByGSmRf7cvV0LsY3-PDuDHszBD8NkgQLW1Ct9_1DXS9mgrxZLDDwgMzIa6AvObNAcOEMeXLW3lZjBN_fDbuDOAysRB0x3nfQOhUom2y6qHXKlPa7MSZ0VFqj6B9aF_DNcb_9-DvahA1",
      category: "Classroom",
      title: "Interactive Learning Sessions",
      titleClass: "text-2xl",
    },
    {
      span: "md:col-span-4",
      height: "h-[500px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCehfHWdRItLSk3tWGBC91cL6729TofRt_M2FyBcWxurNVSd2lbe2MWTJiIhZKrzLm50lqBZivsWjePDxz_2rdQ0PGghi1uuWi9dtaX6hG59PyrAalT_9lrT7Twg5euNiPmUf_0OZaTswNdsaG5oCfOp5TEsk7ZZxq4DWH0g7SlCILWAm2Z-cKwg7Q3KUM9paTMvy7TNu1ygIoloEiDsmifiiS0agiTmZyHxBl2TVOOD660oldbz7ndTRhzepPlqHtjzpGnnXIZQ2_U",
      category: "Events",
      title: "Annual Mentor Meetup 2023",
      titleClass: "text-xl",
    },
    {
      span: "md:col-span-4",
      height: "h-[300px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_7qF1-8mdpdVUZYMcsmxNwHLo4MWuHlARxMO9V6XC59sEFr5xQmvGhVdzbXShBWHE2bClnUqk26x4kBbs5kqCovP_ss00L_6cb4KIlWR9kS2nayW-Kl918JQamlHdNEi2BtVcSdsVk4ko7-Tqj6Vh-DcRwEp-XTosRXpT4mbmndYpJPdk6iP-Rx9MUxi8kr_M2Ht7GuH6zBuErV1xi_Qx63Oob6TicRjtMC-TASdPSfXvII6bDIbBMKXkdSQD2QAjUn9SRYia318j",
      category: "Classroom",
      title: "Focus & Discipline",
      titleClass: "text-lg",
    },
    {
      span: "md:col-span-4",
      height: "h-[300px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbxdjF0tRgFzxO_RkKXNH-HdmSf15mxDDxfwtKyMNnzWqp50E9kKbVlpfZPaVkWRgqOXUuT3oyuL_L088XpmZVE4bhtM_EiNjMRzWEURTNhfLoOfrlm4gFDVx-A6FfrxhvRz09uBK-JJq5duNczVTNGgReNJkY2akUvno4PVaAtJ73BCm6cFFJhUSAK-mkaQhlfkJ3x6nICqsyW00DkU-dGrbP96jUo27L3IkaqH4oq-8iYdwWJa4LXTr04jAaDRTBDipme44Z-LEs",
      category: "Results",
      title: "Wall of Excellence",
      titleClass: "text-lg",
    },
    {
      span: "md:col-span-4",
      height: "h-[300px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhYgEzggypQBK-Zl5EU7SUGJbGld5TtD-Q6IpjQKHlDmShkjj2-4YfgpeXvk_4VGXzji168FtSH2zUHGbr3PSA-qJe04Ak_rFbi_2LXGpWMdJon9SX_dUp63mIHo2G1j1-8jcZSa3GPfB7slMG9mYHjwJhqKBLhftT8l7EEAnBHY0wzZYZATXbYHZLFuM2xiHP8o86LFRTBV9pkSUrH6hTq5TzaAdzoYdVqbTyRc0EhjuXheyCJ1B9IjORE-N3Bt86WyQOua17t3pk",
      category: "Classroom",
      title: "1-on-1 Mentorship",
      titleClass: "text-lg",
    },
    {
      span: "md:col-span-12",
      height: "h-[400px]",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRnV4bObm1S7GWhLHF-TIobJgirnpsRMk5e5ZPcB_YLXEJXyw8A4tWjCzq0UNHjj-7MX82365c5bcgJ6JkZSEULYWKiHN-QWVsExWRyqcHnEor0i9RiG-71DkMMmgpVbPeKw897ICyO2nf1PpANNamr3LuCg216hnKInTvyXNymZNE13NlgPLl8o67grSZynDL-gNt0YV3nT7pIq5aI94dkeGjBXjyQnYEbJAfk9CObAbFJoKDpLmVOEddDj18kSSgPiS0mEKB71XE",
      category: "Events",
      title: "State-level Mock Interview Seminar",
      titleClass: "text-3xl",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Header */}
      <header className="mb-20 text-center">
        <span className="text-primary dark:text-blue-400 font-label font-semibold tracking-widest text-xs uppercase mb-4 block">
          Visual Journey
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface dark:text-white mb-6 tracking-tight">
          Our Academic Sanctuary
        </h1>
        <p className="text-on-surface-variant dark:text-gray-400 text-lg max-w-2xl mx-auto font-body">
          Explore the environment where future civil servants are forged. From
          intensive classroom sessions to celebratory result moments.
        </p>
      </header>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-[0.98] ${
              idx === 0
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-container-high dark:bg-gray-800 text-on-surface-variant dark:text-gray-300 hover:bg-surface-container-highest dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className={`${item.span} group relative overflow-hidden rounded-xl bg-surface-container-low dark:bg-gray-900 ${item.height} cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={item.title}
              src={item.image}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-on-primary-fixed/80 dark:from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end ${item.span === "md:col-span-12" ? "p-10" : "p-8"}`}
            >
              <span className="text-secondary-fixed dark:text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">
                {item.category}
              </span>
              <h3 className={`text-white font-bold ${item.titleClass}`}>
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Placeholder UI */}
      <div className="mt-16 bg-surface-container-low dark:bg-gray-900/50 border border-transparent dark:border-gray-800 rounded-2xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <X
            className="text-outline dark:text-gray-500 cursor-pointer hover:text-primary dark:hover:text-blue-400 transition-colors"
            size={24}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-8 border-2 border-dashed border-outline-variant/30 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <Images
                className="text-primary/40 dark:text-blue-400/30"
                size={48}
              />
              <p className="text-on-surface-variant dark:text-gray-400 font-medium">
                Click any photo to enter focus mode
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="text-left">
              <h4 className="font-bold text-xl text-on-surface dark:text-white">
                Sample Lightbox View
              </h4>
              <p className="text-sm text-on-surface-variant dark:text-gray-500">
                Classroom Sessions • October 2023
              </p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-surface-container-highest dark:bg-gray-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary dark:hover:bg-blue-500 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
              <button className="w-12 h-12 rounded-full bg-surface-container-highest dark:bg-gray-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary dark:hover:bg-blue-500 hover:text-white transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
