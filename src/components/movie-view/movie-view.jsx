import PropTypes from "prop-types";
import { Button, Card, CardImg, Row, Col, Container } from "react-bootstrap";
import './movie-view.scss'

export const MovieView = ({movieData, onBackClick}) => {
    return (
            <Container>
                    <Card className="card-container--mainview">
                    <Row>
                        <Col>
                            <CardImg src={movieData.image} alt="movie-poster"/>
                        </Col>
                        <Col> 
                            <Card.Body>
                                <Card.Title>{movieData.title}</Card.Title>
                                <Card.Text>Director: {movieData.director} </Card.Text>
                                <Button variant="primary" onClick={onBackClick}>Back </Button>
                            </Card.Body>
                        </Col>
                        </Row>
                    </Card>

            </Container>
    )
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        director: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}