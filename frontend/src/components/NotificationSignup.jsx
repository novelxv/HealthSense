import "./NotificationSignup.css"
import { useNavigate } from 'react-router-dom';

export default function NotificationSignup() {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/#newsletter");
      setTimeout(() => {
        const section = document.getElementById("newsletter");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    };

  return (
    <div className="notification-signup">
      <h2 className="signup-title">Jangan Tertinggal Informasi!</h2>
      <p className="signup-description">
        Langganan notifikasi untuk mendapatkan informasi terbaru.
        <br />
        Gratis tanpa dipungut biaya!
      </p>
      <button className="hero-cta button-subscribe" onClick={handleClick}>
          Langganan sekarang!
      </button>
    </div>
  )
}