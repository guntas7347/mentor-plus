import ContactForm from "@/components/ContactForm";
import {
  Phone,
  MapPin,
  Globe,
  Video,
  Users,
  Mail,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ==========================================
// 1. CENTRALIZED DATA CONFIGURATION
// ==========================================
const CONFIG = {
  branch: {
    name: "Rampura Phul Head Office",
    address:
      "Mentor Plus Coaching, NH-7, Mar Chowk, Rampura Phul, District Bathinda, Punjab, India",
    pincode: "151103",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.566141384078!2d76.77258957640484!3d30.744577884877708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed1b38f8cfef%3A0xe5f9227f6c38221b!2sSector%2017%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1716480000000!5m2!1sen!2sin",
    directionsUrl: "https://www.google.com/maps?q=SCO+123+Sector+17+Chandigarh",
  },
  courses: [
    "PPSC Cooperative Inspector",
    "PSSSB Clerk/DEO",
    "Punjab Police SI/Constable",
    "Patwari Exam Preparation",
    "Other General Inquiries",
  ],
  socials: [
    { id: "website", href: "#", icon: Globe, label: "Website" },
    { id: "youtube", href: "#", icon: Video, label: "YouTube" },
    { id: "community", href: "#", icon: Users, label: "Community" },
  ],
  contactMethods: [
    {
      id: "phone",
      label: "CALL US",
      value: "+91 88471 13406",
      subText: "Mon - Sat | 9:00 AM - 6:00 PM",
      icon: Phone,
      colorClass: "bg-primary dark:bg-primary-dark text-white",
      href: "tel:+918847113406",
    },
    {
      id: "email",
      label: "EMAIL US",
      value: "Info@mentorplus.guru",
      subText: "We reply within 24 business hours",
      icon: Mail,
      colorClass: "bg-emerald-600 dark:bg-emerald-700 text-white",
      href: "mailto:Info@mentorplus.guru",
    },
    {
      id: "email-secondary",
      label: "STUDY VISA SUPPORT",
      value: "Mentorstudyvisa@gmail.com",
      subText: "Dedicated study visa assistance",
      icon: Mail,
      colorClass: "bg-blue-600 dark:bg-blue-700 text-white",
      href: "mailto:Mentorstudyvisa@gmail.com",
    },
  ],
};

// ==========================================
// 2. MODULAR COMPONENTS
// ==========================================

const ContactInfo = () => (
  <div className="bg-surface dark:bg-gray-900 p-10 rounded-2xl space-y-10 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
    <div className="space-y-8">
      {/* Branch Address Highlight */}
      <div className="flex items-start space-x-5 group pb-8 border-b border-gray-200/60 dark:border-gray-800">
        <div className="p-4 rounded-xl shadow-sm bg-secondary dark:bg-secondary-dark text-white shrink-0">
          <MapPin size={24} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-body font-bold text-primary dark:text-primary tracking-widest uppercase">
            {CONFIG.branch.name}
          </p>
          <a
            href={CONFIG.branch.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xl font-headline font-bold text-text dark:text-white leading-snug hover:text-primary dark:hover:text-primary transition-colors"
          >
            {CONFIG.branch.address}
          </a>
          <p className="text-text-muted dark:text-gray-400 text-sm">
            Pincode: {CONFIG.branch.pincode}
          </p>
        </div>
      </div>

      {/* Other Contact Methods */}
      {CONFIG.contactMethods.map((method) => {
        const Icon = method.icon;
        return (
          <div key={method.id} className="flex items-center space-x-5 group">
            <div
              className={`p-3.5 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0 ${method.colorClass}`}
            >
              <Icon size={20} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-body font-bold text-text-muted dark:text-gray-500 tracking-widest uppercase">
                {method.label}
              </p>
              <a
                href={method.href}
                className="block text-lg font-headline font-bold text-text dark:text-white leading-tight hover:text-primary dark:hover:text-primary transition-colors"
              >
                {method.value}
              </a>
              <p className="text-text-muted dark:text-gray-400 text-xs">
                {method.subText}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* Social Links */}
    <div className="pt-6 border-t border-gray-200/60 dark:border-gray-800">
      <p className="text-xs font-body font-bold text-text-muted dark:text-gray-500 tracking-widest uppercase mb-4">
        Connect With Us
      </p>
      <div className="flex space-x-3">
        {CONFIG.socials.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              href={link.href}
              title={link.label}
              className="w-11 h-11 flex items-center justify-center bg-background dark:bg-on-background text-text dark:text-gray-300 rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

const MapSection = () => (
  <div className="h-80 lg:h-96 w-full rounded-2xl overflow-hidden bg-surface dark:bg-gray-900 relative group shadow-inner border border-gray-100 dark:border-gray-800">
    <iframe
      src={CONFIG.branch.mapEmbedUrl}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`${CONFIG.branch.name} Google Map`}
      className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
    ></iframe>

    <div className="absolute bottom-4 left-4 right-4 flex justify-end pointer-events-none">
      <a
        href={CONFIG.branch.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto bg-white dark:bg-gray-900 text-text dark:text-white hover:text-primary dark:hover:text-primary font-bold py-3 px-5 rounded-xl text-sm flex items-center space-x-2 transition-all shadow-xl hover:scale-105"
      >
        <MapPin size={16} className="text-primary" />
        <span>Open in Maps</span>
      </a>
    </div>
  </div>
);

const CTASection = () => (
  <section className="px-8 pb-24">
    <div className="max-w-7xl mx-auto bg-primary dark:bg-primary-dark rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-6">
          Start Your Prep Journey Today
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-body">
          Join 5000+ students who have successfully cleared Punjab Government
          exams with MentorPlus.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg flex items-center justify-center gap-2">
            Enroll Now <ArrowRight size={18} />
          </button>
          <button className="w-full sm:w-auto bg-black/10 backdrop-blur-sm text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-black/20 transition-all">
            Download Brochure
          </button>
        </div>
      </div>

      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 2px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      ></div>
    </div>
  </section>
);

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function Contact() {
  return (
    <div className="min-h-screen bg-background dark:bg-black">
      {/* Page Header */}
      <section className="relative pt-24 pb-12 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <span className="text-sm font-body font-bold text-primary dark:text-primary tracking-widest uppercase mb-4 block">
            Punjab Government Exams
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-text dark:text-white leading-tight max-w-3xl">
            Connect with your{" "}
            <span className="text-primary dark:text-primary">Success.</span>
          </h1>
          <p className="mt-6 text-lg text-text-muted dark:text-gray-400 max-w-2xl font-body leading-relaxed mx-auto md:mx-0">
            Have questions about our upcoming batches or test series? Our
            mentors are here to guide you through your journey to securing a
            Punjab government position.
          </p>
        </div>
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Main Content Grid */}
      <section className="px-8 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ContactInfo />
            <MapSection />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}
