import dedent from "dedent";

export default {
  SUGGESTIONS: [
    'Create Modern Dashboard UI with Analytics',
    'Build a Full-Stack E-commerce Store',
    'Create Social Media Profile UI with Animations',
    'Design Portfolio Website with Image Gallery', 
    'Build Admin Panel with User Management'
  ],
  HERO_HEADING: 'Turn ideas into code instantly',
  HERO_DESC: 'Build, customize, and deploy web apps with FADE\'s AI-powered development platform.',
  INPUT_PLACEHOLDER: 'Describe your project or app idea...',
  SIGNIN_HEADING: 'Welcome to FADE',
  SIGNIN_SUBHEADING: 'Please sign in to your account or create a new one to get started.',
  SIGNIN_AGREEMENT_TEXT: 'By using FADE, you agree to our Terms of Service and Privacy Policy regarding data collection for analytics and service improvement.',

  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FADE Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background-color: #0f172a;
        color: #e2e8f0;
      }
    </style>
  </head>
  <body>
    <div id="root" class="min-h-screen"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --secondary: #818cf8;
  --accent: #a78bfa;
  --background: #0f172a;
  --card: #1e293b;
  --text: #e2e8f0;
  --text-muted: #94a3b8;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
  color: var(--text);
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}`
    },
    '/tailwind.config.js': {
      code: `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#818cf8",
        accent: "#a78bfa",
        background: "#0f172a",
        card: "#1e293b",
        dark: "#0f172a"
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.2)',
        'hover': '0 8px 25px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`
    }
  },
  DEPENDANCY: {
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
    "framer-motion": "^11.0.3",
    "react-syntax-highlighter": "^15.5.0"
  },
}