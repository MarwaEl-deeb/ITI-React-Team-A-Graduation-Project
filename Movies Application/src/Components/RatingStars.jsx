import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function RatingStars({ rating, votes }) {
  const stars = [];
  const value = (rating ?? 0) / 2; // fallback 0
  const { t } = useTranslation();

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }

  const votesDisplay = votes != null ? votes.toLocaleString() : "0"; // fallback

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
      {stars}
      <span className="voteText" style={{ marginLeft: "8px", width: "60%", fontSize: "13px" }}>({votesDisplay} {t("votes")})</span>
    </div>
  );
}
