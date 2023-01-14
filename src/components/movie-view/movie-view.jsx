import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, CardImg, Row, Col, Container } from "react-bootstrap";
import './movie-view.scss'

export const MovieView = ({movieData}) => {
    const {movieId} = useParams();
    const movie = movieData.find((m) => m.id === movieId);

    if (!movie) {
        return <div>Movie not found</div>
    }
    return (
            <Container>
                    <Card className="card-container--mainview">
                    <Row>
                        <Col xs={12} lg={6} md={9}>
                            <CardImg className="card-image-movie-view" src={movie.image} alt="movie-poster"/>
                        </Col>
                        <Col > 
                            <Card.Body className="card-body">
                                <Card.Title className="card-title-movie-view">{movie.title} ({movie.releaseYear})</Card.Title>
                                <br></br>
                                <Card.Text><span>Genre: </span> {movie.genre} </Card.Text>
                                <Card.Text><span>Director: </span> {movie.director} </Card.Text>
                                <Card.Text><span>Summary: </span>{movie.description} </Card.Text>
                                <Link to={`/`}>
                                    <Button variant="primary">Back </Button>
                                </Link>
                            </Card.Body>
                        </Col>
                        </Row>
                    </Card>

            </Container>
    )
}

