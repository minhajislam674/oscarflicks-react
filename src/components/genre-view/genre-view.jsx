import { useNavigate, useParams } from "react-router";
import { Container, Card, Row, Col, Button} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import './genre-view.scss'

export const GenreView = ({ movieData }) => {
    const {genreName} = useParams();
    const genre = movieData.find((d) => d.Genre.Name === genreName).Genre;
    const filteredMovies = movieData.filter((m) => m.Genre.Name === genreName);
    const navigate = useNavigate();


    return (
        <Container>
            <Card className="card-container--mainview">
                <Card.Body className="card-body">
                    <Card.Title className="card-title-movie-view"> {genre.Name} </Card.Title>
                    <br></br>
                    <Card.Text> <span>Description: </span> {genre.Description} </Card.Text>
                    <br></br>
                    <hr></hr>
                    <Card.Text>  <span className="label">Other {genre.Name} movies</span></Card.Text>
                    <Row className="justify-content-md-left" mb={10}>
                        {filteredMovies.map((m) => (

                        <Col className="mb-5" sm={6} md={4} lg={3} key={m._id}>
                            <MovieCard movieData={m} />
                        </Col>

                        ))}
                    </Row>
                    <Button className="back-btn mt-2" variant='outline-dark' onClick={() => navigate(-1)}>Back</Button>
                </Card.Body>
            </Card>
        </Container>
    )

}