# Quick Start Guide for VS Code

## Getting Started in VS Code

### Step 1: Open Project
1. Open VS Code
2. Go to `File > Open Folder`
3. Select the `personal-portfolio` folder
4. Click `Select Folder`

### Step 2: Install Recommended Extensions
When you open the project, VS Code will show a notification asking if you want to install recommended extensions. Click **Install All** to get:
- ESLint (code linting)
- Prettier (code formatting)
- Tailwind CSS IntelliSense (CSS autocomplete)
- ES7+ React snippets (React code snippets)

### Step 3: Open Terminal
- Press `` Ctrl + ` `` (backtick) to open the integrated terminal
- Or go to `View > Terminal`

### Step 4: Install Dependencies
In the terminal, run:
```bash
npm install
```

This will install all required packages (~30 seconds).

### Step 5: Start Development Server
In the terminal, run:
```bash
npm run dev
```

You should see:
```
✓ Ready in 1.8s
- Local:   http://localhost:3000
```

### Step 6: View Your Portfolio
- **Option 1**: Click the `http://localhost:3000` link in the terminal (Ctrl + Click)
- **Option 2**: Open your browser and go to `http://localhost:3000`
- **Option 3**: Use VS Code's preview browser if available

## Features You Can Test

### 🎨 Design
- Scroll through the page to see smooth animations
- Hover over project cards, skill cards, and buttons
- Watch the neon glow effects

### 📝 Contact Form
- Fill out the form with your test data
- Click "Send Message"
- Check `deekshudevang@gmail.com` for the email!

### 🔗 Social Links
- **Fixed Rail** (bottom right/bottom center on mobile)
  - LinkedIn → Opens your professional profile
  - Instagram → Opens @deekshu_devang
  - GitHub → Opens @deekshudevang
  - WhatsApp → Opens chat to +91 94496 68850

- **Contact Section**
  - Same 4 social links with neon hover effects
  - Direct links to email, phone, and website

## Making Changes

### Edit Content
1. Open `src/app/page.tsx`
2. Find the text you want to change
3. Save the file (`Ctrl + S`)
4. The browser will auto-refresh with your changes!

### Edit Projects
1. Open `src/config/portfolio.ts`
2. Update the `projects` array
3. Save the file

### Edit Styles
1. Open `src/app/globals.css`
2. Modify the CSS classes
3. Save and see instant changes

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Stop the server
# Press Ctrl + C in the terminal
```

## Troubleshooting

### "Port 3000 is already in use"
**Solution**: Stop any other application using port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or change the port
npm run dev -- -p 3001
```

### "Module not found" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes not showing
**Solution**: Hard refresh the browser
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

## File Structure

```
personal-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  # Contact API (not used with Formspree)
│   └── config/
│       └── portfolio.ts      # Project data
├── public/
│   └── profile.jpg           # Your profile picture
├── .vscode/                  # VS Code settings
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
└── README.md                # Main documentation
```

## Next Steps

1. ✅ Test the contact form (sends to deekshudevang@gmail.com)
2. ✅ Click all social links to verify they work
3. ✅ Customize the content with your own projects
4. ✅ Deploy to Vercel or Netlify (see README.md)

## Need Help?

- Check `README.md` for detailed documentation
- Check `EMAIL_SETUP.md` for email configuration
- Review Next.js docs: https://nextjs.org/docs

Happy coding! 🚀
