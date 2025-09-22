import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import reducer from "../reducer/productReducer";
import { SET_API_DATA, SET_SINGLE_ERROR, SET_SINGLE_PRODUCT, SET_SINGLE_LOADING, SET_LOADING, API_ERROR } from "../common/content";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get(url);
      const products = res.data;
      dispatch({ type: SET_API_DATA, payload: products });
    } catch (error) {
      dispatch({ type: API_ERROR });
    }
  };

  const getSingleProduct = useCallback(async (url) => {
    dispatch({ type: SET_SINGLE_LOADING });
    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      dispatch({ type: SET_SINGLE_PRODUCT, payload: singleProduct });
    } catch (error) {
      dispatch({ type: SET_SINGLE_ERROR });
    }
  }, []);

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
