import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiCreditCard, FiLock, FiCheckCircle } from 'react-icons/fi';
import { Breadcrumb, Input } from '../components/common';
import { getCartWithProducts, getCartSubtotal, clearCart } from '../utils/cartData';

/**
 * Checkout Page Component
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // Additional
    orderNotes: ''
  });

  const cartItems = getCartWithProducts();
  const subtotal = getCartSubtotal();
  const shippingCost = 25.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'CART', link: '/cart' },
    { label: 'CHECKOUT', active: true }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      // Process order
      console.log('Order submitted:', formData);
      clearCart();
      navigate('/order-confirmation');
    }
  };

  useGSAP(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, { scope: pageRef });

  const steps = [
    { number: 1, title: 'Shipping' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Review' }
  ];

  return (
    <div ref={pageRef} className="checkout-page bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="section-heading my-8">CHECKOUT</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex flex-col items-center ${index > 0 ? 'ml-4 md:ml-12' : ''}`}>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > step.number ? <FiCheckCircle className="w-6 h-6" /> : step.number}
                  </div>
                  <span className="text-question mt-2 font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-1 mx-2 md:mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 shadow-md">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name *"
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name *"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address *"
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number *"
                      required
                    />
                  </div>

                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address *"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City *"
                      required
                    />
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State *"
                      required
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Zip Code *"
                      required
                    />
                  </div>

                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country *"
                    required
                  />
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FiCreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                    <FiLock className="w-5 h-5 text-green-600 ml-auto" />
                  </div>

                  <Input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number *"
                    required
                    maxLength="16"
                  />

                  <Input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Cardholder Name *"
                    required
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY *"
                      required
                      maxLength="5"
                    />
                    <Input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV *"
                      required
                      maxLength="3"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                    <p className="text-question text-blue-800 flex items-start gap-2">
                      <FiLock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

                  {/* Shipping Details */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <p className="text-body text-gray-700">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}<br />
                      {formData.email} | {formData.phone}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-body">
                          <span className="text-gray-700">
                            {item.product.name} x {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900">
                            ${(item.product.priceRange.min * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-body font-medium text-gray-900 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Any special instructions for your order..."
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-3 px-8 font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                >
                  {currentStep === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-md sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-question">
                    <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.product.priceRange.min * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-body">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
