import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./FeatureCard.css";

const FeatureCard = ({ icon, title, description, buttonText, link }) => (
  <div className="feature-card">
    <img src={icon} alt={title} className="feature-icon" />
    <div className="feature-content">
      <h3>{title}</h3>
      <div className="feature-line"></div>
      <p>{description}</p>
      <Link to={link} className="feature-button">
        {buttonText} →
      </Link>
    </div>
  </div>
);

export default FeatureCard;
