import React, { useState } from "react";

const Services = () => {

  const services = [
    {
      title: "AI Solutions",
      desc: "We build smart AI tools to automate your business processes.",
      icon: "🤖",
    },
    {
      title: "Web Development",
      desc: "Modern, responsive, and high-performance websites.",
      icon: "🌐",
    },
    {
      title: "App Development",
      desc: "Android & iOS apps with modern UI and fast performance.",
      icon: "📱",
    },
    {
      title: "Automation",
      desc: "Automate repetitive tasks and improve efficiency.",
      icon: "⚙️",
    },
    {
      title: "Cloud Services",
      desc: "Secure and scalable cloud infrastructure solutions.",
      icon: "☁️",
    },
    {
      title: "UI/UX Design",
      desc: "Beautiful and user-friendly interface designs.",
      icon: "🎨",
    },
  ];


  // Inquiry Form State

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    description: ""

  });

  const [message, setMessage] = useState("");



  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5000/api/inquiry", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });

      const data = await res.json();

      if (data.success) {

        setMessage("Inquiry submitted successfully!");

        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          timeline: "",
          description: "",
        });

      }

    } catch {

      setMessage("Error submitting inquiry");

    }

  };




  return (

    <div className="bg-gradient-to-r from-[#dda0dd] to-[#7C3AED] text-black min-h-screen">


      {/* Hero */}

      <section className="text-center py-20">

        <h1 className="text-5xl font-bold mb-4">

          Our Services

        </h1>

        <p>

          We provide innovative technology solutions

        </p>

      </section>



      {/* Services */}

      <section className="px-6 md:px-20 pb-20">

        <div className="grid md:grid-cols-3 gap-8">


          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-xl hover:scale-105 transition"
            >

              <div className="text-4xl">

                {service.icon}

              </div>

              <h2 className="text-xl font-semibold">

                {service.title}

              </h2>

              <p>

                {service.desc}

              </p>

            </div>

          ))}


        </div>

      </section>




      {/* Inquiry Form Section */}

      <section className="px-6 md:px-20 pb-20">


        <div className="bg-white p-10 rounded-xl max-w-3xl mx-auto">


          <h2 className="text-3xl font-bold mb-6 text-center">

            Get Free Consultation

          </h2>



          <form onSubmit={handleSubmit} className="space-y-4">


            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />


            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />


            <input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />



            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >

              <option value="">

                Select Service

              </option>

              <option>

                AI Automation

              </option>

              <option>

                Machine Learning

              </option>

              <option>

                Data Analytics

              </option>

              <option>

                Process Automation

              </option>

              <option>

                Custom AI

              </option>

              <option>

                Consulting

              </option>

            </select>



            <input
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />


            <input
              name="timeline"
              placeholder="Timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />



            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />



            <button
              className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] text-white py-3 rounded-lg text-white w-full py-3 rounded"
            >

              Submit Inquiry

            </button>


          </form>


          <p className="text-center mt-4">

            {message}

          </p>


        </div>


      </section>




    </div>

  );

};

export default Services;