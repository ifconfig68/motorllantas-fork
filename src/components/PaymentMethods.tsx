
import './PaymentMethods.css';
import pagosm from '../assets/img/pagosm.png';
import servicios from '../assets/img/servicios.jpg';

function PaymentMethods() {
  return (
    <div className="payment-methods-wrapper">
      <div className="payment-methods-container">
        <img src={pagosm} alt="Payment Methods" />
        <img src={servicios} alt="Nuestros servicios" className="services-image" />
      </div>
    </div>
  );
}

export default PaymentMethods;
