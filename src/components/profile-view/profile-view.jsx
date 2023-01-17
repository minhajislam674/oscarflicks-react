import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profile-view.scss";
export const ProfileView = ({movieData}) => {


    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [currentUser, setCurrentUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const removeFromFavoriteSuccess = () => toast.info("Removed from favorites!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });

    const userUpdateSuccess = () => toast.success("Profile has been updaed! Please log in with new credentials!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });

    const userUpdateError = () => toast.error("Update failed! Please try again!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light"
    });

    //Validate user inputs
    const validate =()=> {
    //Declaring the variable isReq and setting it to true.
    //If the conditions are met, set the value in the state to the required string and the variable isReq to false. 
    let isReq = true;

    setUsernameErr(false);
    setPasswordErr(false);
    setEmailErr(false);

    if (!username) {
        setUsernameErr("Username required!");
        isReq = false;
    } else if (username.length < 2) {
        setUsernameErr("Username must be at least 2 characters long!");
        isReq = false;
    }
    if (!password) {
        setPasswordErr("Password required!");
        isReq = false;
    } else if (password.length < 5) {
        setPasswordErr("Your password must be least 6 characters long");
        isReq = false;
    }
    if (!email) {
        setEmailErr("Email required!");
        isReq = false;
    } else if (email.indexOf('@') === -1) {
        setEmailErr("Enter a valid email address");
        isReq = false;
    } 
    return isReq;
  }


    const getUserData = () => {
      axios.get(`https://myflix-movies.onrender.com/users/${currentUser.Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    getUserData();

  });

    //UPDATE USER INFO
    const handleUpdate = (e) => {
        // preventing the default behavior of submitting a form
        e.preventDefault(); 
        const isReq = validate();

        if (isReq) {
            // If succesfully validated, send a request to the server to update information using put request
            axios.put(`https://myflix-movies.onrender.com/users/${currentUser.Username}`, {
                Username: username,
                Password: password,
                Email: email
            }, { headers: { Authorization: `Bearer ${token}` } })
            // then call props.onLoggedIn(username)
            .then(response => { 
                const data = response.data;
                console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open('/login', '_self');
                userUpdateSuccess();
            })
            .catch(e => {
                userUpdateError();
            });
        }
    };

        //DELETE USER 
        const handleDelete = async () => {
            if (currentUser && token) {
                let confirmDelete = window.confirm('Are you sure you want to permanently delete your account?');
                if (!confirmDelete) return;
    
                try {
                    await axios.delete(`https://myflix-movies.onrender.com/users/${currentUser.Username}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    alert('Your account has been permanently deleted.');
                    localStorage.clear();
                    window.open('/', '_self');
                } catch (error) {
                    console.log(error);
                }
            }
        }

    const usersFavMovies = movieData && movieData.filter((m) =>
        favoriteMovies.includes(m._id)
        );

    const handleRemoveFavorite = async (movieId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        await fetch("https://myflix-movies.onrender.com/users/"+user.Username+"/movies/"+movieId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            }).then((response) => {
            removeFromFavoriteSuccess();
            return response.json();
            }).then(data => console.log(data))
            .catch(err => {
                alert("Something went wrong");
                console.log(err);
            });
    }

    return(

        <Container>
            <Row className="card-container--profile">
                <Col>
                    <Card className="card-profile">
                        <Card.Body>
                            <Card.Title> Your Profile </Card.Title>
                            <Card.Text> Name: {currentUser.Username} </Card.Text>
                            <Card.Text> Email: {currentUser.Email} </Card.Text>
                            <br></br>
                            <Button className="delete-btn" variant="danger" onClick={handleDelete}>
                                    Delete Account
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-profile">
                        <Card.Body>
                            <Card.Title> Update Profile </Card.Title>
                            <Form>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter new username" value={username} onChange={e => setUsername(e.target.value)} />
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter new email" value={email} onChange={e => setEmail(e.target.value)} />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Button className="update-btn" variant="primary" type="submit" onClick={handleUpdate}>
                                    Update
                                </Button>
                            </Form>
                            
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Card className="card-container--profile card-profile">
                <Card.Body>
                    <Card.Title> Favorite Movies </Card.Title>
                    <Row className="justify-content-md-left" mb={10}>

                        {usersFavMovies.length === 0 && (
                            <Col>
                                <p>Your list is currently empty.</p>
                            </Col>
                        )}

                        {usersFavMovies.map((movie) => 
                            <Col key={movie._id} className="mb-5" sm={6} md={4} lg={3}>
                                
                                <Card >
                                    <Link className="link-text" to={`/movies/${movie._id}`}>
                                    <Card.Img className="card-image" variant="left" src={movie.ImagePath} />
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>            
                                    </Card.Body>
                                    </Link>
                                    <Card.Body>
                                        <Button className="remove-btn" variant="secondary" onClick={() => handleRemoveFavorite(movie._id)} > Remove</Button>
                                    </Card.Body>
                                </Card>

                            </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}