# PokeDex Showdown

An interactive Pokemon database application with AI-powered battle comparisons, built with React and modern web technologies.

## Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pokédex-showdown
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with the following required variables:

   | Variable | Description |
   |----------|-------------|
   | `GEMINI_API_KEY` | Google Gemini API key for AI features |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for authentication |
   | `CLERK_SECRET_KEY` | Clerk secret key for authentication |

   Get your Clerk keys from [Clerk Dashboard](https://clerk.com/dashboard) after creating an application.
   Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Running the App

### Development Mode
```bash
npm run dev
```
Access the app at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove dist folder |

## Technologies Used

| Technology | Purpose | Why |
|------------|---------|-----|
| **React 19** | UI Framework | Latest React with improved performance and concurrent features |
| **Vite 6** | Build Tool | Fast HMR and optimized production builds |
| **Tailwind CSS 4** | Styling | Utility-first CSS with zero runtime overhead |
| **Clerk** | Authentication | User management with OAuth support |
| **Google Gemini AI** | AI Features | Power battle comparisons and Pokemon insights |
| **Motion** | Animations | Smooth, declarative animations for UI interactions |
| **Lucide React** | Icons | Lightweight, consistent icon library |
| **Express** | Backend | Simple server for API proxying if needed |
| **TypeScript** | Type Safety | Compile-time type checking for reliability |

## Project Structure

```
src/
├── App.tsx           # Main application component
├── components/
│   ├── PokemonCard.tsx    # Individual Pokemon card display
│   └── PokemonModal.tsx   # Detailed Pokemon view modal
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types.ts          # TypeScript type definitions
├── index.css        # Global styles
└── main.tsx         # Application entry point
```

## Features

- **Pokemon Database**: Browse and search Pokemon with detailed stats
- **AI Battle Comparisons**: Get AI-powered analysis of Pokemon matchups
- **User Authentication**: Secure login via Clerk
- **Responsive Design**: Works on mobile and desktop
- **Smooth Animations**: Polished UI interactions

## Troubleshooting

### Port already in use
If port 3000 is busy, specify a different port:
```bash
npm run dev -- --port=3001
```

### TypeScript errors
Run type checking to see detailed errors:
```bash
npm run lint
```

### Build fails
Ensure all environment variables are set in `.env` file.