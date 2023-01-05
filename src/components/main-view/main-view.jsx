import React from "react";
import { useState, useEffect  } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://myflix-movies.onrender.com/movies")
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.map((doc) => {
              return {
                id: doc._id,
                title: doc.Title,
                image: doc.ImagePath,
                director: doc.Director.Name,
                description: doc.Description,
                releaseYear: doc.ReleaseYear
              };
            });
    
            setMovies(moviesFromApi);
          });
      }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView
                    movieData={selectedMovie}
                    onBackClick = {()=> {
                        setSelectedMovie(null)
                    }}
                />
    }


    if (movies.length ===0) {
        return <div> The list is empty!</div>
    }

    return (
        <div>
            {movies.map((movie)=> {
                return <MovieCard
                            key={movie.id}
                            movieData={movie}
                            onMovieClick = {(newSelectedMovie)=>{
                                setSelectedMovie(newSelectedMovie)
                            }}
                        />
            })}
        </div>
    );
  };