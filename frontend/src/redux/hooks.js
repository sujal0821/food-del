import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal, 
  addToCartAsync, 
  removeFromCartAsync, 
  getCartAsync 
} from './slices/cartSlice';
import { 
  selectFoodList, 
  selectFoodStatus, 
  fetchFoodList 
} from './slices/foodSlice';
import { 
  selectToken, 
  selectIsAuthenticated, 
  setToken, 
  logout 
} from './slices/authSlice';

// Auth hooks
export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return {
    token,
    isAuthenticated,
    setToken: (token) => dispatch(setToken(token)),
    logout: () => dispatch(logout())
  };
};

// Food hooks
export const useFoodList = () => {
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList);
  const foodStatus = useSelector(selectFoodStatus);

  useEffect(() => {
    if (foodStatus === 'idle') {
      dispatch(fetchFoodList());
    }
  }, [foodStatus, dispatch]);

  return {
    foodList,
    foodStatus,
    refreshFoodList: () => dispatch(fetchFoodList())
  };
};

// Cart hooks
export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(getCartAsync(token));
    }
  }, [token, dispatch]);

  const handleAddToCart = (itemId) => {
    if (token) {
      dispatch(addToCartAsync({ itemId, token }))
        .unwrap()
        .catch(error => {
          console.error('Failed to add to cart:', error);
          // Fallback to local cart action if there's an API error
          dispatch(addToCart(itemId));
        });
    } else {
      // Just use local cart if no token
      dispatch(addToCart(itemId));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    if (token) {
      dispatch(removeFromCartAsync({ itemId, token }))
        .unwrap()
        .catch(error => {
          console.error('Failed to remove from cart:', error);
          // Fallback to local cart action if there's an API error
          dispatch(removeFromCart(itemId));
        });
    } else {
      // Just use local cart if no token
      dispatch(removeFromCart(itemId));
    }
  };

  return {
    cartItems,
    cartTotal,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    refreshCart: () => token && dispatch(getCartAsync(token))
  };
}; 