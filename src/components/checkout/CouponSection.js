'use client';

import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import api from '@/lib/api';

const CouponSection = ({ orderAmount, cartItems, onCouponApplied, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);

  const validateCoupon = async (code) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/coupons/validate', {
        code: code.toUpperCase(),
        orderAmount,
        cartItems,
      });

      if (response.data.valid) {
        onCouponApplied({
          code: code.toUpperCase(),
          discount: response.data.discount,
          coupon: response.data.coupon,
        });
        setCouponCode('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      validateCoupon(couponCode.trim());
    }
  };

  const removeCoupon = () => {
    onCouponApplied(null);
    setError('');
  };

  const fetchAvailableCoupons = async () => {
    try {
      const response = await api.get('/coupons/active');
      setAvailableCoupons(response.data);
      setShowAvailable(true);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };

  const applyCouponFromList = (code) => {
    setCouponCode(code);
    setShowAvailable(false);
    validateCoupon(code);
  };

  const formatDiscount = (coupon, discount) => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% off (Save $${discount.toFixed(2)})`;
      case 'fixed_amount':
        return `$${discount.toFixed(2)} off`;
      case 'free_shipping':
        return 'Free shipping';
      default:
        return `$${discount.toFixed(2)} off`;
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Tag className="w-5 h-5 text-[#B88E2F] mr-2" />
        <h3 className="text-lg font-semibold">Coupon Code</h3>
      </div>

      {appliedCoupon ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="font-semibold text-green-800">
                  Coupon Applied: {appliedCoupon.code}
                </p>
                <p className="text-sm text-green-600">
                  {formatDiscount(appliedCoupon.coupon, appliedCoupon.discount)}
                </p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleApplyCoupon} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !couponCode.trim()}
                className="px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#A07A28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Applying...' : 'Apply'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <button
            onClick={fetchAvailableCoupons}
            className="text-[#B88E2F] hover:text-[#A07A28] text-sm font-medium transition-colors"
          >
            View available coupons
          </button>

          {showAvailable && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-gray-700">Available Coupons:</h4>
              {availableCoupons.length > 0 ? (
                <div className="space-y-2">
                  {availableCoupons.map((coupon) => (
                    <div
                      key={coupon._id}
                      className="border border-gray-200 rounded-lg p-3 hover:border-[#B88E2F] transition-colors cursor-pointer"
                      onClick={() => applyCouponFromList(coupon.code)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#B88E2F]">{coupon.code}</p>
                          <p className="text-sm text-gray-600">{coupon.name}</p>
                          {coupon.description && (
                            <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {coupon.type === 'percentage' && `${coupon.value}% OFF`}
                            {coupon.type === 'fixed_amount' && `$${coupon.value} OFF`}
                            {coupon.type === 'free_shipping' && 'FREE SHIPPING'}
                          </p>
                          {coupon.minimumOrderAmount && (
                            <p className="text-xs text-gray-500">
                              Min. order: ${coupon.minimumOrderAmount}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No coupons available at the moment.</p>
              )}
              <button
                onClick={() => setShowAvailable(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Hide coupons
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CouponSection;