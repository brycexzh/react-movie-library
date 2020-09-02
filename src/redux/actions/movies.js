import * as types from '../types';
import * as movieServices from '../../services/movies.service';

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(types.MOVIE_LIST, results, dispatch);
    dispatchMethod(types.RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(types.SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(
      types.LOAD_MORE_RESULTS,
      { list: results, page: payload.page, totalPages: payload.totalPages },
      dispatch
    );
  } catch (error) {
    if (error.response) {
      dispatchMethod(types.SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query) {
      const movies = await movieServices.SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(types.SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(types.SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      dispatchMethod(types.SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const movieDetails = (id) => async (dispatch) => {
  try {
    const details = await movieServices.MOVIE_DETAILS_URL(id);
    const credits = await movieServices.MOVIE_CREDITS_URL(id);
    const images = await movieServices.MOVIE_IMAGES_URL(id);
    const videos = await movieServices.MOVIE_VIDEOS_URL(id);
    const reviews = await movieServices.MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(types.MOVIE_DETAILS, resp, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(types.SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch) => {
  dispatchMethod(types.CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(types.RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(types.MOVIE_TYPE, type, dispatch);
};

export const searchQuery = (query) => async (dispatch) => {
  dispatchMethod(types.SEARCH_QUERY, query, dispatch);
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};

const getMoviesRequest = async (type, pageNumber) => {
  const movies = await movieServices.MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
