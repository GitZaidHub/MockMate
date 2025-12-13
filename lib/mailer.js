import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,

  },
})

export const sendOTPEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"MockMate Ai" <${process.env.EMAIL_USER}>`, // Better display
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #f4f4f5; border-radius: 12px; overflow: hidden; border: 1px solid #27272a;">
      <!-- Header -->
      <div style="background-color: #5b21b6; padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">MockMate AI</h1>
      </div>

      <!-- Body -->
      <div style="padding: 40px 24px;">
        <h2 style="margin-top: 0; color: #ffffff; font-size: 20px; font-weight: 600;">Verify Your Identity</h2>
        <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Use the One Time Password (OTP) below to complete your sign-up or login process. This code is valid for 5 minutes.
        </p>

        <!-- OTP Box -->
        <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 16px; text-align: center; margin: 32px 0;">
          <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; color: #a78bfa; letter-spacing: 4px;">
            ${otp}
          </span>
        </div>

        <p style="color: #71717a; font-size: 14px; margin-top: 32px; text-align: center;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #18181b; padding: 20px; text-align: center; border-top: 1px solid #27272a;">
        <p style="margin: 0; color: #52525b; font-size: 12px;">
          &copy; ${new Date().getFullYear()} MockMate AI. All rights reserved.
        </p>
      </div>
    </div>
      `,
    });
    return info;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};
