import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [state, setState] = useState({ data: null, loading: true });
    useEffect(() => {
        fetch(url)
            .then(result => result.json())
            .then(data => setState({
                data,
                loading: false
            }));
    }, []);
    console.log(state);
    return state;
};