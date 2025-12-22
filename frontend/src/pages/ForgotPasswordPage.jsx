import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Input, Button } from '../components/common';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forgot password request:', email);
        setSubmitted(true);
        // Add password reset logic here
    };

    return (
        <div className="pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="section-heading text-3xl font-serif text-gray-900 mb-2">FORGOT PASSWORD</h2>
                    <p className="text-gray-600 text-sm tracking-wide">
                        Enter your email to receive reset instructions
                    </p>
                </div>

                {!submitted ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            icon={FiMail}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full flex justify-center py-4 bg-[#A67C7C] hover:bg-[#956D6D] text-white transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            SEND RESET LINK
                        </Button>
                    </form>
                ) : (
                    <div className="mt-8 text-center space-y-6">
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-[#A67C7C] hover:underline text-sm font-medium"
                        >
                            Try a different email
                        </button>
                    </div>
                )}

                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <Link to="/login" className="inline-flex items-center font-medium text-gray-600 hover:text-[#A67C7C] transition-colors">
                        <FiArrowLeft className="mr-2" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
