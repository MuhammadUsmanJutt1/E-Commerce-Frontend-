'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to submit a review');
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (formData.title.trim().length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (formData.comment.trim().length < 10) {
      setError('Comment must be at least 10 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/reviews', {
        productId,
        rating: formData.rating,
        title: formData.title.trim(),
        comment: formData.comment.trim(),
      });

      setSuccess(true);
      setFormData({ rating: 0, title: '', comment: '' });
      
      // Call callback to refresh reviews list
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || formData.rating);

      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              isActive ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-600 mb-4">Please log in to write a review</p>
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#A07A28] transition-colors"
        >
          Log In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6 mt-8">
      <h3 className="text-xl font-bold mb-6">Write a Review</h3>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thank you! Your review has been submitted successfully.
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center">
            {renderStars()}
            <span className="ml-3 text-sm text-gray-600">
              {formData.rating > 0 && (
                <>
                  {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Summarize your review in a few words"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            maxLength={100}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.title.length}/100
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Tell others about your experience with this product"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent resize-vertical"
            maxLength={1000}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.comment.length}/1000
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || formData.rating === 0}
          className="w-full bg-[#B88E2F] text-white py-3 px-6 rounded-md hover:bg-[#A07A28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;