import React, { useState, useEffect } from "react";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        const result = await response.json();

        if (result.success) {
          setBlogPosts(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    setVisible(true);
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-20 h-20 border-6 border-gray-300 border-t-[#bf00ff] rounded-full animate-spin"></div>
    </div>
  );
}

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || post.category === filter;

    return matchesSearch && matchesFilter;
  });

  const categories = ["All", ...new Set(blogPosts.map(p => p.category))];

  return (
    <section className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">

      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#bf00ff]">
          Our Blogs
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-5 py-2 mb-6 rounded-full border"
        />

        {/* Filter */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="bg-purple-600 text-white px-4 py-2 rounded-full"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {filteredPosts.map((post, index) => (

            <div key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden">

              {/* Image */}
              <img
                src={
                  post.image ||
                  "https://via.placeholder.com/400x250"
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
                <h2 className="text-xl font-bold mt-2">
                  {post.title}
                </h2>

                {/* Author + Date */}
                <p className="text-gray-500 text-sm mt-1">
                  By {post.author} •{" "}
                  {new Date(post.createdAt)
                    .toLocaleDateString()}
                </p>

                {/* Excerpt */}
                <p className="mt-3 text-gray-700">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">

                  {post.tags.map((tag, i) => (

                    <span key={i}
                      className="bg-gray-200 text-sm px-2 py-1 rounded">

                      #{tag}

                    </span>

                  ))}

                </div>

                {/* Read More */}
                <button
                  className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-full">

                  Read More →

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Blog;
