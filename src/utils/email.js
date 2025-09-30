import nodemailer from 'nodemailer'
export const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async (toEmail, otp) => {
  const transporter = createTransporter();
  const mailOptions = {
  from: `Recipe App <${process.env.EMAIL_USER}>`, // ✅ sender
to: toEmail,
subject: "🔑 Your Recipe App OTP Code",
text: `Your login OTP is ${otp}. It expires in 10 minutes.`,
html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">Recipe App Login</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">
        You requested to log in to your <b>Recipe App</b> account. 
        Please use the OTP below to complete your login.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; background: #f3f4f6; color: #111827; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 15px; color: #555;">
        ⚠️ This code will expire in <b>10 minutes</b>. 
        If you did not request this, you can ignore this email.
      </p>

      <p style="font-size: 14px; color: #999; margin-top: 30px; text-align: center;">
        &copy; ${new Date().getFullYear()} Recipe App. All rights reserved.
      </p>
    </div>
  </div>
`

  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ OTP email sent:", info);
  return info;
};
