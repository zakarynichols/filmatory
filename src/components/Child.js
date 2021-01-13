import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './LoadingSpinner';

const Child = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=9f56ec01`);
                if (response.status === 200) {
                    const toJson = await response.json();
                    setMovie(toJson);
                    setIsLoaded(true);
                };
            } catch (error) {
                console.error(error);
            };
        };
        getMovie();
    }, [id]);

    function splitString(stringToSplit, separator) {
        const arrayOfStrings = stringToSplit.split(separator);
        return arrayOfStrings;
    };

    function starRating(movieRating) {
        return (movieRating <= 2) ?
            <div>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
            </div>
            : movieRating <= 4 ?
                <div>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                : movieRating <= 6 ?
                    <div>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                    : movieRating <= 8 ?
                        <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                        </div>
                        : <div>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                        </div>
    }

    return (
        <div>
            {isLoaded === false ? <Spinner />
                : <div className="centered max-movie-width flex-container">
                    <div className="movie-container">
                        <img className="movie-img" src={movie.Poster} alt="movie-poster" />
                        <div>{movie.Title}</div>
                        {starRating(movie.imdbRating)}
                        <div>Rated: {movie.Rated}</div>
                        <div className="tb-border">
                            <div className="title"><strong>Plot</strong></div>
                            <div className="movie-paragraph">{movie.Plot}</div>
                        </div>
                        <div className="tb-border">
                            <div className="title"><strong>Actors</strong></div>
                            <div className="movie-paragraph">{movie.Actors && splitString(movie.Actors, ',').map((actor, index) => {
                                return <div key={index}>{actor}</div>
                            })}</div>
                        </div>
                        <div className="tb-border">
                            <div className="title"><strong>Box Office</strong></div>
                            {(movie.BoxOffice) ? <div>{movie.BoxOffice}</div> : <div>N/A</div>}
                        </div>
                        <div className="tb-border">
                            <div className="title"><strong>Ratings</strong></div>
                            {movie.Ratings && movie.Ratings.map((rating, index) => {
                                return <div key={index}>{rating.Source} : {rating.Value}</div>
                            })}
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Child;