module.exports = (req, res) => {
    res.status(200).json({
      EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
      EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID
    });
  };