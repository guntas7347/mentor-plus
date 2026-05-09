"use client";

import { useState, useEffect } from "react";
import { createMeta, getMeta, updateMeta } from "@/lib/actions/meta";
import CloudinaryUploader from "@/components/CloudinaryUploader";
import { Loader2 } from "lucide-react";

// Define the shape of our Tutor object
type Tutor = {
  id: string;
  name: string;
  imageUrl: string;
  education: string;
  subject: string;
};

const initialFormState = {
  name: "",
  imageUrl: "",
  education: "",
  subject: "",
};

const TutorsPage = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res: any = await getMeta("tutors");

        if (res?.value && Array.isArray(res.value)) {
          setTutors(res.value);
        } else {
          const created: any = await createMeta("tutors", [], true);
          setTutors(created.value);
        }
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update a tutor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedTutors: Tutor[];

    if (isEditing) {
      // Update existing tutor
      updatedTutors = tutors.map((tutor) =>
        tutor.id === isEditing ? { ...tutor, ...formData } : tutor,
      );
    } else {
      // Add new tutor
      const newTutor: Tutor = {
        id: Date.now().toString(), // Simple unique ID generator
        ...formData,
      };
      updatedTutors = [...tutors, newTutor];
    }

    // Update local state and save to backend
    setTutors(updatedTutors);
    const a = await updateMeta("tutors", updatedTutors, true);
    console.log(a);

    // Reset form
    setFormData(initialFormState);
    setIsEditing(null);
  };

  // Populate form for editing
  const handleEdit = (tutor: Tutor) => {
    setFormData({
      name: tutor.name,
      imageUrl: tutor.imageUrl,
      education: tutor.education,
      subject: tutor.subject,
    });
    setIsEditing(tutor.id);
  };

  // Delete a tutor
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tutor?")) return;

    const updatedTutors = tutors.filter((tutor) => tutor.id !== id);
    setTutors(updatedTutors);
    await updateMeta("tutors", updatedTutors, true);
  };

  // Cancel edit
  const handleCancel = () => {
    setFormData(initialFormState);
    setIsEditing(null);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[var(--color-text-muted)]">
        <Loader2 className="animate-spin mx-auto mb-4" size={24} />
        Loading tutors...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[var(--color-background)] min-h-screen">
      <h1 className="text-3xl font-[family:var(--font-headline)] text-[var(--color-text)] mb-8 font-bold">
        Manage Tutors
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-[family:var(--font-headline)] text-[var(--color-text)] mb-4 font-semibold">
            {isEditing ? "Edit Tutor" : "Add New Tutor"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-[family:var(--font-body)] text-[var(--color-text-muted)] mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[var(--color-primary)] font-[family:var(--font-body)]"
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-[family:var(--font-body)] text-[var(--color-text-muted)] mb-1">
                Image
              </label>
              <CloudinaryUploader
                onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
              />
            </div>
            <div>
              <label className="block text-sm font-[family:var(--font-body)] text-[var(--color-text-muted)] mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[var(--color-primary)] font-[family:var(--font-body)]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-[family:var(--font-body)] text-[var(--color-text-muted)] mb-1">
                Education
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[var(--color-primary)] font-[family:var(--font-body)]"
                placeholder="e.g. PhD in Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-[family:var(--font-body)] text-[var(--color-text-muted)] mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[var(--color-primary)] font-[family:var(--font-body)]"
                placeholder="e.g. Advanced Calculus"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-2 px-4 rounded transition-colors font-[family:var(--font-body)]"
              >
                {isEditing ? "Update Tutor" : "Add Tutor"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-bold py-2 px-4 rounded transition-colors font-[family:var(--font-body)]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tutors List Section */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start content-start">
          {tutors.length === 0 ? (
            <div className="col-span-full p-8 text-center border-2 border-dashed border-gray-300 rounded-xl text-[var(--color-text-muted)] font-[family:var(--font-body)]">
              No tutors added yet. Add one from the form!
            </div>
          ) : (
            tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={tutor.imageUrl}
                  alt={tutor.name}
                  className="w-full h-48 object-cover bg-gray-100"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x300?text=No+Image";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[var(--color-text)] font-[family:var(--font-headline)]">
                    {tutor.name}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-secondary)] mb-1 font-[family:var(--font-body)]">
                    {tutor.subject}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 font-[family:var(--font-body)]">
                    {tutor.education}
                  </p>

                  <div className="flex gap-2 border-t pt-3 mt-2">
                    <button
                      onClick={() => handleEdit(tutor)}
                      className="flex-1 text-sm bg-[var(--color-surface)] hover:bg-gray-200 text-[var(--color-text)] py-1.5 rounded font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tutor.id)}
                      className="flex-1 text-sm bg-red-50 hover:bg-red-100 text-[var(--color-primary)] py-1.5 rounded font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
