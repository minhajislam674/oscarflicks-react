import React from "react";
import { useState, useEffect  } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { useParams } from "react-router-dom";
import { NavBar } from "../navigation-bar/navigation-bar";
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

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
                releaseYear: doc.ReleaseYear,
                genre: doc.Genre.Name,
              };
            });
    
            setMovies(moviesFromApi);
          });
      }, [token]);



    return (
        <>

    <BrowserRouter>
    <NavBar/>
    <Routes>
        <Route
            path="/login"
            element = {
                <>
                    { user ? (
                        <Navigate to="/" />
                    ) : (
                        <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    )}
                </>
            } 
        />

        <Route
            path="/register"
            element = {
                <>
                    {
                        <SignupView/>
                    }
                </>
            }
        />

        <Route
            path="/movies/:movieId"
            element = {
                <>
                    { !user ? (
                        <Navigate to="/" />
                    ) : (
                        <MovieView
                            movieData={movies}

                    />
                    )}
                </>
            } 
        />


        <Route
            path="/"
            element = {
                <>
                    { !user ? ( 
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                        <div>Loading movies...</div>
                    ) : (
                        
                        <Container>
                            <Row className="justify-content-md-center" mb={10}>
                            {movies.map((movie) => (
                                <Col
                                    className="mb-3 mt-3"
                                    key={movie.id}
                                    sm={12}
                                    md={6}
                                    lg={3}
                                >
                                    <MovieCard
                                        movieData={movie}
                                        onMovieClick={(newSelectedMovie) => {
                                            setSelectedMovie(newSelectedMovie);
                                        }}
                                    />
                                </Col>
                        ))}
                            </Row>
                        </Container>
                    )}
                </>
            }
        />

    </Routes>
    </BrowserRouter>
        
        </>
    
);
};

