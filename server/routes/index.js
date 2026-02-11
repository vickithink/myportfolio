var express = require('express');
var router = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');

require('dotenv').config();

// Setup email transporter for Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email service (Hostinger) is ready');
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST contact form - NEW DETAILED FORM */
router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, phone, serviceType, budget, timeline, projectDetails } = req.body;

    // Validate mandatory fields
    if (!fullName || !email || !serviceType || !projectDetails) {
      return res.status(400).json({ error: 'Please fill all mandatory fields (*)' });
    }

    // Send to Telegram
    const telegramMessage = `
📧 <b>NEW PROJECT INQUIRY!</b>

👤 <b>Full Name:</b> ${fullName}
📨 <b>Email:</b> ${email}
📱 <b>Phone/WhatsApp:</b> ${phone || '—'}

🛠 <b>Service Type:</b> ${serviceType}
💰 <b>Budget:</b> ${budget || '—'}
⏳ <b>Timeline:</b> ${timeline || '—'}

📝 <b>Project Details:</b>
${projectDetails}
`;

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await axios.post(telegramUrl, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    if (!telegramResponse.data.ok) {
      throw new Error(`Telegram API Error: ${telegramResponse.data.description}`);
    }

    // Send email to ADMIN (professional template)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Project Inquiry — ${fullName}`,
      html: `
      <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background:#f5f7fb; padding:24px;">
        <div style="max-width:700px; margin:0 auto; background:#ffffff; padding:24px; border-radius:10px; box-shadow:0 6px 18px rgba(16,24,40,0.06);">
          <table width="100%" style="border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;">
                <h1 style="margin:0; color:#0f172a; font-size:20px;">New Project Inquiry</h1>
                <p style="margin:6px 0 0; color:#475569; font-size:13px;">Received on ${new Date().toLocaleString()}</p>
              </td>
              <td style="text-align:right; vertical-align:middle;">
                <a href="${process.env.SITE_URL || '#'}" style="text-decoration:none; color:#475569; font-size:13px;">View site</a>
              </td>
            </tr>
          </table>

          <hr style="border:none; border-top:1px solid #eef2ff; margin:18px 0 20px;" />

          <h3 style="margin:0 0 8px; color:#0f172a; font-size:15px;">Client</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a;">
            <tr>
              <td style="padding:8px; width:28%; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Name</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Email</td>
              <td style="padding:8px; border:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Phone</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${phone || '—'}</td>
            </tr>
          </table>

          <h3 style="margin:18px 0 8px; color:#0f172a; font-size:15px;">Project</h3>
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a;">
            <tr>
              <td style="padding:8px; width:28%; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Service</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${serviceType}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Budget</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${budget || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Timeline</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${timeline || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top:14px; padding:12px; background:#f8fafc; border-left:4px solid #6366f1; border-radius:6px;">
            <strong style="display:block; color:#0f172a; margin-bottom:6px;">Project Description</strong>
            <p style="margin:0; color:#334155; font-size:14px; white-space:pre-wrap;">${projectDetails.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top:18px; display:flex; gap:12px; align-items:center;">
            <a href="mailto:${email}" style="display:inline-block; padding:10px 14px; background:#6366f1; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">Reply to client</a>
            <span style="color:#64748b; font-size:13px;">Please follow up within 24 hours.</span>
          </div>

          <footer style="margin-top:22px; font-size:12px; color:#94a3b8;">
            Sent from ${process.env.SITE_NAME || 'Your Portfolio'} — ${process.env.SITE_URL || ''}
          </footer>
        </div>
      </div>
      `
    };

    // Send email to USER (professional confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks ${fullName} — I received your inquiry`,
      html: `
      <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background:#f7f9fc; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; padding:22px; border-radius:10px; box-shadow:0 6px 16px rgba(15,23,42,0.06);">
          <h2 style="margin:0 0 8px; color:#0b1220; font-size:18px;">Hi ${fullName},</h2>
          <p style="margin:0 0 12px; color:#475569; font-size:14px;">Thanks for sharing your project details. I’ve received your inquiry and will review it shortly.</p>

          <div style="padding:12px; background:#f8fafc; border-left:4px solid #4f46e5; border-radius:6px; margin-bottom:14px;">
            <strong style="display:block; margin-bottom:6px; color:#0b1220;">Project Summary</strong>
            <table style="width:100%; font-size:14px; color:#0b1220;">
              <tr>
                <td style="padding:6px 0; width:36%; font-weight:600;">Service</td>
                <td style="padding:6px 0;">${serviceType}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; font-weight:600;">Budget</td>
                <td style="padding:6px 0;">${budget || 'To be discussed'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; font-weight:600;">Timeline</td>
                <td style="padding:6px 0;">${timeline || 'Flexible'}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom:14px; color:#334155; font-size:14px; white-space:pre-wrap;">${projectDetails.replace(/\n/g, '<br>')}</div>

          <a href="mailto:${process.env.EMAIL_USER}?subject=Re:%20${encodeURIComponent('Project Inquiry — ' + fullName)}" style="display:inline-block; padding:10px 14px; background:#4f46e5; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">Contact me directly</a>

          <div style="margin-top:18px; font-size:13px; color:#64748b;">I aim to reply within <strong>24 hours</strong>. For urgent matters, message on WhatsApp: <strong>+91 9572949137</strong></div>

          <hr style="margin:18px 0; border:none; border-top:1px solid #eef2ff;" />

          <footer style="font-size:13px; color:#94a3b8;">Regards,<br><strong>Vicki</strong><br>Full Stack Web Developer — <a href="${process.env.SITE_URL || '#'}" style="color:#475569; text-decoration:none;">${process.env.SITE_NAME || 'iamvicki.in'}</a><br><a href="mailto:hello@iamvicki.in" style="color:#475569; text-decoration:none;">hello@iamvicki.in</a></footer>
        </div>
      </div>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`✅ Project Inquiry - Telegram: ✓ | Admin Email: ✓ | User Email: ✓ | From: ${fullName} (${email})`);
    res.status(200).json({ success: true, message: 'Your inquiry has been received! We will contact you soon.' });
  } catch (error) {
    console.error('❌ Error sending message:', error.message || error);
    const errorMsg = error.response?.data?.description || error.message || 'Unknown error';
    res.status(500).json({ error: `Failed to send message: ${errorMsg}` });
  }
});

module.exports = router;


/* POST contact form */
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send to Telegram
    const telegramMessage = `
📧 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${name}
📨 <b>Email:</b> ${email}
💬 <b>Message:</b>
${message}
`;

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await axios.post(telegramUrl, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    if (!telegramResponse.data.ok) {
      throw new Error(`Telegram API Error: ${telegramResponse.data.description}`);
    }

    // Send email to ADMIN (professional contact template)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form — ${name}`,
      html: `
      <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background:#f5f7fb; padding:20px;">
        <div style="max-width:700px; margin:0 auto; background:#fff; padding:18px; border-radius:10px; box-shadow:0 6px 18px rgba(16,24,40,0.06);">
          <h2 style="margin:0 0 8px; color:#0f172a; font-size:18px;">New Contact Form Submission</h2>
          <p style="margin:0 0 12px; color:#64748b; font-size:13px;">Received on ${new Date().toLocaleString()}</p>

          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a; margin-top:12px;">
            <tr>
              <td style="padding:8px; width:28%; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Name</td>
              <td style="padding:8px; border:1px solid #f1f5f9;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:600; background:#fbfdff; border:1px solid #f1f5f9;">Email</td>
              <td style="padding:8px; border:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
            </tr>
          </table>

          <div style="margin-top:14px; padding:12px; background:#f8fafc; border-left:4px solid #6366f1; border-radius:6px;">
            <strong style="display:block; color:#0f172a; margin-bottom:6px;">Message</strong>
            <p style="margin:0; color:#334155; font-size:14px; white-space:pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <footer style="margin-top:16px; font-size:12px; color:#94a3b8;">Sent from ${process.env.SITE_NAME || 'Your Portfolio'}</footer>
        </div>
      </div>
      `
    };

    // Send email to USER (professional confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks ${name} — I received your message`,
      html: `
      <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background:#f7f9fc; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; padding:22px; border-radius:10px; box-shadow:0 6px 16px rgba(15,23,42,0.06);">
          <h2 style="margin:0 0 8px; color:#0b1220; font-size:18px;">Hi ${name},</h2>
          <p style="margin:0 0 12px; color:#475569; font-size:14px;">Thanks for getting in touch — I’ve received your message and will reply within 24 hours.</p>

          <div style="margin-top:12px; padding:12px; background:#f8fafc; border-left:4px solid #4f46e5; border-radius:6px;">
            <strong style="display:block; margin-bottom:6px; color:#0b1220;">Your Message</strong>
            <p style="margin:0; color:#334155; font-size:14px; white-space:pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="margin-top:14px;">
            <a href="mailto:${process.env.EMAIL_USER}?subject=Re:%20${encodeURIComponent('Contact — ' + name)}" style="display:inline-block; padding:10px 14px; background:#4f46e5; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">Reply via Email</a>
          </div>

          <div style="margin-top:14px; font-size:13px; color:#64748b;">For urgent matters, reach out on WhatsApp: <strong>+91 9572949137</strong></div>

          <hr style="margin:18px 0; border:none; border-top:1px solid #eef2ff;" />

          <footer style="font-size:13px; color:#94a3b8;">Regards,<br><strong>Vicki</strong><br>Full Stack Web Developer — <a href="${process.env.SITE_URL || '#'}" style="color:#475569; text-decoration:none;">${process.env.SITE_NAME || 'iamvicki.in'}</a></footer>
        </div>
      </div>
      `
    };


    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`✅ Message sent - Telegram: ✓ | Admin Email: ✓ | User Email: ✓ | From: ${name} (${email})`);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending message:', error.message || error);
    const errorMsg = error.response?.data?.description || error.message || 'Unknown error';
    res.status(500).json({ error: `Failed to send message: ${errorMsg}` });
  }
});

module.exports = router;

