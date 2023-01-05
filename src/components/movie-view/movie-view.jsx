import PropTypes from "prop-types";

export const MovieView = ({movieData, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movieData.image} alt="movie-poster"/>
            </div>
            <div>
                <span>Title: </span>
                <span>{movieData.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movieData.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        director: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}