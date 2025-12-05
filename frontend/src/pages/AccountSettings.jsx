import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import DashboardSidebar from '../components/common/DashboardSidebar';

/**
 * Account Settings Page Component
 * Allows users to manage their account information
 */

const AccountSettings = () => {
    const pageRef = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+91 98765 43210',
        company: 'Bhavan Silver Jewellery',
        address: 'G-34-35, SEZ Phase 2, Sitapura Industrial Area',
        city: 'Jaipur',
        state: 'Rajasthan',
        zipCode: '302022',
        country: 'India'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'HOME', link: '/' },
        { label: 'ACCOUNT SETTINGS', active: true }
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle password input changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle profile update
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
        alert('Profile updated successfully!');
    };

    // Handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        console.log('Password updated');
        alert('Password updated successfully!');
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
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
        <div ref={pageRef} className="account-settings-page bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <DashboardSidebar activeSection="settings" />
                    </div>

                    {/* Settings Content */}
                    <div className="settings-content space-y-8">
                        {/* Page Header */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Account Settings
                            </h1>
                            <p className="text-gray-600">
                                Manage your account information and preferences
                            </p>
                        </div>

                        {/* Personal Information Section */}
                        <section className="bg-white p-6 md:p-8 shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Personal Information
                            </h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
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
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors duration-300 uppercase tracking-wide"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </section>


                        {/* Change Password Section */}
                        <section className="bg-white p-6 md:p-8 shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Change Password
                            </h2>
                            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 max-w-md">
                                    {/* Current Password */}
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors duration-300 uppercase tracking-wide"
                                >
                                    Update Password
                                </button>
                            </form>
                        </section>


                        {/* Danger Zone */}
                        <section className="bg-white p-6 md:p-8 shadow-md border-l-4 border-red-500">
                            <h2 className="text-xl font-semibold text-red-600 mb-4">
                                Danger Zone
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                        alert('Account deletion requested. Please contact support to complete this action.');
                                    }
                                }}
                                className="px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 uppercase tracking-wide"
                            >
                                Delete Account
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
