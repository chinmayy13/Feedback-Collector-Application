import React, { useState } from 'react';
import { Send, User, MessageSquare, Star } from 'lucide-react';

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setFeedback({ message: 'Please enter your name', type: 'error' });
      return;
    }
    
    if (!formData.message.trim()) {
      setFeedback({ message: 'Please enter your message', type: 'error' });
      return;
    }
    
    if (formData.rating === 0) {
      setFeedback({ message: 'Please select a rating', type: 'error' });
      return;
    }

    if (formData.message.trim().length < 10) {
      setFeedback({ message: 'Message must be at least 10 characters long', type: 'error' });
      return;
    }

    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      const result = await onSubmit(formData);
      
      if (result.success) {
        setFeedback({ message: result.message, type: 'success' });
        setFormData({ name: '', message: '', rating: 0 });
      } else {
        setFeedback({ message: result.message, type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: 'An unexpected error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Share Your Feedback</h2>
        <p className="text-gray-600 text-sm">Your input helps us improve our services</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            disabled={loading}
          />
        </div>

        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Star className="h-4 w-4 inline mr-1" />
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded transition-all duration-200 hover:scale-110 ${
                  star <= formData.rating 
                    ? 'text-yellow-400' 
                    : 'text-gray-300 hover:text-yellow-200'
                }`}
                disabled={loading}
              >
                <Star className="h-8 w-8 fill-current" />
              </button>
            ))}
          </div>
          {formData.rating > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {formData.rating === 5 ? 'Excellent!' : 
               formData.rating === 4 ? 'Very Good!' :
               formData.rating === 3 ? 'Good!' :
               formData.rating === 2 ? 'Fair' : 'Needs Improvement'}
            </p>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share your thoughts, suggestions, or experience..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
            disabled={loading}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.message.length}/1000 characters
          </div>
        </div>

        {/* Feedback Messages */}
        {feedback.message && (
          <div className={`p-4 rounded-lg border ${
            feedback.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Feedback</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;