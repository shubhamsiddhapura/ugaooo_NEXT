import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-green-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About us</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about-us" className="hover:underline">Our Story</Link></li>
            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/locate-stores" className="hover:underline">Locate Stores</Link></li>
            <li><Link to="/own-grown" className="hover:underline">Own Grown</Link></li>
            <li><Link to="/garden-services" className="hover:underline">Garden Services & Maintenance</Link></li>
            <li><Link to="/customer-care" className="hover:underline">Customer Care</Link></li>
            <li><Link to="/plant-quiz" className="hover:underline">Take The Plant Quiz</Link></li>
            <li><Link to="/track-order" className="hover:underline">Track Order</Link></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policies & Info</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link to="/refund-policy" className="hover:underline">Refund policy</Link></li>
            <li><Link to="/offers" className="hover:underline">Offers & Rewards</Link></li>
            <li><Link to="/rewards-club" className="hover:underline">Plant Parent Rewards Club</Link></li>
            <li><Link to="/coupons" className="hover:underline">Ugaoo Coupons</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
          <p className="mb-2">
            WhatsApp us at:{" "}
            <a
              href="https://wa.me/918087087224"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300"
            >
              8087087224
            </a>
          </p>
          <p className="mb-2">
            Call:{" "}
            <a
              href="tel:+919129912991"
              className="underline hover:text-green-300"
            >
              +91-9129912991
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:support@ugaoo.com"
              className="underline hover:text-green-300"
            >
              support@ugaoo.com
            </a>
          </p>
        </div>

        {/* Newsletter / Social can go here or add more sections if needed */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter email address"
              required
              className="px-4 py-2 rounded text-white"
            />
            <button className="bg-green-700 hover:bg-green-800 transition text-white py-2 rounded font-semibold">
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-green-300">
            For plant care tips, our featured plant of the week, exclusive offers and discounts
          </p>
        </div>

      </div>

      <div className="mt-10 border-t border-green-700 pt-6 text-center text-green-400 text-sm">
        <p>© 2025, Ugaoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
