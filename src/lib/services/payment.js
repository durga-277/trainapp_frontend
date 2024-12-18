import { loadStripe } from '@stripe/stripe-js';
import { config } from '../config';

export const stripePromise = loadStripe(config.stripe.publicKey);

export async function createPaymentIntent(amount) {
  // In a real application, this would call your backend
  // For demo purposes, we'll simulate a successful response
  return {
    clientSecret: 'demo_client_secret',
    amount: amount * 100, // Convert to cents
  };
}