import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    const res = await fetch("http://localhost:5000/api/contact", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),

    });

    const data = await res.json();
    console.log("API Response:", data);
    if (data.success) {

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });

    }

  } catch (error) {

    console.log(error);

    alert("Failed to send message");

  } finally {

    setLoading(false);

  }

};


  return (
    <section className="mt-10 min-h-screen flex items-center justify-center bg-gradient-to-r from-[#dda0dd] to-[#7C3AED] px-6 py-16">

      {/* Transparent Glass Container */}
      <div className="w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-8 animate-fadeIn">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Let's Build Something Amazing 🚀
        </h1>

        {submitted && (
          <div className="bg-green-500/20 text-white border border-green-400 p-3 rounded-lg mb-4 text-center animate-slideDown">
            ✅ Message Sent Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/70 focus:border-white outline-none py-2 transition"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/70 focus:border-white outline-none py-2 transition"
            />
          </div>

          {/* Company */}
          <div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company (Optional)"
              className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/70 focus:border-white outline-none py-2 transition"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              required
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/70 focus:border-white outline-none py-2 resize-none transition"
            />
          </div>

          {/* Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] text-white px-8 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in-out;
          }

          .animate-slideDown {
            animation: slideDown 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
