import { useNavigate, useParams } from "react-router";
import { Container, Card, Row, Col, Button} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import './director-view.scss'

export const DirectorView = ({ movieData }) => {
    const {directorName} = useParams();
    const director = movieData.find((d) => d.Director.Name === directorName).Director;
    const filteredMovies = movieData.filter((m) => m.Director.Name === directorName);
    const navigate = useNavigate();


    return (
        <Container>
            <Card className="card-container--mainview">
                <Card.Body className="card-body">
                    <Card.Title className="card-title-movie-view"> {director.Name} </Card.Title>
                    <Card.Text> Bio: {director.Bio} </Card.Text>
                    <hr></hr>
                    <Card.Text>  <span className="label">Other movies by {director.Name}</span></Card.Text>
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