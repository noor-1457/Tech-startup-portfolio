import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const featureRef = useRef([]);

  /* ===== SCROLL ANIMATION ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 },
    );

    featureRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ===== TYPING EFFECT ===== */
  useEffect(() => {
    const text = "Crafting Digital Experiences for Innovative Startups";
    let i = 0;

    const typingElement = document.getElementById("typing-text");

    const typing = setInterval(() => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 60);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#111827] bg-[#dda0dd]">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 py-20 text-center bg-gradient-to-r from-[#dda0dd] to-[#7C3AED] text-white">
        <p
          id="typing-text"
          className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold min-h-[40px]"
        ></p>

        <p className="mt-5 max-w-[700px] text-[clamp(1rem,2.5vw,1.2rem)]">
          We help startups, tech founders, and small companies build stunning
          websites, showcase projects, and attract clients with ease.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap max-sm:flex-col max-sm:items-center">
          <button
            className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] px-6 py-3 rounded-full text-white transition hover:opacity-90 max-sm:w-[80%]"
            onClick={() => navigate("/services")}
          >
            Our Services
          </button>

          <button
            className="border border-white px-6 py-3 rounded-full text-white transition hover:bg-white hover:text-[#4F46E5] max-sm:w-[80%]"
            onClick={() => navigate("/case-studies")}
          >
            View Portfolio
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-5 text-center bg-[#F3F4F6]">
        <h2 className="text-3xl font-semibold mb-10 text-[#111827]">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-3 gap-5 max-w-[1000px] mx-auto px-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {[
            "Custom UX & UI Design tailored for startups",
            "Responsive layouts for all devices",
            "Animated and interactive components",
            "Seamless integration with backend systems",
            "Portfolio showcases that attract clients",
            "Ongoing support & maintenance",
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRef.current[index] = el)}
              className="bg-white/20 p-5 rounded-lg text-center transition duration-300 opacity-0 translate-y-10 hover:-translate-y-1 hover:bg-gradient-to-r from-[#dda0dd] to-[#7C3AED]"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
