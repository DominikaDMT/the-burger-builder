import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const addOrRemoveIngredient = (state, action, operation) => {
  let updatedIngredient;
  if (operation === "ADD") {
    updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
  } else if (operation === 'SUBTRACT') {
    updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
  }

  const updatedState = {
    ingredients: updateObject(state.ingredients, updatedIngredient),
    building: true 
  }

  if (operation === "ADD") {
    updatedState.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  } else if (operation === 'SUBTRACT') {
    updatedState.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  }

  return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false

});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addOrRemoveIngredient(state, action, 'ADD');
    case actionTypes.REMOVE_INGREDIENT: return addOrRemoveIngredient(state, action, 'SUBTRACT');
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true });
    default: return state;
  }
};

export default reducer;
