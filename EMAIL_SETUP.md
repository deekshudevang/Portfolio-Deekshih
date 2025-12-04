# Email Integration Setup Guide

This guide explains the email setup for your contact form.

## ✅ Current Status - FORMSPREE CONFIGURED

Your contact form is **already set up and working** with Formspree!

- **Endpoint**: `https://formspree.io/f/xovqjdbg`
- **Emails go to**: `deekshudevang@gmail.com`
- **Status**: ✅ Active and ready to receive messages

### How It Works:

1. User fills out the contact form on your portfolio
2. Form data is sent to Formspree's secure endpoint
3. Formspree forwards the email to `deekshudevang@gmail.com`
4. You receive the message in your inbox
5. You can reply directly from your email

### No Setup Required!

The form is ready to use right now. Just:
1. Run `npm run dev`
2. Navigate to the contact section
3. Fill out the form
4. Submit and check your email!

### Formspree Dashboard

To manage your form submissions:
1. Go to [formspree.io](https://formspree.io)
2. Sign in with the account that created form `xovqjdbg`
3. View submissions, analytics, and settings

---

## Alternative Email Solutions

If you want to switch from Formspree, here are other options:

## Option 1: Formspree (Easiest - No Backend Code)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint URL
3. Update the form submission in `src/app/page.tsx`:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }),
});
```

## Option 2: Resend (Recommended for Production)

1. Install the package:
```bash
npm install resend
```

2. Sign up at [resend.com](https://resend.com) and get your API key

3. Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

4. Update `src/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'deekshudevang@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
```

## Option 3: Nodemailer with Gmail

1. Install:
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

2. Set up Gmail App Password (required for 2FA):
   - Go to Google Account > Security > 2-Step Verification > App passwords
   - Generate a new app password

3. Add to `.env.local`:
```
GMAIL_USER=deekshudevang@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

4. Update `src/app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'deekshudevang@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
```

## Security Notes

- Never commit `.env.local` to version control
- Add `.env.local` to `.gitignore` (already done)
- Use environment variables for all sensitive data
- Validate and sanitize all user inputs (already implemented)

## Testing

After setting up any option above:

1. Run the dev server: `npm run dev`
2. Fill out the contact form
3. Check your email at `deekshudevang@gmail.com`
4. Verify the message was received

## Deployment

When deploying to Vercel/Netlify:
- Add environment variables in the platform's dashboard
- Ensure the API route is deployed correctly
- Test the form on the live site

Choose the option that best fits your needs. Formspree is quickest for getting started, while Resend or Nodemailer offer more control.
