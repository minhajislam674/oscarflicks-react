import React from "react";

import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavBar } from "../navigation-bar/navigation-bar";
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SpinnerComponent from "../spinner/spinner-component";

import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-movies.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      });
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} />

        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
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

          <Route path="/register" element={<>{<SignupView />}</>} />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? <Navigate to="/" /> : <MovieView movieData={movies} />}
              </>
            }
          />

          <Route
            path="/directors/:directorName"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : movies.length === 0 ? (
                  <SpinnerComponent />
                ) : (
                  <DirectorView movieData={movies} />
                )}
              </>
            }
          />

          <Route
            path="/genre/:genreName"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : movies.length === 0 ? (
                  <SpinnerComponent />
                ) : (
                  <GenreView movieData={movies} />
                )}
              </>
            }
          />

          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : (
                  <ProfileView movieData={movies} />
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <SpinnerComponent />
                ) : (
                  <Container className="home-container">
                    <div>
                      <input
                        className="search-bar"
                        type="search"
                        value={searchQuery}
                        placeholder="Search movies..."
                        onChange={(e) => {
                          const filteredArray = movies.filter((movie) => {
                            return movie.Title.toLowerCase().includes(
                              e.target.value.toLowerCase()
                            );
                          });
                          setFilteredMovies(filteredArray);
                          setSearchQuery(e.target.value);
                          console.log(filteredArray);
                        }}
                      ></input>
                    </div>
                    <Row className="justify-content-md-left" mb={10}>
                      {filteredMovies.map((movie) => (
                        <Col
                          className="mb-3 mt-3"
                          key={movie._id}
                          sm={12}
                          md={6}
                          lg={3}
                        >
                          <MovieCard movieData={movie} />
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
