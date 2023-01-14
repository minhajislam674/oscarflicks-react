import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss'

export const MovieCard = ({movieData}) => {
    
    return (
        <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
            <Card className="card-container ">
                <Card.Img
                    alt={`Poster of ${movieData.title}`}
                    src={movieData.image}
                    crossOrigin="cross-origin"
                    className="card-image"
                />
                <Card.Body>
                    <Card.Title> {movieData.title} ({movieData.releaseYear}) </Card.Title>
                    <Card.Text> </Card.Text>
                    
                </Card.Body>

            </Card>
        </Link>
    )
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}