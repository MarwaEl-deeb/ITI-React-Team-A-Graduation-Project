import { useContext } from "react";
import { MainContext } from "../useContex";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Movies(){
const {movies}=useContext(MainContext)
const moviejsx =movies.map((m)=>{
const {adult ,id, original_language,original_title, overview,poster_path,release_date}=m;
const date=new Date(release_date).toLocaleDateString("en-US",
  {month:"short",
  day:"2-digit",
  year:"numeric"
  }
)
return(
 <Card key={id} className="m-4 border-0" style={{ width: '14rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      <Card.Body>
        <Card.Title>{original_title}</Card.Title>
       
        <Card.Text style={{color:'#aaaa'}}>
          {date}
        </Card.Text>
        <Button variant="primary">{id}</Button>
      </Card.Body>
    </Card>
)})

console.log(movies)
return(<div className="movies">
   {moviejsx}
  
</div>)
}
export default Movies;



