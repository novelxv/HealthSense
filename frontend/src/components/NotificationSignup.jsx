import "./NotificationSignup.css"

export default function NotificationSignup() {
  return (
    <div className="notification-signup">
      <h2 className="signup-title">Jangan Tertinggal Informasi!</h2>
      <p className="signup-description">
        Langganan notifikasi untuk mendapatkan informasi terbaru.
        <br />
        Gratis tanpa dipungut biaya!
      </p>
      <button className="signup-button">Langganan sekarang</button>
    </div>
  )
}