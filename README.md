# ComfortSense Web Dashboard

A modern web application built with [Next.js](https://nextjs.org/) for monitoring indoor comfort levels and wearable device data. This dashboard features a clean, minimal user interface designed for ease of use and visual appeal.

## 🚀 Features

-   **Dashboard Overview**: Real-time comfort prediction status (Comfortable/Uncomfortable) with vital signs monitoring (Heart Rate, SpO2).
-   **Wearable Device Management**: Select and switch between connected wearable devices (e.g., EMO-0000X).
-   **Personal Information**: A dedicated, minimal view for user profile details with a clean, whitespace-focused design.
-   **Prediction History**: View past comfort predictions and trends (Coming Soon).
-   **Profile Settings**: Edit user personal information (Age, Gender, BMI, Allergies) and update profile pictures.
-   **Responsive Design**: Fully responsive layout optimized for desktop and mobile viewing with a fixed "locked" layout experience.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: MongoDB (via Mongoose)
-   **Authentication**: JWT & Bcrypt

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/comfort-web.git
    cd comfort-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

-   `app/`: App Router pages and layouts.
    -   `dashboard/`: Main application views (Home, Info, History, Profile).
    -   `api/`: Backend API routes (Auth, Device, User).
-   `components/`: Reusable UI components (Sidebar, TopBar, Cards).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
