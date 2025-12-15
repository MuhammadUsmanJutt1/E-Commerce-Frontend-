'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import api from '@/lib/api';

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [emailForm, setEmailForm] = useState({
        subject: '',
        message: ''
    });

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await api.get('/newsletter/subscribers');
            setSubscribers(response.data);
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
            alert('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!confirm(`Send this email to ${subscribers.length} subscribers?`)) return;

        setSending(true);
        try {
            await api.post('/newsletter/send', emailForm);
            alert('Newsletter sent successfully!');
            setEmailForm({ subject: '', message: '' });
        } catch (error) {
            console.error('Failed to send newsletter:', error);
            alert('Failed to send newsletter');
        } finally {
            setSending(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Newsletter Management</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Send Email Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-lg font-semibold mb-4">Send Newsletter</h2>
                        <form onSubmit={handleSendEmail} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={emailForm.subject}
                                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B88E2F]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    value={emailForm.message}
                                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                                    required
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B88E2F]"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending || subscribers.length === 0}
                                className="w-full bg-[#B88E2F] text-white py-2 rounded-md hover:bg-[#9F7A28] transition-colors disabled:opacity-50"
                            >
                                {sending ? 'Sending...' : `Send to ${subscribers.length} Subscribers`}
                            </button>
                        </form>
                    </div>

                    {/* Subscribers List */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4">Subscribers ({subscribers.length})</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Subscribed At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {subscribers.map((sub) => (
                                            <tr key={sub._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm">{sub.email}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">
                                                    {new Date(sub.subscribedAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {subscribers.length === 0 && (
                                            <tr>
                                                <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                                    No subscribers yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
