import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
        
    },
})

export const sendOTPEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"YourApp Name" <${process.env.EMAIL_USER}>`, // Better display
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`, // Optional HTML
    });
    return info;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};
