# Deekshith G - Portfolio

My personal portfolio website showcasing my projects and skills as a frontend developer.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or open in VS Code**
   ```bash
   # If cloning
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## VS Code Setup

### Recommended Extensions
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Running in VS Code

1. Open the project folder in VS Code
2. Open integrated terminal (`Ctrl + ` ` or View > Terminal)
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server
5. Click the localhost link in terminal or preview browser

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- React Icons

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features

✨ **Neon-Dark Cyberpunk Design**
- Glassmorphism cards with animated neon borders
- Smooth parallax effects and micro-interactions
- Responsive design for all devices

📬 **Contact Form**
- Real-time validation
- Formspree integration (emails sent to deekshudevang@gmail.com)
- Success/error states with animations

🔗 **Social Links**
- LinkedIn, Instagram, GitHub, WhatsApp
- Fixed social rail + contact section links
- Neon hover effects

## Contact Form Setup

The contact form is already configured with **Formspree** to send emails to `deekshudevang@gmail.com`.

### How it works:
1. User fills out the form
2. Data is sent to Formspree endpoint
3. Formspree forwards the email to your inbox
4. You receive notification at deekshudevang@gmail.com

**No additional setup required** - it works out of the box!

For alternative email solutions, see `EMAIL_SETUP.md`.

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (no configuration needed)

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy

## Troubleshooting

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## License

MIT © Deekshith G
