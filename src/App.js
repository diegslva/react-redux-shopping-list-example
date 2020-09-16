import React, { useState, useRef } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as actions from "./actions";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const CartApp = () => {
  const products = useSelector((state) => state.cart.products);
  const favorites = useSelector((state) => state.favoriteProducts.favorites);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const inputProductRef = useRef(null);

  const addTodo = () => {
    dispatch(actions.addProduct({ id: uuidv4(), description: description }));
    clearInput();
  };

  const clearInput = () => {
    inputProductRef.current.value = "";
  };

  const onChangeTodo = (e) => {
    const { value } = e.target;
    if (!value || value.lenght === 0) {
      return;
    }
    setDescription(value);
  };

  const onRemoveProduct = (id) => {
    return () => {
      dispatch(actions.removeProduct({ id: id }));
    };
  };

  const onSaveFavorite = (id) => {
    return () => {
      dispatch(actions.saveFavorite({ id: id }));
    };
  };

  const hasBeenFavorite = (id) => {
    const found = favorites?.filter((favorite) => favorite.id === id);
    if (found) {
      if (Object.keys(found).length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <ul
        style={{
          justifyContent: "center",
          width: "50%",
          backgroundColor: "yellow",
          display: "inline-block",
          flex: 1
        }}
      >
        {products &&
          products.map((product) => (
            <li
              key={product.id}
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                textTransform: "uppercase"
              }}
            >
              <p style={{ float: "left" }}>{product.description}</p>
              <div
                style={{ float: "right", margin: 10}}
              >
                <button onClick={onRemoveProduct(product.id)}>
                  <AiOutlineDelete />
                </button>
                <button onClick={onSaveFavorite(product.id)}>
                  {hasBeenFavorite(product.id) ? <FaHeart /> : <FiHeart />}
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          style={{ textTransform: "uppercase", width: "40%", marginRight: 10 }}
          ref={inputProductRef}
          onChange={onChangeTodo}
          placeholder="Enter your new item"
        />
        <button type="button" primary onClick={addTodo}>
          ADD+
        </button>
      </div>
    </div>
  );
};

export default CartApp;
