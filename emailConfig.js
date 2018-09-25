module.exports = () => {
  const emailConfig = {
    apiKey: process.env.MAIL_APIKEY,
    domain: process.env.MAIL_DOMAIN,
  };
  return emailConfig;
};
