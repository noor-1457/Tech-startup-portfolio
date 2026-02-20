import React, { useEffect, useState } from "react";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/inquiry")
      .then((res) => res.json())

      .then((data) => {
        setInquiries(data.data);
      });
      setLoading(false)
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-20 h-20 border-6 border-gray-300 border-t-[#bf00ff] rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="mt-10 min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">All Inquiries</h1>

      <div className="grid gap-4">
        {inquiries.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded shadow">
            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Company:</strong> {item.company}
            </p>

            <p>
              <strong>Service:</strong> {item.service}
            </p>

            <p>
              <strong>Budget:</strong> {item.budget}
            </p>

            <p>
              <strong>Timeline:</strong> {item.timeline}
            </p>

            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Date:</strong>

              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InquiryList;
