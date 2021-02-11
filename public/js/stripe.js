/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51IJNI1DvhGAdq48wWuCasMNqOrP8WzPjLkYAA2Bk9NNRAJwRzoTofoYKBQaZoIWtvWqXCz2iOq0S4sf8zqfuufxZ00r88ICEkI'
    );
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
