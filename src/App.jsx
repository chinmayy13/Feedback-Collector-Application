import React, { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import { MessageCircle, TrendingUp } from "lucide-react";

const API_URL = "http://localhost:5000/api/feedback";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [stats, setStats] = useState(null);

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          search: searchTerm,
          sortBy,
          order: sortOrder,
        },
      });

      if (response.data.success) {
        setFeedbacks(response.data.data);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError(
        "Failed to load feedbacks. Please check if the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Submit feedback
  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const response = await axios.post(API_URL, feedbackData);

      if (response.data.success) {
        await fetchFeedbacks(); // Refresh the list
        await fetchStats(); // Refresh stats
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      const message =
        err.response?.data?.message ||
        "Failed to submit feedback. Please try again.";
      return { success: false, message };
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, [searchTerm, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Feedback Collector
                </h1>
                <p className="text-sm text-gray-600">
                  Share your thoughts and help us improve
                </p>
              </div>
            </div>

            {stats && (
              <div className="hidden md:flex items-center space-x-6 bg-white rounded-lg px-4 py-2 shadow-sm border">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {stats.totalFeedbacks} feedbacks
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Avg Rating: ⭐ {stats.averageRating}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FeedbackForm onSubmit={handleSubmitFeedback} />
            </div>
          </div>

          {/* Dashboard */}
          <div className="lg:col-span-2">
            <Dashboard
              feedbacks={feedbacks}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onRefresh={fetchFeedbacks}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>
              © 2024 Feedback Collector. Built with React, Node.js, and MongoDB.
              || Made with ❤️ by Chinmay
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
