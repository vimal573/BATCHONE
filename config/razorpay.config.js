import Razorpay from 'razorpay';
import Config from './index';

const razorpay = new Razorpay({
  key_id: Config.RAZORPAY_KEY_ID,
  key_secret: Config.RAZORPAY_SECRET,
});
