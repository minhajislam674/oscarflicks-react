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
                <span>Author: </span>
                <span>{movieData.author}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}