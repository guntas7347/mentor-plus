import Link from "next/link";
import {
  BarChart2,
  Play,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-[#0a0f18] border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-xl font-bold text-primary dark:text-inverse-primary font-headline">
            MentorPlus
          </div>
          <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed">
            The premier academic sanctuary for competitive exam preparation in
            North India. Dedicated to excellence and integrity.
          </p>
          <div className="flex gap-4">
            <a
              className="w-8 h-8 rounded-full bg-surface dark:bg-white/10 flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-primary hover:text-white transition-all"
              href="#"
            >
              <BarChart2 size={16} />
            </a>
            <a
              className="w-8 h-8 rounded-full bg-surface dark:bg-white/10 flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-primary hover:text-white transition-all"
              href="#"
            >
              <Play size={16} />
            </a>
            <a
              className="w-8 h-8 rounded-full bg-surface dark:bg-white/10 flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-primary hover:text-white transition-all"
              href="#"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-6 font-headline text-text dark:text-white">
            Quick Links
          </h5>
          <ul className="space-y-4 text-sm text-text-muted dark:text-gray-400">
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="/courses"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="/test-series"
              >
                Test Series
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="/syllabus"
              >
                Syllabus
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="#"
              >
                Exam Calendar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 font-headline text-text dark:text-white">
            Legal
          </h5>
          <ul className="space-y-4 text-sm text-text-muted dark:text-gray-400">
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="#"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="#"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="#"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary dark:hover:text-inverse-primary underline-offset-4 hover:underline transition-all"
                href="#"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 font-headline text-text dark:text-white">
            Contact Info
          </h5>
          <ul className="space-y-4 text-sm text-text-muted dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Phone
                size={18}
                className="text-primary dark:text-inverse-primary flex-shrink-0"
              />
              9417775320
            </li>
            <li className="flex items-center gap-2">
              <Mail
                size={18}
                className="text-primary dark:text-inverse-primary flex-shrink-0"
              />
              contact@mentorplus.edu
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                size={18}
                className="text-primary dark:text-inverse-primary flex-shrink-0"
              />
              SCF 45, Model Town, Ludhiana, Punjab - 141002
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-gray-200 dark:border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} MentorPlus Coaching. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            <BadgeCheck
              size={16}
              className="text-secondary dark:text-secondary-fixed-dim"
            />
            <span>ISO 9001:2015 Certified Institution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
