import { FETCH_MOVIE_EXPLORE, SEARCH_MOVIE, NOT_FOUND, FETCH_ERROR } from '../actiontypes';

export const fetch_data = () => {
    return async dispatch => {
        try {
            let api_uri = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=1240a0327275bc49b56f6907d9be7a90&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
            let result = await api_uri.json();
            dispatch({ type : FETCH_MOVIE_EXPLORE, list_result : result["results"] })
        } catch (error) {
            dispatch({ type : FETCH_ERROR })
        }
    }
}

export const search_movie = (text) => {
    // https://image.tmdb.org/t/p/w200/t7EUMSlfUN3jUSZUJOLURAzJzZs.jpg
    // https://api.themoviedb.org/3/search/movie?api_key=1240a0327275bc49b56f6907d9be7a90&language=en-US&page=1&include_adult=true&query=%22shadow%22
    return async dispatch => {
        try {
            let api_url = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1240a0327275bc49b56f6907d9be7a90&language=en-US&page=1&include_adult=true&query=%22${text}%22`);
            let result =  await api_url.json();
            if(result["results"].length > 0) {
                dispatch({ type: SEARCH_MOVIE, list_result : result["results"] })
            } else {
                // later for micro interactions    
                dispatch({ type: NOT_FOUND })
            }
        } catch (error) {
            dispatch({ type : FETCH_ERROR })
        }
    }
}
