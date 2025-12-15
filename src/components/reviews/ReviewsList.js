'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import api from '@/lib/api';

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async (pageNum = 1) => {
    try {
      const response = await api.get(`/reviews/product/${productId}?page=${pageNum}&limit=5`);
      const { reviews: newReviews, stats: reviewStats, pagination } = response.data;

      if (pageNum === 1) {
        setReviews(newReviews);
        setStats(reviewStats);
      } else {
        setReviews(prev => [...prev, ...newReviews]);
      }

      setHasMore(pagination.page < pagination.pages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchReviews(page + 1);
    }
  };

  const markHelpful = async (reviewId) => {
    try {
      await api.post(`/reviews/${reviewId}/helpful`);
      // Refresh reviews to show updated helpful count
      fetchReviews(1);
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingDistribution = () => {
    if (!stats) return null;

    const { distribution, totalReviews } = stats;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating] || 0;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <div key={rating} className="flex items-center mb-2">
              <span className="w-8 text-sm">{rating}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current mx-1" />
              <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-gray-600">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-4 mb-4">
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {stats && (
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              {renderStars(Math.round(stats.averageRating))}
              <span className="ml-2 text-lg font-semibold">
                {stats.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              ({stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {stats && stats.totalReviews > 0 && renderRatingDistribution()}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{review.user?.name || 'Anonymous'}</h4>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              {review.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>

            <h5 className="font-semibold mb-2">{review.title}</h5>
            <p className="text-gray-700 mb-3">{review.comment}</p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => markHelpful(review._id)}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      )}

      {hasMore && reviews.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More Reviews'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;