import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../LoadingSpinner';
import OneStar from './components/OneStar';
import TwoStar from './components/TwoStar';
import ThreeStar from './components/ThreeStar';
import FourStar from './components/FourStar';
import FiveStar from './components/FiveStar';

const StarRating = ({ movieRating }) => {
    return (movieRating <= 2) ?
        <OneStar />
        : movieRating <= 4 ?
            <TwoStar />
            : movieRating <= 6 ?
                <ThreeStar />
                : movieRating <= 8 ?
                    <FourStar />
                    : <FiveStar />
};

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
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

    const splitString = (stringToSplit, separator) => {
        const arrayOfStrings = stringToSplit.split(separator);
        return arrayOfStrings;
    };

    return (
        <div>
            {isLoaded === false ? <Spinner />
                : <div className="centered max-movie-width flex-container">
                    <div className="movie-container">
                        <img className="movie-img" src={movie.Poster} alt="movie-poster" />
                        <div>{movie.Title}</div>
                        <StarRating movieRating={movie.imdbRating} />
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

export default Movie;