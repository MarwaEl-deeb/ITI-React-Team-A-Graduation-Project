import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CardDetails from "../Components/CardDetails";

function DetailsPage() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <CardDetails id={id} />
      <h2>Movie ID: {id}</h2>
    </>
  );
}
export default DetailsPage;
