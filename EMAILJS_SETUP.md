# EmailJS Setup Guide

This guide will help you configure EmailJS to receive waitlist signup emails at start.senda@gmail.com.

## Steps to Configure EmailJS

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service
1. Go to the [Email Services](https://dashboard.emailjs.com/admin) page
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Click "Connect Account" and authorize with your Gmail (start.senda@gmail.com)
5. Copy the **Service ID** (you'll need this later)

### 3. Create Email Template
1. Go to the [Email Templates](https://dashboard.emailjs.com/admin/templates) page
2. Click "Create New Template"
3. Set up the template with these fields:

**Template Settings:**
- **Template Name:** Waitlist Signup
- **Subject:** New Senda Waitlist Signup - {{from_name}}

**Template Content:**
```
New waitlist signup received!

Name: {{from_name}}
Email: {{from_email}}

Timestamp: {{message}}

---
Sent via Senda Landing Page
```

4. In the "To email" field, enter: `start.senda@gmail.com`
5. Save the template
6. Copy the **Template ID** (you'll need this later)

### 4. Get Your Public Key
1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** (formerly called User ID)
3. Copy this key

### 5. Update the Code

Open `js/landing.js` and replace the placeholder values:

**Line 300:** Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with actual key from step 4
```

**Line 349:** Replace `'YOUR_SERVICE_ID'` and `'YOUR_TEMPLATE_ID'`
```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
```

Example:
```javascript
emailjs.init('abc123XYZ'); // Your public key
await emailjs.send('service_abc123', 'template_xyz789', templateParams);
```

## Testing

1. Open your landing page
2. Scroll to the waitlist section
3. Fill in name and email
4. Click "Join the Waitlist"
5. Check start.senda@gmail.com for the notification email

## Email Limits (Free Plan)

- 200 emails per month
- Upgrade to paid plan if you need more

## Troubleshooting

**Email not sending:**
- Check browser console for errors
- Verify Service ID and Template ID are correct
- Ensure Public Key is initialized
- Check EmailJS dashboard for error logs

**Template variables not working:**
- Verify template uses `{{from_name}}`, `{{from_email}}`, and `{{message}}`
- Check that parameter names in code match template

**Gmail blocking:**
- Enable "Less secure app access" in Gmail settings
- Or use App Password instead of regular password

## Auto-Reply Email Template (Template ID: template_sqejque)

This template sends a welcome email to users who join the waitlist. Update your EmailJS template with this HTML:

**Template Settings:**
- **Template Name:** Auto-Reply Waitlist
- **Subject:** Welcome to Senda! 🌱
- **To email:** `{{to_email}}`

**Template Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .email-container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo img {
            width: 80px;
            height: auto;
        }
        h1 {
            color: #4A7C59;
            font-size: 28px;
            margin-bottom: 10px;
            text-align: center;
        }
        .welcome-text {
            font-size: 18px;
            color: #666;
            text-align: center;
            margin-bottom: 30px;
        }
        .content {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }
        .benefits {
            background: #f8f9fa;
            border-left: 4px solid #4A7C59;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
        }
        .benefits h3 {
            color: #4A7C59;
            margin-top: 0;
            font-size: 18px;
        }
        .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .benefits li {
            margin: 8px 0;
            color: #555;
        }
        .social-links {
            text-align: center;
            margin: 30px 0;
            padding: 20px 0;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
        }
        .social-links p {
            color: #666;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 500;
        }
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        .social-icons a {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: #4A7C59;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        .social-icons a:hover {
            background: #3d6549;
        }
        .cta-button {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button a {
            display: inline-block;
            background: #4A7C59;
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="logo">
            <h1 style="font-size: 48px; margin: 0;">🌱</h1>
        </div>

        <h1>Welcome to Senda!</h1>
        <p class="welcome-text">Hi {{user_name}},</p>

        <div class="content">
            <p>Thank you for joining our waitlist! We're thrilled to have you on board as we prepare to launch a better way to live.</p>

            <p>You're now part of an exclusive group who will be the first to experience Senda when we launch.</p>
        </div>

        <div class="benefits">
            <h3>What You'll Get as a Founding Member:</h3>
            <ul>
                <li>✓ <strong>Early Access</strong> - Be first to try the platform</li>
                <li>✓ <strong>Lifetime Discount</strong> - Exclusive founding member pricing</li>
                <li>✓ <strong>Direct Influence</strong> - Shape the product with your feedback</li>
                <li>✓ <strong>Exclusive Features</strong> - Access to premium features</li>
            </ul>
        </div>

        <div class="content">
            <p>We'll keep you updated on our progress and let you know as soon as we're ready to launch.</p>

            <p>In the meantime, follow us on social media to stay connected and get behind-the-scenes updates!</p>
        </div>

        <div class="social-links">
            <p>Follow us on:</p>
            <div class="social-icons">
                <a href="https://www.instagram.com/sendaproject?igsh=MTQ3N25icWplZTFhbw%3D%3D&utm_source=qr" target="_blank">
                    📸 Instagram
                </a>
                <a href="https://www.tiktok.com/@app_senda?_r=1&_t=ZM-91Z2qzQ3CGJ" target="_blank">
                    🎵 TikTok
                </a>
            </div>
        </div>

        <div class="footer">
            <p>See you soon on your path to a better life! 🌿</p>
            <p style="margin-top: 20px;">
                <strong>Team Senda</strong><br>
                <a href="mailto:start.senda@gmail.com" style="color: #4A7C59;">start.senda@gmail.com</a>
            </p>
        </div>
    </div>
</body>
</html>
```

## Current Implementation

The waitlist form now:
1. Validates name and email
2. Sends notification email to start.senda@gmail.com via EmailJS
3. Sends auto-reply welcome email to the user with social media links
4. Stores data in localStorage as backup
5. Shows success message
6. Increments waitlist counter

**Emails sent:**
- **Notification to team:** start.senda@gmail.com with user's name and email
- **Auto-reply to user:** Welcome email with founding member benefits and social media links (Instagram & TikTok)
