'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import api from '@/lib/api';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your Furniro AI assistant. How can I help you find the perfect furniture today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, previewUrl]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((!input.trim() && !selectedFile) || isLoading) return;

        const userMessage = input.trim();
        const currentFile = selectedFile;
        const currentPreview = previewUrl;

        // Clear input state immediately
        setInput('');
        clearFile();

        // Add user message
        setMessages(prev => [
            ...prev,
            {
                role: 'user',
                content: userMessage,
                image: currentPreview
            }
        ]);

        setIsLoading(true);

        try {
            let data;
            if (currentFile) {
                const formData = new FormData();
                formData.append('image', currentFile);
                const res = await api.post('/ai/image-search', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                data = res.data;
            } else {
                const res = await api.post('/ai/chat', { message: userMessage });
                data = res.data;
            }

            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: data.reply,
                    product: data.product
                }
            ]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#B88E2F] p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <Sparkles size={20} />
                            <h3 className="font-bold">Furniro AI</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-[#B88E2F] text-white rounded-br-none'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                                        }`}
                                >
                                    {msg.image && (
                                        <img src={msg.image} alt="Upload" className="w-full h-32 object-cover rounded-lg mb-2" />
                                    )}
                                    {msg.content && <p>{msg.content}</p>}

                                    {/* Product Card */}
                                    {msg.product && (
                                        <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200">
                                            <img
                                                src={msg.product.image}
                                                alt={msg.product.title}
                                                className="w-full h-32 object-cover rounded-lg mb-2"
                                            />
                                            <h4 className="font-bold text-gray-900">{msg.product.title}</h4>
                                            <p className="text-[#B88E2F] font-semibold">Rp {msg.product.price.toLocaleString()}</p>
                                            <a
                                                href={`/shop/${msg.product._id}`}
                                                className="block mt-2 text-center bg-[#B88E2F] text-white py-1.5 rounded-lg text-xs font-medium hover:bg-[#9F7A28] transition-colors"
                                            >
                                                View Product
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        {previewUrl && (
                            <div className="relative w-20 h-20 mb-2">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                <button
                                    onClick={clearFile}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-gray-400 hover:text-[#B88E2F] transition-colors p-2"
                                title="Upload Image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask or upload image..."
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B88E2F] text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || (!input.trim() && !selectedFile)}
                                className="bg-[#B88E2F] text-white p-2 rounded-full hover:bg-[#9F7A28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#B88E2F] text-white p-4 rounded-full shadow-lg hover:bg-[#9F7A28] transition-all duration-300 hover:scale-110 group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-pulse" />}
            </button>
        </div>
    );
}
