import React, { useState, useEffect } from "react";

import image1 from "../assets/5 Signs.jpg";
import image2 from "../assets/Future-of-AI-in-Business.jpg";
import image3 from "../assets/Ml vs.TL.png";
import image4 from "../assets/NLP.jpg";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Default images array (index based)
  const defaultImages = [image1, image2, image3, image4];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        const result = await response.json();

        if (result.success) {
          setBlogPosts(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || post.category === filter;

    return matchesSearch && matchesFilter;
  });

  const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

  return (
    <section className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-purple-600">Our Blogs</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-5 py-2 mb-6 rounded-full border outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-white ${
                filter === cat
                  ? "bg-purple-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={
                  post.image
                    ? post.image
                    : defaultImages[index % defaultImages.length]
                }
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                {/* Category */}
                <span className="text-purple-600 text-sm font-semibold">
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="text-xl font-bold mt-2">{post.title}</h2>

                {/* Author + Date */}
                <p className="text-gray-500 text-sm mt-1">
                  By {post.author} •{" "}
                  {post.createdAt &&
                    new Date(post.createdAt).toLocaleDateString()}
                </p>

                {/* Excerpt */}
                <p className="mt-3 text-gray-700">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {post.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-sm px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <button className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Blogs Found */}
        {filteredPosts.length === 0 && (
          <div className="text-center mt-10 text-gray-500">No blogs found.</div>
        )}
      </div>
    </section>
  );
};

export default Blog;
