import {React, useState} from "react";
import { Form, Container} from "react-bootstrap";
import "./search-filter.scss";


export function SearchFilter({movieData, setFilteredMovies}) {
    const [searchInput, setSearchInput] = useState('');


    console.log(searchInput);
    return (
        <Container className="search-filter">
            <Form.Control
                size="sm"
                type="text"
                placeholder="Search movies..."
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    setFilteredMovies(movieData.filter((movie) => movie.Title.toLowerCase().includes(searchInput.toLowerCase())));
                }}
            />
        </Container>

    );
};