import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Correct Image Imports
import img1 from "../assets/AI-Powered.jpg";
import img2 from "../assets/cover-document-processing-automation.png";
import img3 from "../assets/Predictive-Analytics.jpg";

const CaseStudies = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Static Images Array
  const images = [img1, img2, img3];

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/case-studies",
        );

        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching case studies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // ✅ Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-900 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
        <p className="text-lg">
          Explore our successful projects and innovative solutions.
        </p>
      </section>

      {/* Projects Section */}
      <section className="px-6 md:px-20 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <img
                src={
                  project.image && project.image !== ""
                    ? project.image
                    : images[index % images.length]
                }
                alt={project.title}
                className="h-52 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-bold text-purple-800">
                  {project.title}
                </h2>

                <p>
                  <span className="font-semibold">Client:</span>{" "}
                  {project.client}
                </p>

                <p>
                  <span className="font-semibold">Industry:</span>{" "}
                  {project.industry}
                </p>

                <p>
                  <span className="font-semibold">Challenge:</span>{" "}
                  {project.challenge}
                </p>

                <p>
                  <span className="font-semibold">Solution:</span>{" "}
                  {project.solution}
                </p>

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <div>
                    <span className="font-semibold">Results:</span>
                    <ul className="list-disc list-inside mt-1">
                      {project.results.map((result, i) => (
                        <li key={i}>
                          {result.metric}: {result.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <span className="font-semibold">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}

                {/* Created Date */}
                <p className="text-sm text-gray-500 mt-2">
                  Created At: {new Date(project.createdAt).toLocaleDateString()}
                </p>

                {/* Button */}
                <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition w-full">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
        <button className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition">
          Start Your Project
        </button>
      </section>
    </div>
  );
};

export default CaseStudies;
