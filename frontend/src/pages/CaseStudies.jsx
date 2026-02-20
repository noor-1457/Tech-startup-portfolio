import React, { useEffect, useState } from "react";
import axios from "axios";

const CaseStudies = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/case-studies");
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

 if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-20 h-20 border-6 border-gray-300 border-t-[#bf00ff] rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl text-[#bf00ff] md:text-5xl font-bold mb-4">Case Studies</h1>
        <p>Explore our successful projects and solutions.</p>
      </section>

      {/* Projects Section */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <img
                src={
                  project.image && project.image !== ""
                    ? project.image
                    : "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={project.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6 space-y-2">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p><span className="font-semibold">Client:</span> {project.client}</p>
                <p><span className="font-semibold">Industry:</span> {project.industry}</p>
                <p><span className="font-semibold">Challenge:</span> {project.challenge}</p>
                <p><span className="font-semibold">Solution:</span> {project.solution}</p>

                {/* Results */}
                <div>
                  <span className="font-semibold">Results:</span>
                  <ul className="list-disc list-inside">
                    {project.results.map((result) => (
                      <li key={result._id}>
                        {result.metric}: {result.value}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <span className="font-semibold">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-800 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured */}
                {project.featured && (
                  <span className="inline-block bg-yellow-400 text-black px-2 py-1 rounded-full mt-2 text-sm font-semibold">
                    Featured
                  </span>
                )}

                {/* Created At */}
                <p className="text-sm mt-2">
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <button className="mt-4 text-white hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center pb-20">
        <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
        <button className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] text-white px-5 py-2 rounded-full hover:opacity-90 transition">
          Start Your Project
        </button>
      </section>

    </div>
  );
};

export default CaseStudies;
