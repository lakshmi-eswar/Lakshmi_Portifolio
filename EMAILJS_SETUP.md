# EmailJS Setup Guide

Your portfolio is now set up to send emails via EmailJS. Follow these steps to activate it:

## Step 1: Create a Free EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email

## Step 2: Get Your Public Key
1. After login, go to **Account** (top right) → **Account Settings**
2. Find **Public Key** and copy it

## Step 3: Set Up Email Service
1. Go to **Email Services** in the left menu
2. Click **"Add Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
   - For **Gmail**: You'll need to create an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need it next)

## Step 4: Create Email Template
1. Go to **Email Templates** in the left menu
2. Click **"Create New Template"**
3. Use this template:
   - **Template Name**: `portfolio_contact`
   - **Service**: Select the service you created above
   - **Template ID**: `portfolio_contact` (you can name it anything, but remember the ID)

4. In the **Email Template Editor**, set the content like this:

**Subject:**
```
New Portfolio Message from {{from_name}}
```

**Email Content:**
```
New message from your portfolio contact form!

From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}
```

5. Click **"Save"**
6. **Copy your Template ID** from the URL or settings

## Step 5: Update Your Portfolio Code

Open [d:\portfolio_lakshmi\js\main.js](js/main.js) and find these lines (around line 154-156):

```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

Replace with your actual Public Key:
```javascript
emailjs.init('abc123def456...');  // Your Public Key
```

And update these lines:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',      // Replace with your Service ID
  'YOUR_TEMPLATE_ID_HERE',     // Replace with your Template ID
```

Example:
```javascript
await emailjs.send(
  'service_abc123def456',      // Your Service ID
  'portfolio_contact',         // Your Template ID
```

## Step 6: Test It!
1. Open your portfolio in a browser
2. Scroll to the "Contact" section
3. Fill out the form and submit
4. You should receive an email at your inbox! 📧

## Troubleshooting

**Form not sending?**
- Check browser console (F12) for error messages
- Make sure you replaced all three placeholders: Public Key, Service ID, and Template ID
- Verify your email service is connected in EmailJS dashboard

**Not receiving emails?**
- Check your spam folder
- Verify the email address in the contact form is correct
- Check EmailJS dashboard → **Activity** to see if the email was sent

**Connection failed error?**
- Make sure your Service ID and Template ID are correct
- Verify your Public Key is correct
- Your internet connection is working

---

**Questions?** EmailJS has excellent documentation at [emailjs.com/docs](https://www.emailjs.com/docs/)
