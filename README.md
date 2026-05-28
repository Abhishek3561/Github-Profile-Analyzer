# GitHub Profile Analyzer API

A robust backend service that fetches GitHub user data, processes core metrics to generate deep insights, and persists the data in a MySQL database. It automatically updates existing profiles upon re-analysis and exposes REST endpoints for seamless integration.

## 🚀 Live API
* **Base URL:** `https://github-profile-analyzer-bwag.onrender.com`
* **Quick Test:** `https://github-profile-analyzer-bwag.onrender.com/api/github/analyze/octocat`

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **HTTP Client:** Axios
* **External API:** GitHub REST API

---

## ✨ Features
* **Profile Analysis:** Fetches live data directly from the GitHub API using Axios.
* **Insight Generation:** Computes critical metrics including followers, following, total repositories, total stars, total forks, most used language, and top repository.
* **Smart Persistence:** Stores processed data in MySQL and automatically updates existing user records if they are analyzed again.
* **Comprehensive REST Endpoints:** Clean API routes to fetch all cached profiles or query a specific user's analyzed metrics.
* **Cloud Ready:** Structured for seamless deployment to platforms like Render.

---

## 💻 Setup Instructions

1. **Clone the repository and install dependencies:**
```bash
   npm install

2. **Configure your environment variables: Create a .env file in the root directory and populate it with your credentials:**

   PORT=5000

   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=github_analyzer
   DB_PORT=3306

   GITHUB_TOKEN=your_github_token

3. Start the development server:
```bash
   npm run dev

API Endpoints

1. Analyze Profile
Fetches live data, generates insights, updates or saves it to the database, and returns the analyzed profile.

Route: GET /api/github/analyze/:username

Example: https://github-profile-analyzer-bwag.onrender.com/api/github/analyze/torvalds

2. Get All Profiles
Retrieves a list of all historically analyzed profiles saved in the database.

Route: GET /api/github/profiles

3. Get Single Profile
Retrieves saved historical analysis data for a specific user from the database.

Route: GET /api/github/profiles/:username


Database Schema"

Database Name:

SQL
github_analyzer

**Table Structure**
Run the following SQL script to generate the required table structure in your MySQL instance:
   
CREATE TABLE github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  github_id BIGINT,
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  bio TEXT,
  followers INT,
  following INT,
  public_repos INT,
  total_stars INT,
  total_forks INT,
  most_used_language VARCHAR(255),
  top_repo VARCHAR(255),
  account_created_at VARCHAR(255)
);

Conclusion


This project serves as a comprehensive demonstration of core backend development capabilities, showcasing seamless third-party API integration (GitHub REST API), structured data persistence using MySQL, automated upsert workflows, and reliable cloud deployment.