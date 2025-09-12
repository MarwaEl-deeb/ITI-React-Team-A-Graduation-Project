import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";

function DetailsPage() {
  const { id } = useParams();
  return (
    <>
      <NavBar />
      <h2>Movie ID: {id}</h2>
    </>
  );
}
export default DetailsPage;
