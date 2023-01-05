import React from "react";
import { useState, useEffect  } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=star+wars")
          .then((response) => response.json())
          .then((data) => {
            const booksFromApi = data.docs.map((doc) => {
              return {
                id: doc.key,
                title: doc.title,
                image:
    `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                author: doc.author_name?.[0]
              };
            });
    
            setMovies(booksFromApi);
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