import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    skills: "",
    profileSummary: "",
    education: "",
    experience: "",
    github: "",
    linkedin: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setForm({
          skills: res.data.skills?.join(", ") || "",
          profileSummary: res.data.profileSummary || "",
          education: res.data.education || "",
          experience: res.data.experience || "",
          github: res.data.github || "",
          linkedin: res.data.linkedin || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const update = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Profile updated successfully ✨");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Your Profile
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={update}>
          <div>
            <label className="font-semibold">Skills</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={form.skills}
              placeholder="React, JavaScript, HTML"
              onChange={(e) => handleChange("skills", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Profile Summary</label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              rows="3"
              value={form.profileSummary}
              onChange={(e) =>
                handleChange("profileSummary", e.target.value)
              }
            />
          </div>

          <div>
            <label className="font-semibold">Education</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={form.education}
              onChange={(e) => handleChange("education", e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Experience</label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              rows="3"
              value={form.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">GitHub</label>
              <input
                className="w-full p-2 border rounded mt-1"
                value={form.github}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">LinkedIn</label>
              <input
                className="w-full p-2 border rounded mt-1"
                value={form.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
