import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import './App.css'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AccountSettings = lazy(() => import('./pages/AccountSettings'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const ShippingPage = lazy(() => import('./pages/ShippingPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const RecentlyViewedPage = lazy(() => import('./pages/RecentlyViewedPage'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-semibold">Loading...</p>
    </div>
  </div>
)
const Account = () => <div style={{ padding: '40px', textAlign: 'center' }}><h1>My Account</h1><p>Manage your account and orders.</p></div>
const Wishlist = () => <div style={{ padding: '40px', textAlign: 'center' }}><h1>My Wishlist</h1><p>Your favorite items saved for later.</p></div>

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/collection/:collection" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:stone" element={<CategoryPage />} />
          <Route path="/gold-jewelry" element={<CategoryPage />} />
          <Route path="/gold-jewelry/*" element={<CategoryPage />} />
          <Route path="/silver-jewelry" element={<CategoryPage />} />
          <Route path="/silver-jewelry/*" element={<CategoryPage />} />
          <Route path="/fashion-jewelry" element={<CategoryPage />} />
          <Route path="/fashion-jewelry/*" element={<CategoryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/account" element={<DashboardPage />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
