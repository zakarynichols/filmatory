import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GetMovies = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    function capitalize(s) {
        return (typeof s !== 'string') ? '' : s.charAt(0).toUpperCase() + s.slice(1);
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function isEmpty(q) {
        return (q === '') ? setError('You must fill in the fields.') : setError('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        isEmpty(query);
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=9f56ec01`)
            .then(response => response.json())
            .then(movies => setData(movies))
            .catch(error => console.error(error));
    }

    function check() {
        return data.Response === "True" ?
            <div>
                <h1 className="centered">Total Results : {data.totalResults}</h1>
                    <div className="row">
                        {data.Search.map((movie) =>
                            <div className="block column" key={movie.imdbID}>
                                {movie.Poster !== 'N/A' ? <img className="negative-m-poster" src={movie.Poster} alt="movie-poster" /> : <div>Sorry, no image.</div>}
                                <div className="block-item">
                                    <div><strong>{movie.Title}</strong></div>
                                    <div>{capitalize(movie.Type)}</div>
                                    <div>{movie.Year}</div>
                                    <Link className="view-movie-btn" to={`movie/${movie.imdbID}`}>View</Link>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            : data.Error === "Movie not found!" ? <div className="centered mt">There doesn't seem to be a movie with this title.</div>
                : data.Error === "Something went wrong." && !handleSubmit ? <div className="centered mt">Something went wrong.</div>
                    : data.Error === "Too many results." ? <div className="centered mt">Too many results. OMDB can't fetch.</div>
                        : <div className="centered mt">Search for a title.</div>
    }

    return (
        <div>
            <form className="centered">
                <div className="error">{error}</div>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Search OMBD Database"
                    value={query}
                    onChange={handleChange}
                />
                <button className="mt" onClick={handleSubmit}>Search</button>
            </form>
            {check()}
        </div>
    );
}

export default GetMovies;