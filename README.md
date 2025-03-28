# Project Setup & API Documentation

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (version 14+ recommended)
- **MongoDB** (local or cloud instance)
- **Postman** (for testing APIs)

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shayandutta/binBagAssignment
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Start the server:**
   ```bash
   npm run server
   ```
   The server should be running at `http://localhost:5000`.

---

## API Documentation (Postman Collection)

### **Authentication Routes**

#### **Register User**
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St",
    "gender": "male"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token",
    "user": { "_id": "123", "name": "John Doe", "email": "john@example.com" }
  }
  ```

#### **Login User**
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token",
    "user": { "_id": "123", "name": "John Doe", "email": "john@example.com" }
  }
  ```

#### **Get User Profile**
- **Endpoint:** `GET /api/user/profile`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Response:**
  ```json
  {
    "_id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "gender": "male",
    "profilePicture": "https://example.com/profile.jpg"
  }
  ```

#### **Update User Profile**
- **Endpoint:** `PUT /api/user/profile`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Request Body:**
  ```json
  {
    "name": "John Updated",
    "address": "456 New Address",
    "bio": "Updated bio",
    "profilePicture": "https://example.com/new-profile.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "123",
    "name": "John Updated",
    "email": "john@example.com",
    "address": "456 New Address",
    "gender": "male",
    "profilePicture": "https://example.com/new-profile.jpg"
  }
  ```

---

## Notes
- Use **Postman** or **cURL** to test API requests.
- Ensure MongoDB is running before starting the server.
- Update `.env` variables with your actual database connection string and secret key.



