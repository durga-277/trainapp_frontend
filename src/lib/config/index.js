export const config = {
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY || 'pk_test_your_stripe_key',
  },
  emailjs: {
    userId: process.env.EMAILJS_USER_ID || 'your_emailjs_user_id',
    serviceId: process.env.EMAILJS_SERVICE_ID || 'your_emailjs_service_id',
    templateId: process.env.EMAILJS_TEMPLATE_ID || 'your_emailjs_template_id',
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
};