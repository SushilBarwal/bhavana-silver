import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input, Button } from '../components/common';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        newsletter: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Register attempt:', formData);
        // Add registration logic here
    };

    return (
        <div className="pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xl space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="section-heading text-3xl font-serif text-gray-900 mb-2">CREATE ACCOUNT</h2>
                    <p className="text-gray-600 text-sm tracking-wide">
                        Join us for a premium jewelry experience
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                            icon={FiUser}
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                            icon={FiUser}
                        />
                    </div>

                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        icon={FiMail}
                    />

                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        icon={FiPhone}
                    />

                    <div className="space-y-4">
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            icon={FiLock}
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            icon={FiLock}
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            checked={formData.newsletter}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#A67C7C] focus:ring-[#A67C7C] border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
                            Sign up for our newsletter
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex justify-center py-4 bg-[#A67C7C] hover:bg-[#956D6D] text-white transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        CREATE ACCOUNT
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#A67C7C] hover:text-[#956D6D] transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
