import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const cartInitialState = {
  products: []
};

const cart = (state = cartInitialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.data] };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.data.id
        )
      };
    default:
      return state;
  }
};

const favoriteInitialState = {
  favorites: []
};

const favoriteProducts = (state = favoriteInitialState, action) => {
  switch (action.type) {
    case "SAVE_FAVORITE":
      const favorited = state.favorites.filter((favorite) => favorite.id === action.data.id);
      if (favorited.length > 0) {
        return {
          ...state,
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== action.data.id
          )
        };
      }
      return { ...state, favorites: [...state.favorites, action.data] };
    default:
      return state;
  }
};

const appReducer = combineReducers({ cart, favoriteProducts });

const store = createStore(appReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
