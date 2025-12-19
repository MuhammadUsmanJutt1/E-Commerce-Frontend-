'use client';

import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const ReviewsSection = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // New Review Form State
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (productId) {
            fetchReviews();
            fetchStats();
        }
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/reviews/product/${productId}`);
            setReviews(data.reviews || []);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await api.get(`/reviews/product/${productId}/stats`);
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to write a review');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/reviews', {
                product: productId,
                rating,
                title,
                comment
            });
            toast.success('Review submitted successfully!');
            setTitle('');
            setComment('');
            setRating(5);
            fetchReviews();
            fetchStats();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (count, size = 16, interactive = false) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={size}
                className={`
                    ${index < count ? 'fill-[#FFC700] text-[#FFC700]' : 'text-gray-300'}
                    ${interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''}
                `}
                onMouseEnter={() => interactive && setHoverRating(index + 1)}
                onMouseLeave={() => interactive && setHoverRating(0)}
                onClick={() => interactive && setRating(index + 1)}
            />
        ));
    };

    if (loading) return <div className="text-center py-8">Loading reviews...</div>;

    return (
        <div className="space-y-12">
            {/* Reviews Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                    {stats && (
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg min-w-[150px]">
                                <span className="text-5xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</span>
                                <div className="flex gap-1 my-2">
                                    {renderStars(Math.round(stats.averageRating))}
                                </div>
                                <span className="text-sm text-gray-500">{stats.totalReviews} Reviews</span>
                            </div>
                            <div className="flex-1 space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = stats.ratingDistribution?.[star] || 0;
                                    const percentage = stats.totalReviews ? (count / stats.totalReviews) * 100 : 0;
                                    return (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="text-sm font-medium w-3">{star}</span>
                                            <Star size={12} className="fill-gray-400 text-gray-400" />
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#B88E2F] rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Write Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h4>
                    {!user ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">Please log in to write a review</p>
                            <a href="/login" className="text-[#B88E2F] font-semibold hover:underline">Login Now</a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div className="flex gap-1">
                                    {renderStars(hoverRating || rating, 24, true)}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Summarize your experience"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B88E2F] focus:border-[#B88E2F] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What did you like or dislike?"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#B88E2F] focus:border-[#B88E2F] outline-none resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#B88E2F] text-white py-2 rounded-md font-semibold hover:bg-[#9F7A28] transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review this product!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</p>
                                        <div className="flex gap-1">
                                            {renderStars(review.rating, 12)}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h5 className="font-medium text-gray-900 mt-2 mb-1">{review.title}</h5>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsSection;
