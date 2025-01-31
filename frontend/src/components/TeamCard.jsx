import "./TeamCard.css"

const TeamCard = ({ name, role, photoPath, github, email, instagram }) => {
  return (
    <div className="team-member-card">
      <div className="photo-container">
        <img src={photoPath || "/placeholder.svg"} alt={`${name}'s photo`} className="member-photo" />
      </div>

      <div className="member-info">
        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>
      </div>

      <div className="social-links">
        <a href={github} target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="../../aboutus/GithubIcon.png" alt="GitHub" />
        </a>
        <a href={`mailto:${email}`} className="social-link">
          <img src="../../aboutus/MailIcon.png" alt="Email" />
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-link">
          <img src="../../aboutus/IgIcon.png" alt="Instagram" />
        </a>
      </div>
    </div>
  )
}

export default TeamCard

