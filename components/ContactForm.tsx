"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Extract form data
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Log the data to the console as requested
    console.log("🚀 ~ Contact Form Submission Payload:", data);

    // Simulate API Call for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-background dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden">
      {/* Success State Overlay */}
      <div
        className={`absolute inset-0 bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center transition-all duration-500 ${isSuccess ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-headline font-bold text-text dark:text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-text-muted dark:text-gray-400 text-center max-w-xs">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-headline font-bold text-text dark:text-white mb-2">
          Send us a message
        </h2>
        <p className="text-text-muted dark:text-gray-400 font-body">
          Fill out the form below and we'll be in touch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              required
              className="w-full bg-surface dark:bg-on-background border border-transparent focus:border-primary/30 rounded-xl p-4 focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/10 transition-all text-text dark:text-white outline-none"
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
              required
              className="w-full bg-surface dark:bg-on-background border border-transparent focus:border-primary/30 rounded-xl p-4 focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/10 transition-all text-text dark:text-white outline-none"
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
          <div className="relative">
            <select
              required
              className="w-full bg-surface dark:bg-on-background border border-transparent focus:border-primary/30 rounded-xl p-4 focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/10 transition-all text-text dark:text-white appearance-none outline-none cursor-pointer"
              id="subject"
              name="subject"
            >
              <option value="" disabled selected>
                Select a course...
              </option>
              {[
                "PPSC Cooperative Inspector",
                "PSSSB Clerk/DEO",
                "Punjab Police SI/Constable",
                "Patwari Exam Preparation",
                "Other General Inquiries",
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted dark:text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 ml-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            required
            className="w-full bg-surface dark:bg-on-background border border-transparent focus:border-primary/30 rounded-xl p-4 focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/10 transition-all text-text dark:text-white outline-none resize-none"
            id="message"
            name="message"
            placeholder="How can we help you today?"
            rows={4}
          ></textarea>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </button>

        <p className="text-center text-xs text-text-muted dark:text-gray-500 font-body mt-4">
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
  );
}
