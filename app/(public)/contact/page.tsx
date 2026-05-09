import { Phone, MapPin, Globe, Video, Users, Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <section className="relative pt-20 pb-16 px-8 overflow-hidden bg-surface dark:bg-on-background">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="label-md font-body text-primary dark:text-primary tracking-widest uppercase mb-4 block">
            PUNJAB GOVERNMENT EXAMS
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-text dark:text-white leading-tight max-w-3xl">
            Connect with your{" "}
            <span className="text-primary dark:text-primary">
              Success.
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-muted dark:text-gray-400 max-w-2xl font-body leading-relaxed">
            Have questions about our upcoming batches or test series? Our
            mentors are here to guide you through your journey to securing a
            Punjab government position.
          </p>
        </div>
        {/* Decorative Element */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-surface dark:bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Contact Content Grid */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface dark:bg-gray-900 p-10 rounded-xl space-y-12 transition-colors duration-300">
              {/* Contact Detail: Phone */}
              <div className="flex items-start space-x-6">
                <div className="bg-primary dark:bg-primary-dark text-white dark:text-primary-dark p-4 rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-label-md font-body text-primary dark:text-primary tracking-widest uppercase mb-1">
                    CALL US
                  </p>
                  <p className="text-2xl font-headline font-bold text-text dark:text-white">
                    9417775320
                  </p>
                  <p className="text-text-muted dark:text-gray-400 mt-1">
                    Mon - Sat, 9:00 AM to 6:00 PM
                  </p>
                </div>
              </div>

              {/* Contact Detail: Address */}
              <div className="flex items-start space-x-6">
                <div className="bg-secondary dark:bg-secondary-dark text-white dark:text-secondary-dark p-4 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-label-md font-body text-secondary dark:text-secondary-fixed-dim tracking-widest uppercase mb-1">
                    VISIT CENTER
                  </p>
                  <p className="text-2xl font-headline font-bold text-text dark:text-white leading-tight">
                    SCO 123, Sector 17,
                    <br />
                    Chandigarh, Punjab
                  </p>
                  <p className="text-text-muted dark:text-gray-400 mt-1">
                    Pincode: 160017
                  </p>
                </div>
              </div>

              {/* Contact Detail: Socials */}
              <div>
                <p className="text-label-md font-body text-text-muted dark:text-gray-400 tracking-widest uppercase mb-4">
                  FOLLOW OUR UPDATES
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="w-12 h-12 flex items-center justify-center bg-surface dark:bg-surface text-primary dark:text-primary rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white-fixed transition-all"
                  >
                    <Globe size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 flex items-center justify-center bg-surface dark:bg-surface text-primary dark:text-primary rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white-fixed transition-all"
                  >
                    <Video size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="w-12 h-12 flex items-center justify-center bg-surface dark:bg-surface text-primary dark:text-primary rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white-fixed transition-all"
                  >
                    <Users size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-80 w-full rounded-xl overflow-hidden bg-surface dark:bg-gray-900 relative group">
              <img
                className="w-full h-full object-cover grayscale opacity-60 dark:opacity-40 group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-all duration-700"
                data-alt="Map view of Chandigarh sector 17 area"
                data-location="Chandigarh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhLRDK920DipHePiskcrgMo3qBmvNH_Exy4LJMGRxdzcIquiNqaQWsfb80_8MG_sL9dHiFccN773D8vvZEFg24PnuL6aenuzEWX6ZZUHD4tmI79vaFmjen4WSw3P91eobx_7hBWqXYuuYgIgqvfW3bSVNxxssEqBXJJhFSiSrnL-Ejnw8AxtM953Ff7qiTtiNf8oot8np9aAbjYDH-ijqEnR8KPzPf_LpQT_VYbCOKD4YImT39WSj8xri05qLYJaHJpNhJSsCpJ6a3"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-primary dark:bg-primary-dark text-white dark:text-primary-dark px-6 py-3 rounded-full shadow-lg font-bold flex items-center space-x-2">
                  <MapPin size={20} />
                  <span>We are here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: High-End Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-background dark:bg-gray-900 p-8 md:p-12 rounded-xl shadow-sm border border-gray-200 dark:border-gray-200/5">
              <h2 className="text-3xl font-headline font-bold text-text dark:text-white mb-8">
                Send us a message
              </h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full bg-surface dark:bg-on-background border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed-dim/20 transition-all text-text dark:text-white"
                      id="name"
                      name="name"
                      placeholder="eg. Rahul Sharma"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full bg-surface dark:bg-on-background border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed-dim/20 transition-all text-text dark:text-white"
                      id="phone"
                      name="phone"
                      placeholder="+91 00000 00000"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
                    htmlFor="subject"
                  >
                    Interested Course
                  </label>
                  <select
                    className="w-full bg-surface dark:bg-on-background border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed-dim/20 transition-all text-text dark:text-white appearance-none"
                    id="subject"
                    name="subject"
                  >
                    <option>PPSC Cooperative Inspector</option>
                    <option>PSSSB Clerk/DEO</option>
                    <option>Punjab Police SI/Constable</option>
                    <option>Patwari Exam Preparation</option>
                    <option>Other General Inquiries</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full bg-surface dark:bg-on-background border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed-dim/20 transition-all text-text dark:text-white"
                    id="message"
                    name="message"
                    placeholder="How can we help you today?"
                    rows={5}
                  ></textarea>
                </div>
                <button
                  className="w-full hero-gradient text-white text-lg font-headline font-bold py-5 rounded-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                  type="submit"
                >
                  Send Inquiry
                </button>
                <p className="text-center text-sm text-text-muted dark:text-gray-400 font-body">
                  By clicking send, you agree to our{" "}
                  <Link
                    className="text-primary dark:text-primary hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto hero-gradient rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-6">
              Start Your Prep Journey Today
            </h2>
            <p className="text-xl text-primary-dark max-w-2xl mx-auto mb-10">
              Join 5000+ students who have successfully cleared Punjab
              Government exams with MentorPlus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-background dark:bg-primary text-primary dark:text-white-fixed font-bold px-10 py-4 rounded-xl hover:bg-primary dark:hover:bg-primary-dark transition-all">
                Enroll Now
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
          {/* Abstract Texture */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </section>
    </>
  );
}
