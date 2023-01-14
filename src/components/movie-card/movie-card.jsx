import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import './movie-card.scss'
export const MovieCard = ({movieData, onMovieClick}) => {
    
    return (
        <Card className="card-container " onClick={()=> {onMovieClick(movieData)}}>
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
    )
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}