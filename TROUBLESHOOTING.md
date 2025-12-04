# Troubleshooting Guide

## Common Issues in VS Code

### 1. "Port 3000 is already in use"

**Error Message:**
```
⚠ Port 3000 is in use by process XXXXX
```

**Solution A: Kill the Process (Windows)**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace XXXXX with actual PID)
taskkill /F /PID XXXXX
```

**Solution B: Use a Different Port**
```bash
npm run dev -- -p 3001
```
Then open `http://localhost:3001`

**Solution C: Stop All Node Processes**
```bash
# PowerShell
Get-Process node | Stop-Process -Force

# Then restart
npm run dev
```

---

### 2. "Unable to acquire lock at .next/dev/lock"

**Error Message:**
```
⨯ Unable to acquire lock at .next/dev/lock, is another instance of next dev running?
```

**Solution:**
```bash
# 1. Stop all running Node processes
Get-Process node | Stop-Process -Force

# 2. Delete the .next folder
Remove-Item -Recurse -Force .next

# 3. Restart the dev server
npm run dev
```

**VS Code Specific:**
- Check if you have multiple terminals running `npm run dev`
- Close all terminals: Click trash icon on each terminal
- Restart VS Code completely
- Open new terminal and run `npm run dev`

---

### 3. "Module not found" or Import Errors

**Solution:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

### 4. Changes Not Reflecting in Browser

**Solutions:**
1. **Hard Refresh Browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Next.js Cache**
   ```bash
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

3. **Check if File is Saved**
   - Unsaved files have a dot (•) next to filename
   - Press `Ctrl + S` to save

---

### 5. TypeScript/ESLint Errors Not Showing

**Solution:**
```bash
# In VS Code terminal
npm run lint
```

**Install Required Extensions:**
1. Open Extensions (`Ctrl + Shift + X`)
2. Search and install:
   - ESLint
   - TypeScript Extension Pack

---

### 6. Tailwind CSS Classes Not Working

**Solution:**
1. Check `globals.css` has:
   ```css
   @import "tailwindcss";
   ```

2. Restart the dev server:
   ```bash
   # Stop server (Ctrl + C)
   npm run dev
   ```

3. Install Tailwind CSS IntelliSense extension

---

### 7. "Cannot find module" for @/* imports

**Solution:**
Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Then restart VS Code.

---

### 8. Multiple Lockfile Warning

**Warning Message:**
```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles
```

**Solution (Safe to Ignore):**
This warning is safe to ignore. It's because there's a lockfile in a parent directory.

**To Remove Warning:**
Add to `next.config.ts`:
```typescript
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
```

---

### 9. Contact Form Not Sending Emails

**Check:**
1. Form endpoint is: `https://formspree.io/f/xovqjdbg`
2. Check browser console for errors (F12 > Console)
3. Verify internet connection
4. Check spam folder in email

**Test:**
```bash
# In browser console (F12)
fetch('https://formspree.io/f/xovqjdbg', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'test' })
}).then(r => console.log(r.ok))
```

---

### 10. Social Links Not Working

**Verify Links:**
- LinkedIn: https://www.linkedin.com/in/deekshith-g-594b8434b
- Instagram: https://www.instagram.com/deekshu_devang
- GitHub: https://github.com/deekshudevang
- WhatsApp: https://wa.me/919449668850

**Check:**
1. Right-click link > "Inspect Element"
2. Verify `href` attribute is correct
3. Check browser console for errors

---

## Quick Fixes

### Reset Everything
```bash
# Stop all processes
Get-Process node | Stop-Process -Force

# Clean build artifacts
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall and restart
npm install
npm run dev
```

### Restart VS Code
1. Close all terminals
2. Close VS Code completely
3. Reopen VS Code
4. Open integrated terminal (`Ctrl + \``)
5. Run `npm run dev`

---

## VS Code Terminal Tips

### Open Terminal
- Keyboard: `Ctrl + \`` (backtick)
- Menu: `View > Terminal`

### Multiple Terminals
- Click `+` icon to create new terminal
- Click split icon to split terminal
- Use dropdown to switch between terminals

### Clear Terminal
```bash
cls  # Windows PowerShell
clear  # Mac/Linux
```

### Stop Running Process
- Press `Ctrl + C` in the terminal

---

## Getting Help

1. **Check Console:**
   - Browser: Press `F12` > Console tab
   - VS Code: View > Output > Select "Tasks"

2. **Check Terminal:**
   - Look for error messages in VS Code terminal
   - Red text indicates errors

3. **Documentation:**
   - `README.md` - Setup guide
   - `VSCODE_GUIDE.md` - VS Code specific help
   - `EMAIL_SETUP.md` - Email configuration

4. **Common Error Patterns:**
   - `EADDRINUSE` → Port in use (Solution #1)
   - `MODULE_NOT_FOUND` → Missing dependencies (Solution #3)
   - `Lock file` → Another instance running (Solution #2)

---

## Still Having Issues?

1. Run diagnostics:
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   npm run lint    # Check for code errors
   ```

2. Check file structure:
   ```bash
   # Should see these folders
   dir src
   dir public
   dir .next
   ```

3. Verify installation:
   ```bash
   # Should complete without errors
   npm install
   ```

**Most issues are fixed by:**
- Restarting VS Code
- Deleting `.next` folder
- Running `npm install` again

---

**Need more help?** Check the Next.js documentation at https://nextjs.org/docs
