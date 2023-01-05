export const MovieCard = ({movieData, onMovieClick}) => {
    return (
        <div onClick={()=> {
            onMovieClick(movieData)
        }}>
            {movieData.title}
        </div>
    )
}