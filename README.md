# GitHub Profile Analyzer API

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API

## Features

* Analyze GitHub profile
* Store GitHub insights in MySQL
* Fetch all analyzed profiles
* Fetch single profile data

## Setup Instructions

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

GITHUB_TOKEN=your_github_token
```

## API Endpoints

### Analyze Profile

GET `/api/github/analyze/:username`

Example:

```bash
/api/github/analyze/torvalds
```

### Get All Profiles

GET `/api/github/profiles`

### Get Single Profile

GET `/api/github/profiles/:username`

## Database Schema

Database name:

```sql
github_analyzer
```
