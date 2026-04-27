"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { updateUserProfile } from "@/lib/actions/users";
import { notify } from "@/lib/toast";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-surface dark:bg-[#1f2937] text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "", // Read-only
    phone: "",
    address: "",
    role: "STUDENT",
    image: null as string | null,
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getSessionUser();
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            role: user.role || "STUDENT",
            image: user.image || null,
          });
        }
      } catch (error) {
        notify.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Strict 10-digit numeric validation for phone while typing
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Strip non-digits
      if (numericValue.length > 10) return; // Prevent typing more than 10
      setFormData((prev) => ({ ...prev, phone: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final Validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      notify.error("Mobile number must be exactly 10 digits.");
      return;
    }
    if (!formData.name.trim()) {
      notify.error("Name cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      notify.success("Profile updated successfully!");
    } catch (error: any) {
      notify.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-on-surface-variant dark:text-gray-400">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="font-medium text-sm">Loading your profile...</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight mb-2">
          My Profile
        </h1>
        <p className="text-on-surface-variant dark:text-gray-400 text-lg">
          Manage your personal information and contact details.
        </p>
      </header>

      <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl border border-outline-variant/20 dark:border-white/5 shadow-sm overflow-hidden">
        {/* Top Profile Banner */}
        <div className="p-8 border-b border-outline-variant/10 dark:border-white/5 bg-surface-container-low/30 dark:bg-white/[0.02] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 dark:bg-[#1a56db]/20 border-4 border-white dark:border-[#1e2a3b] shadow-md flex items-center justify-center text-3xl font-extrabold text-primary dark:text-[#b5c4ff] shrink-0">
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              (formData.name.charAt(0) || "U").toUpperCase()
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-1">
              {formData.name || "Student"}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-on-surface-variant dark:text-gray-400 font-medium">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>
                {formData.role === "ADMIN"
                  ? "Administrator"
                  : "Student Account"}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-2">
                <User size={14} /> Full Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ajiteshwar Singh Brar"
                className={inputClass}
                required
              />
            </div>

            {/* Email Address (Disabled) */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-2">
                <Mail size={14} /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className={`${inputClass} bg-surface-container dark:bg-gray-800 text-on-surface-variant dark:text-gray-500 cursor-not-allowed border-dashed`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-outline dark:text-gray-500">
                  Read Only
                </span>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-gray-500 mt-1.5">
                Email cannot be changed as it is linked to your login.
              </p>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-2">
                <Phone size={14} /> Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-gray-400 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="8699440206"
                  pattern="\d{10}"
                  maxLength={10}
                  className={`${inputClass} pl-12`}
                />
              </div>
              <p className="text-xs text-on-surface-variant dark:text-gray-500 mt-1.5">
                10-digit mobile number without country code.
              </p>
            </div>
          </div>

          {/* Postal Address */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-2">
              <MapPin size={14} /> Complete Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No, Street, City, State, Pincode"
              rows={4}
              className={`${inputClass} resize-y min-h-[100px]`}
            />
            <p className="text-xs text-on-surface-variant dark:text-gray-500 mt-1.5">
              Used for shipping physical study materials or books.
            </p>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-outline-variant/10 dark:border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 bg-primary dark:bg-[#1a56db] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md w-full sm:w-auto"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
