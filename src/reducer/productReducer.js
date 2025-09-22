import { SET_API_DATA } from "../common/content";

const productReducer = (state, action) => {

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case SET_API_DATA:
      const featureData = action.payload instanceof Array && action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload, 
        featureProducts: featureData,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoding: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoding: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoding: false,
        isError: true,
      };


    default:
      return state;
  }
};


export default productReducer;