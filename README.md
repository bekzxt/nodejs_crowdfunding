# Crowdfunding System

## Project Overview
The Crowdfunding System is a Node.js-based web application that allows users to create, manage, and contribute to crowdfunding projects. The system supports user authentication, project creation, and donation tracking.

## Features
- User authentication (signup, login, JWT-based authentication)
- Admin management for projects and users
- Project creation, updating, and deletion
- Donation functionality
- Secure password hashing
- Middleware-based access control

## Technologies Used
- **Node.js** (Express.js for backend framework)
- **MongoDB** (Mongoose for database operations)
- **JWT** (JSON Web Tokens for authentication)
- **Bcrypt.js** (for password encryption)
- **Dotenv** (for environment variables)

## Setup Instructions
### Prerequisites
- Install **Node.js** (v14+ recommended)
- Install **MongoDB** and set up a database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bekzxt/nodejs_crowdfunding.git
   cd nodejs_crowdfunding
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

# Crowdfunding System API Documentation

### Authentication

#### Register a User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login a User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

### User Management

#### Get User Profile
**Endpoint:** `GET /api/users/profile`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
   "_id": "UserID",
   "username": "User",
   "email": "User@example.com",
   "role": "user",
   "createdAt": "2025-02-25T14:51:07.610Z",
   "updatedAt": "2025-02-25T14:51:07.610Z",
   "__v": 0
}
```

#### Update User Profile
**Endpoint:** `PUT /api/users/profile`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "username": "newUsername",
  "email": "newemail@example.com",
  "password": "newPassword"
}
```

**Response:**
```json
{
   "message": "Profile updated successfully",
   "user": {
      "_id": "UserID",
      "username": "newUsername",
      "email": "newemail@example.com",
      "password": "$2b$10$eP42QMCaBOF/WBi6V77h9eCO3B0PfkdNDFqVNVgDgNOPdd78dejX6",
      "role": "user",
      "createdAt": "2025-02-25T14:51:07.610Z",
      "updatedAt": "2025-02-25T14:59:22.692Z",
      "__v": 0
   }
}
```

### Projects

#### Create a Project
**Endpoint:** `POST /api/projects`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "title": "Project Name",
  "description": "Detailed description of the project",
  "goal": 10000
}
```

**Response:**
```json
{
   "title": "Project Name",
   "description": "Detailed description of the project",
   "goal": 10000,
   "raised": 0,
   "creator": "UserID",
   "_id": "ProjectID",
   "createdAt": "2025-02-25T15:00:54.954Z",
   "updatedAt": "2025-02-25T15:00:54.954Z",
   "__v": 0
}
```

#### Get All Projects
**Endpoint:** `GET /api/projects`

**Response:**
```json
{
   "_id": "ProjectID",
   "title": "Project Name",
   "description": "Detailed description of the project",
   "goal": 10000,
   "raised": 0,
   "creator": {
      "_id": "UserID",
      "username": "newUsername",
      "email": "newemail@example.com"
   },
   "createdAt": "2025-02-25T15:00:54.954Z",
   "updatedAt": "2025-02-25T15:00:54.954Z",
   "__v": 0
}
```

#### Get a Specific Project
**Endpoint:** `GET /api/projects/:id`

**Response:**
```json
{
   "_id": "ProjectID",
   "title": "Project Name",
   "description": "Detailed description of the project",
   "goal": 10000,
   "raised": 0,
   "creator": {
      "_id": "UserID",
      "username": "newUsername",
      "email": "newemail@example.com"
   },
   "createdAt": "2025-02-25T15:00:54.954Z",
   "updatedAt": "2025-02-25T15:00:54.954Z",
   "__v": 0
}
```

#### Update a Project (Owner Only)
**Endpoint:** `PUT /api/projects/:id`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "title": "Updated Project Name",
  "description": "Updated description",
  "goal": 15000
}
```

**Response:**
```json
{
   "_id": "ProjectID",
   "title": "Updated Project Name",
   "description": "Updated description",
   "goal": 15000,
   "raised": 0,
   "creator": "UserID",
   "createdAt": "2025-02-25T15:00:54.954Z",
   "updatedAt": "2025-02-25T15:04:14.066Z",
   "__v": 0
}
```

#### Delete a Project (Owner Only)
**Endpoint:** `DELETE /api/projects/:id`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
   "message": "Project deleted"
}
```

### Donations

#### Make a Donation
**Endpoint:** `POST /api/donations`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "projectId": "ProjectID",
  "amount": 100
}
```

**Response:**
```json
{
   "message": "Donation successful",
   "donation": {
      "amount": 100,
      "donor": "UserID",
      "project": "ProjectID",
      "_id": "DonationID",
      "createdAt": "2025-02-25T15:07:17.121Z",
      "__v": 0
   }
}
```

#### Get Donations for a Project
**Endpoint:** `GET /api/donations/:projectId`

**Response:**
```json
[
  {
    "id": "donationId",
    "amount": 100,
    "donor": {
       "_id": "UserID",
       "username": "example",
       "email": "user@example.com"
    }
  }
]
```

### Admin Routes

#### Get All Users (Admin Only)
**Endpoint:** `GET /api/admin/users`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
[
  {
    "id": "userId",
    "username": "exampleUser",
    "email": "user@example.com"
  }
]
```

#### Delete a User (Admin Only)
**Endpoint:** `DELETE /api/admin/users/:id`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```
## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute.

## Contact
For any inquiries or contributions, reach out to:
- **Amirov Bekzat**
- **Ermukhanov Daulet**

Thank you very much!
