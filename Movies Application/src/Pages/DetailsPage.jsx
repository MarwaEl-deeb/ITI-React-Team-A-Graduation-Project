import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";
import Recommendation from "../Components/Recommendation";

function DetailsPage() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <CardDetails id={id} />
      <hr style={{ width: "90%", margin: "2rem auto" }} />
      <Recommendation id={id} />
    </>
  );
}

export default DetailsPage;
