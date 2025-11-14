
import './SecureSection.css';
import seguro from '../assets/img/seguro.jpg';

function SecureSection() {
  return (
    <div className="secure-section-wrapper">
        <div className="secure-section">
            <img src={seguro} alt="Secure payment" />
        </div>
    </div>
  );
}

export default SecureSection;
