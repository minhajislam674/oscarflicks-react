import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardImg, Row, Col, Container } from "react-bootstrap";
import SpinnerComponent from "../spinner/spinner-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/favorite-icon.png";
import "../../assets/favorite-icon-clicked.png";
import "./movie-view.scss";

export const MovieView = ({ movieData }) => {
  const { movieId } = useParams();
  const movie = movieData.find((m) => m._id === movieId);
  const favorited = require("../../assets/favorite-icon-clicked.png");
  const notFavorited = require("../../assets/favorite-icon.png");
  const [favorite, setFavorite] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const addToFavoriteSuccess = () =>
    toast.info("Added to favorites!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });

  const removeFromFavoriteSuccess = () =>
    toast.info("Removed from favorites!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });

  const handleFavorite = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      "https://myflix-movies.onrender.com/users/" + user.Username,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const favoriteMovies = data.FavoriteMovies;
    console.log(favoriteMovies);
    if (!favoriteMovies.includes(movie._id)) {
      setFavorite(true);
      await fetch(
        "https://myflix-movies.onrender.com/users/" +
          user.Username +
          "/movies/" +
          movie._id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          addToFavoriteSuccess();
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });
    } else {
      setFavorite(false);
      await fetch(
        "https://myflix-movies.onrender.com/users/" +
          user.Username +
          "/movies/" +
          movie._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          removeFromFavoriteSuccess();
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });
    }
  };

  if (!movie) {
    return <SpinnerComponent />;
  }
  return (
    <Container>
      <Card className="card-container--mainview">
        <Row>
          <Col xs={12} lg={6} md={9}>
            <CardImg
              className="card-image-movie-view"
              src={movie.ImagePath}
              alt="movie-poster"
            />
          </Col>
          <Col xs={12} lg={6} md={9}>
            <Card.Body className="card-body">
              <Card.Title className="card-title-movie-view">
                {movie.Title} ({movie.ReleaseYear})
                <img
                  src={favorite ? favorited : notFavorited}
                  alt="favorite-icon"
                  className="icon-favorite"
                  title="Add to favorite"
                  onClick={handleFavorite}
                />
              </Card.Title>

              <br></br>
              <Card.Text>
                <span>Genre: </span>
                <Link
                  className="link-text"
                  to={`/genre/${encodeURIComponent(movie.Genre.Name)}`}
                >
                  {movie.Genre.Name}
                </Link>
              </Card.Text>
              <Card.Text>
                <span>Director: </span>
                <Link
                  className="link-text"
                  to={`/directors/${encodeURIComponent(movie.Director.Name)}`}
                >
                  {movie.Director.Name}
                </Link>
              </Card.Text>
              <Card.Text>
                <span>Summary: </span>
                {movie.Description}{" "}
              </Card.Text>
              <Button
                variant="outline-dark"
                className="back-btn mt-2"
                onClick={() => navigate("/")}
              >
                Back
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.array.isRequired,
};
