import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss'

export const MovieCard = ({movieData}) => {
    
    return (
        <Link className="link-text" to={`/movies/${encodeURIComponent(movieData._id)}`}>
            <Card className="card-container ">
                <Card.Img
                    alt={`Poster of ${movieData.Title}`}
                    src={movieData.ImagePath}
                    crossOrigin="cross-origin"
                    className="card-image"
                />
                <Card.Body>
                    <Card.Title> {movieData.Title} ({movieData.ReleaseYear}) </Card.Title>
                    <Card.Text> </Card.Text>
                    
                </Card.Body>

            </Card>
        </Link>
    )
}

