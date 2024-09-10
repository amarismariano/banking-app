# Payment Management Frontend

This is the frontend of the **Payment Management System**, a web-based interface that allows users to manage their payments. The application provides an intuitive UI for creating, viewing, updating, and deleting payments. Additionally, users can visualize their debt levels through graphical charts.

## Features

- **Manage Payments**: Create, update, and delete payments.
- **Debt Visualization**: View total debt per cardholder using interactive charts.
- **Responsive Design**: The UI is responsive and adapts to different screen sizes.
- **Notifications**: The frontend provides real-time feedback for successful or failed operations via snackbar notifications.
- **Modal Forms**: Create payments using modals for a better user experience.

## Tech Stack

- **React**: JavaScript library for building the user interface.
- **TypeScript**: Provides type safety and improved development experience.
- **Recharts**: For displaying graphical data visualization of debts.
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

## Installation and Setup

### 1. Extract the ZIP File

Once you've downloaded and extracted the ZIP file, navigate to the `frontend` folder.

### 2. Install Dependencies

In your terminal, navigate to the `frontend` directory and install the required dependencies:

```bash
cd path/to/extracted-folder/frontend
npm install
```

---

### **Backend `README.md`**

````markdown
# Payment Management Backend

This is the backend for the **Payment Management System**. The backend serves as a REST API that handles user authentication and payment management operations such as creating, reading, updating, and deleting payments. The API ensures secure access via JWT-based authentication.

## Features

- **User Authentication**: Users can register and log in with secure JWT-based authentication.
- **Payment Management**: API endpoints for managing payments (create, read, update, delete).
- **Authorization**: Ensures that only authenticated users can manage their own payments.
- **Error Handling**: Provides meaningful error responses for invalid operations or inputs.
- **MongoDB Integration**: All data is stored and managed using MongoDB as the database.

## Tech Stack

- **Node.js**: JavaScript runtime environment for backend logic.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for storing user and payment data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: Used for user authentication and authorization.
- **Dotenv**: For environment variable management.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Running locally or remotely)

## Installation and Setup

### 1. Extract the ZIP File

Once you've downloaded and extracted the ZIP file, navigate to the `backend` folder.

### 2. Install Dependencies

In your terminal, navigate to the `backend` directory and install the required dependencies:

```bash
cd path/to/extracted-folder/backend
npm install
```
````

ENVS
PORT=5000
MONGO_URI=mongodb://localhost:27017/payment-management
JWT_SECRET=your_jwt_secret

npm start

