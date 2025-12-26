import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUploadCloud, FiCheck } from "react-icons/fi";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const CustomOrdersPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    budget: "",
    description: "",
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (API call would go here)
    console.log("Custom Order Submitted:", formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Request Received!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for submitting your custom order request. Our design
              team will review your details and get back to you shortly to
              discuss bringing your vision to life.
            </p>
            <Link to="/">
              <Button variant="primary" size="large">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 font-sans">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Custom Orders</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              Design Your <span className="italic text-primary">Unique</span>{" "}
              Piece
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-sans">
              At Bhavan Silver Jewellery, we believe that jewelry should be as
              unique as the person wearing it. Our "Custom Order" service allows
              you to collaborate with our expert artisans to create a
              one-of-a-kind masterpiece.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-xl font-serif font-bold text-gray-400">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">
                    Share Your Vision
                  </h3>
                  <p className="text-gray-600">
                    Tell us about your idea. Sketches, photos, or simple
                    descriptions help us understand your style.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-xl font-serif font-bold text-gray-400">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">
                    Design & Approval
                  </h3>
                  <p className="text-gray-600">
                    We'll create a digital design or sketch for your approval,
                    ensuring every detail is perfect.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-xl font-serif font-bold text-gray-400">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">
                    Craftsmanship
                  </h3>
                  <p className="text-gray-600">
                    Our skilled artisans bring your design to life using the
                    finest silver and gemstones.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <h3 className="text-lg font-serif text-gray-900 mb-3">
                Need Assistance?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Our design consultants are available to help you refine your
                ideas.
              </p>
              <p className="font-medium text-gray-900">
                Email: sales@bhavanjewellery.com
              </p>
              <p className="font-medium text-gray-900">
                Phone: +91 81072 87333
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-10 shadow-xl rounded-xl border border-gray-100">
            <h2 className="text-2xl font-serif text-gray-900 mb-8">
              Start Your Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Your Name *"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Mobile Number *"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
                <Input
                  label="Estimated Budget"
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. $500 - $1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans tracking-wide">
                  Description of Your Idea *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-300 resize-none rounded-sm font-sans"
                  placeholder="Describe your design, preferred materials, gemstones, and any specific details..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans tracking-wide">
                  Upload Reference Image (Optional)
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2 pointer-events-none">
                    <FiUploadCloud className="w-10 h-10 text-gray-400 mx-auto group-hover:text-primary transition-colors" />
                    <p className="text-sm text-gray-500">
                      {formData.file ? (
                        <span className="text-primary font-medium">
                          {formData.file.name}
                        </span>
                      ) : (
                        <span>Drag & drop or click to upload</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full mt-4"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrdersPage;
