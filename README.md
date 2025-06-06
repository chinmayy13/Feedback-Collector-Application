# Feedback Collector

A full-stack web application for collecting and managing user feedback in real-time.

##[Live Server](https://feedback-collector-application-3u7g.vercel.app/)

## Features

-  **Intuitive Feedback Form** - Users can submit their name, message, and star rating
-  **Real-time Dashboard** - View all feedback with search and sorting capabilities
-  **Star Rating System** - 5-star rating system with visual feedback
-  **Advanced Filtering** - Search by name/message, sort by date/rating/name
-  **Responsive Design** - Works perfectly on desktop, tablet, and mobile
-  **Modern UI** - Beautiful glassmorphism design with smooth animations
-  **Statistics** - View total feedbacks and average ratings

## Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chinmayy13/Feedback-Collector-Application
   cd feedback-collector
   ```

2. **Install client dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/feedback-collector
   PORT=5000
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

4. **(Optional) Preview the production build**

    📂 Open a new terminal (keep the dev server running), then run:

   ```bash
   npm run build
   npm run preview
   ```

5. **Open your browser**
   - Frontend: http://localhost:4173/
   - Backend API: http://localhost:5000/api/feedback

## API Endpoints

### Feedback Routes
- `GET /api/feedback` - Fetch all feedbacks
  - Query parameters: `search`, `sortBy`, `order`
- `POST /api/feedback` - Submit new feedback
  - Body: `{ name, message, rating }`
- `GET /api/feedback/stats` - Get feedback statistics

## Project Structure

```
feedback-collector/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/                 # Backend Node.js application
    ├── models/
    │   └── Feedback.js
    ├── routes/
    │   └── feedback.js
    ├── server.js
    ├── .env
    └── package.json
```

## Features in Detail

### Feedback Form
- Real-time validation
- Character count for messages
- Interactive star rating
- Success/error feedback
- Loading states

### Dashboard
- Search functionality
- Multiple sorting options
- Responsive card layout
- Real-time updates
- Statistics display

### Backend Features
- Input validation and sanitization
- Error handling middleware
- Database indexing for performance
- CORS configuration
- RESTful API design

## Deployment

### Frontend (Vercel)
1. Build the project: `npm run build`
2. Deploy to Vercel or your preferred hosting service

### Backend (Render/Railway)
1. Set environment variables in your hosting service
2. Deploy the server directory

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update the `MONGODB_URI` in your environment variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please feel free to open an issue on GitHub.
