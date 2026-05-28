CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    github_id BIGINT UNIQUE,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    followers INT,
    following INT,
    public_repos INT,
    total_stars INT,
    total_forks INT,
    most_used_language VARCHAR(100),
    top_repo VARCHAR(255),
    account_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);