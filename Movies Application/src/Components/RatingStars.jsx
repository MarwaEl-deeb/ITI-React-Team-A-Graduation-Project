import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function RatingStars({ rating, votes }) {
  const stars = [];
  const value = rating / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {stars}
      <span style={{ marginLeft: "8px" }}>
        ({votes.toLocaleString()} votes)
      </span>
    </div>
  );
}
