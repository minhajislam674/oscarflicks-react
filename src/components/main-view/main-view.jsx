import React from "react";
import { useState, useEffect  } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row, Container } from "react-bootstrap";

import './main-view.scss'

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);


    useEffect(() => {
        if(!token) {
            return;
        }

        fetch("https://myflix-movies.onrender.com/movies", {
            headers: {Authorization: `Bearer ${token}`}
        })
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
      }, [token]);


    if (!user) {
        return (
            <>
                <Row className="justify-content-md-center mb-5">
                <Col className="center" md={5}> 
                    <LoginView
                        onLoggedIn = {(user, token) => {
                            setUser(user);
                            setToken(token);
                    }}/>
                    <SignupView />
                </Col>
                </Row>
            </>
        );
    }   

    
    if (selectedMovie) {
        return (
            <>
                <MovieView
                    movieData={selectedMovie}
                    onBackClick = {()=> {
                        setSelectedMovie(null)
                    }}
                />
                <hr/>
                <h2> Similar movies</h2>
            </>

        )
    }

    if (movies.length ===0) {
        return <div>Loading movies...</div>
    }

    return (
        <>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</button>
            <Container>
                <Row className="justify-content-md-center" mb={10}>
                    {movies.map((movie)=> (
                        <Col className="mb-5" key={movie.id} sm={12} md={6} lg={4}>
                            <MovieCard
                                movieData={movie}
                                onMovieClick = {(newSelectedMovie)=>{
                                    setSelectedMovie(newSelectedMovie)
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
  };

