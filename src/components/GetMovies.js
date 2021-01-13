import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './LoadingSpinner';

const GetMovies = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState({
        bool: false,
        message: ''
    });

    const capitalize = (str) => {
        return (typeof str !== 'string') ? '' : str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const isEmpty = (searchQuery) => {
        if (searchQuery === '') {
            setError({ bool: true, message: 'You must fill in the fields.' });
            return true;
        } else {
            setError({ bool: false, message: '' });
            return false;
        };
    };

    const handleSubmit = async (e) => {
        setIsLoaded(false);
        e.preventDefault();
        if (isEmpty(query)) return;
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
            if (response.status === 200) {
                setIsLoaded(true);
                const toJson = await response.json();
                if (toJson.Error) {
                    setError({ bool: true, message: toJson.Error })
                } else {
                    setData(toJson)
                };
            };
            if (response.status === 401) {
                setIsLoaded(true);
                setError({ bool: true, message: 'You\'re not authenticated.'})
            }
        } catch (error) {
            console.error(error);
            setIsLoaded(true);
            setError({ bool: true, message: 'Something went wrong!' })
        }
    };

    return (
        <div>
            <form className="centered">
                <div className="error">{error.message}</div>
                <input
                    className="form-input"
                    type="text"
                    placeholder="Search Movies"
                    value={query}
                    onChange={handleChange}
                />
                <button className="mt" onClick={handleSubmit}>Search</button>
            </form>
            {isLoaded === false && error.bool === false ? <Spinner /> :
                <div>
                    {isLoaded === true && error.bool === false && <h1 className="centered">Total Results : {data.totalResults || 0}</h1>}
                    <div className="row">
                        {data.Search && data.Search.map((movie) =>
                            <div className="block column" key={movie.imdbID}>
                                {movie.Poster !== 'N/A' ? <img className="negative-m-poster" src={movie.Poster} alt="movie-poster" /> : <div>Sorry, no image.</div>}
                                <div className="block-item">
                                    <div><strong>{movie.Title}</strong></div>
                                    <div>{capitalize(movie.Type)}</div>
                                    <div>{movie.Year}</div>
                                    <Link className="view-movie-btn" to={`${movie.imdbID}`}>View</Link>
                                </div>
                            </div>
                        )}
                        {data.Response && data.Error === 'Movie not found!' && <div>Sorry, there are no movies with that title.</div>}
                    </div>
                </div>}
        </div>
    );
}

export default GetMovies;