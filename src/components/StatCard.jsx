import "../styles/StatCard.css";

function StatCard({ title, value, subtitle, icon, tone }) {
  return (
    <div className="stat-card card-box">
      <div className={`stat-icon tone-${tone}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        <p className="stat-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;