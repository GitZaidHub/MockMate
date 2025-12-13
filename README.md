# MockMate Ai 🤖🎤

**Master Your Interviews. Crack that Dream Job.**

MockMate Ai is an advanced AI-powered interview preparation platform designed to help candidates practice, refine, and perfect their interviewing skills. By leveraging Google's **Gemini AI**, we provide realistic voice-based mock interviews, real-time feedback, and ATS-optimized resume analysis.

![Made with Love](https://img.shields.io/badge/Made%20with-💜-violet) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Gemini AI](https://img.shields.io/badge/AI-Gemini-blue)

## 🚀 Features

- **🎙️ AI Voice Interviews**: Experience realistic, interactive interview sessions with a human-like AI interviewer.
- **📄 Resume Doctor**: Upload your resume (PDF) and get an instant ATS score, keyword analysis, and improvement suggestions.
- **⚡ Instant Feedback**: Receive detailed feedback on your answers immediately after the interview, including technical accuracy and communication scoring.
- **🎯 Role-Specific Prep**: Tailored questions for Full Stack, Frontend, Backend, and other technical roles.
- **📊 Performance Tracking**: Dashboard to view past interview scores and track your progress over time.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | JavaScript / React 19 |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) |
| **Database** | MongoDB & Mongoose |
| **Authentication** | Custom Auth / Clerk (if applicable) |
| **AI Model** | Google Gemini 1.5 Flash |
| **Icons** | Lucide React |

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local or Atlas connection string)
- **Google Gemini API Key**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mockmate-ai.git
    cd mockmate-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    MONGODB_URI=your_mongodb_connection_string
    # Add other necessary env vars here (e.g., Clerk keys if used)
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
