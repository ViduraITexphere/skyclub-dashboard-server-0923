const nodemailer = require('nodemailer');

// Function to send quotation email to the user
exports.sendQuotationEmail = async (req, res) => {
  const { email, subject, message, itinerary } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email not found' });
  }

  try {
    // Configure nodemailer transport using cPanel SMTP details
    let transporter = nodemailer.createTransport({
      host: 'mail.skytravelclub.com', // e.g., 'mail.yourdomain.com'
      port: 465, // Use port 465 for SSL or 587 for TLS
      secure: true, // True for 465, false for 587
      auth: {
        user: 'temp@skytravelclub.com', // Your cPanel email (e.g., 'info@yourdomain.com')
        pass: 'L5QPOGssQqCI', // Password for the email account
      },
    });

    // Define email content
    const mailOptions = {
      from: `"Sky travel Club" <${'temp@skytravelclub.com'}>`, // Sender email
      to: email, // Recipient email
      subject: subject, // Subject line
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client after successfully sending the email
    return res.status(200).json({ message: 'Quotation email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error });
  }
};
