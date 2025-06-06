import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// GET /api/feedback - Fetch all feedbacks
router.get("/", async (req, res) => {
  try {
    const { search, sortBy = "createdAt", order = "desc" } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ],
      };
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const feedbacks = await Feedback.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(100); // Limit to prevent performance issues

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedback",
      message: error.message,
    });
  }
});

// POST /api/feedback - Submit new feedback
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    // Validation
    if (!name || !message || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, message, and rating are required fields",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const feedback = new Feedback({
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating),
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!",
      data: savedFeedback,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit feedback. Please try again.",
    });
  }
});

// GET /api/feedback/stats - Get feedback statistics
router.get("/stats", async (req, res) => {
  try {
    const totalCount = await Feedback.countDocuments();
    const averageRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    const ratingDistribution = await Feedback.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalFeedbacks: totalCount,
        averageRating: averageRating[0]?.avgRating?.toFixed(1) || 0,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
});

export default router;
