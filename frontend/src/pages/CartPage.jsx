import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { Breadcrumb } from '../components/common';
import { getCartWithProducts, removeFromCart, updateCartQuantity, getCartSubtotal } from '../utils/cartData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shopping Cart Page Component
 */
const CartPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [cartItems, setCartItems] = useState(getCartWithProducts());

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'SHOPPING CART', active: true }
  ];

  const subtotal = getCartSubtotal();
  const shippingCost = cartItems.length > 0 ? 25.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleQuantityChange = (cartId, currentQuantity, action) => {
    const newQuantity = action === 'increment' ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);
    updateCartQuantity(cartId, newQuantity);
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (cartId) => {
    removeFromCart(cartId);
    setCartItems(prev => prev.filter(item => item.id !== cartId));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  useGSAP(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="cart-page bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="section-heading my-8">SHOPPING CART</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full md:w-32 h-32 object-cover"
                        loading="lazy"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors mb-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-question text-gray-600 mb-2">SKU: {item.product.id}</p>
                      {item.selectedStone && (
                        <p className="text-question text-gray-600 capitalize mb-2">
                          Stone: {item.selectedStone.replace('-', ' ')}
                        </p>
                      )}
                      <p className="text-lg font-bold text-gray-900">
                        ${item.product.priceRange.min.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 'decrement')}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-body font-medium border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 'increment')}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-gray-900">
                        ${(item.product.priceRange.min * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-md sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 uppercase tracking-wide">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-body">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span className="text-gray-600">Tax (8%):</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-4 px-6 font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-5 h-5" />
                </button>

                <Link
                  to="/category/gold-jewelry"
                  className="block text-center mt-4 text-body text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center shadow-md">
            <FiShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-body text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/category/gold-jewelry"
              className="inline-block bg-primary text-white py-3 px-8 font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
