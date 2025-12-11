import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

/**
 * Contact Us Page Component
 * Modern contact page with form and company information
 */
const ContactPage = () => {
    const pageRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'HOME', link: '/' },
        { label: 'CONTACT US', active: true }
    ];

    // Contact information
    const contactInfo = [
        {
            icon: FiMapPin,
            title: 'Visit Us',
            details: ['G-34-35, SEZ Phase 2, Sitapura Industrial Area', 'Jaipur, Rajasthan 302022, India']
        },
        {
            icon: FiPhone,
            title: 'Call Us',
            details: ['+91 81072 87333'],
            link: 'tel:+918107287333'
        },
        {
            icon: FiMail,
            title: 'Email Us',
            details: ['sales@bhavanjewellery.com'],
            link: 'mailto:sales@bhavanjewellery.com'
        },
        {
            icon: FiClock,
            title: 'Business Hours',
            details: ['Monday - Saturday: 9:00 AM - 6:00 PM', 'Sunday: Closed']
        }
    ];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    // Page entrance animation
    useGSAP(() => {
        gsap.fromTo(
            pageRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }
        );
    }, { scope: pageRef });

    return (
        <div ref={pageRef} className="contact-page bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Have questions about our jewelry? We're here to help. Reach out to us and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Information Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Contact Information
                        </h2>
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail, idx) => (
                                                info.link ? (
                                                    <a
                                                        key={idx}
                                                        href={info.link}
                                                        className="block text-gray-600 hover:text-primary transition-colors"
                                                    >
                                                        {detail}
                                                    </a>
                                                ) : (
                                                    <p key={idx} className="text-gray-600">
                                                        {detail}
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send Us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            placeholder="Inquiry about products"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-8 py-4 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors duration-300 uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 md:mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Find Us on Map
                    </h2>
                    <div className="bg-white p-4 shadow-md">
                        <div className="w-full bg-gray-200 rounded overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.7234567890123!2d75.8!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ4JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                                width="100%"
                                height="500px"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bhavan Silver Jewellery Location"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
