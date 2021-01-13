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

    const capitalize = (s) => {
        return (typeof s !== 'string') ? '' : s.charAt(0).toUpperCase() + s.slice(1);
    }

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const isEmpty = (q) => {
        return (q === '') ? setError({ bool: true, message: 'You must fill in the fields.' }) : setError({ bool: false, message: '' });
    }

    const handleSubmit = async (e) => {
        setIsLoaded(false);
        e.preventDefault();
        isEmpty(query);
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=9f56ec01`)
            if (response.status === 200) {
                setIsLoaded(true);
                const toJson = await response.json();
                console.log(toJson);
                setData(toJson)
            }
        } catch (error) {
            console.error(error);
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