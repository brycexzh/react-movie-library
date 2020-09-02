import * as types from '../types';

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResult: [],
  movie: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.MOVIE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case types.RESPONSE_PAGE:
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case types.LOAD_MORE_RESULTS:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case types.MOVIE_TYPE:
      return {
        ...state,
        movieType: action.payload
      };
    case types.SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload
      };
    case types.SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    case types.MOVIE_DETAILS:
      return {
        ...state,
        movie: action.payload
      };
    case types.CLEAR_MOVIE_DETAILS:
      return {
        ...state,
        movie: []
      };
    default:
      return state;
  }
};
