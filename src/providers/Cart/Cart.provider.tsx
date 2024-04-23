'use client';
import { updateCartAction } from '@/lib/actions/actions';
import { Log } from '@/lib/logs';
import { ProductBrief } from '@/lib/types/client.types';
import { CartItems, ProductPayload } from '@/lib/types/global.types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../Auth/Auth.provider';

type ProductState = ProductBrief & { quantity: number };

type CartContextT = {
  products: ProductState[];
  addToCart: (product: ProductBrief) => void;
  removeFromCart: (productId: string) => void;
  totalQuantity: number;
  totalPrice: number;
  cartIsVisible: boolean;
  showCart: () => void;
  hideCart: () => void;
  deleteItemFromCart: (productId: string) => void;
  reset: () => void;
  adding: boolean; // to store adding state when send cart data to server
  removing: boolean; // to store removing state when send cart data to server
  deleting: boolean; // to store deleting state when send cart data to server
};

type CartState = {
  products: ProductState[];
  totalQuantity: number;
  totalPrice: number;
};

type CartReducerFn = (
  state: CartState,
  action: {
    payload: ProductBrief | string | CartItems[];
    type: 'add' | 'remove' | 'deleteItem' | 'hydrateCart' | 'reset';
  }
) => CartState;

export const CartContext = createContext<CartContextT>({
  products: [],
  addToCart: (prd) => {},
  removeFromCart: (_id) => {},
  totalQuantity: 0,
  totalPrice: 0,
  cartIsVisible: false,
  hideCart: () => {},
  showCart: () => {},
  deleteItemFromCart: (prdId) => {},
  reset: () => {},
  adding: false,
  removing: false,
  deleting: false,
});

const init: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer: CartReducerFn = (state, action) => {
  const { payload, type } = action;

  const products = JSON.parse(JSON.stringify(state.products)) as ProductState[]; // creating a deep copy of products to avoid multiple renders
  let totalPrice = state.totalPrice; // total price
  let totalQuantity = state.totalQuantity; // total quantity

  if (type === 'add') {
    const prdIndex = products.findIndex(
      (p) => p._id === (payload as ProductBrief)._id
    ); // finding product index
    totalPrice = totalPrice + (payload as ProductBrief).price; // incrementing total price
    totalQuantity++; // incrementing total quantity

    if (prdIndex === -1) {
      products.push({ ...(payload as ProductBrief), quantity: 1 }); // adding product
    } else {
      products[prdIndex].quantity++; // updating quantity
    }
  }

  if (type === 'remove') {
    const prdIndex = products.findIndex((p) => p._id === (payload as string));
    const product = products[prdIndex];
    totalQuantity--; // decreasing quantity
    totalPrice = totalPrice - product.price; // decreasing price

    if (prdIndex > -1) {
      if (product.quantity > 1) {
        products[prdIndex].quantity--; // decreasing product quantity
      } else {
        products.splice(prdIndex, 1); // removing product
      }
    }
  }

  if (type === 'deleteItem') {
    const prdIndex = products.findIndex((p) => p._id === (payload as string));
    if (prdIndex > -1) {
      const product = products[prdIndex];
      totalQuantity = totalQuantity - product.quantity; // decreasing quantity by product quantity
      totalPrice = totalPrice - product.price * product.quantity; // decreasing price by product price * its quantity

      products.splice(prdIndex, 1); // removing product
    }
  }

  if (type === 'hydrateCart') {
    (payload as CartItems[]).forEach((prd) => {
      products.push({ ...prd, _id: prd.id });

      totalQuantity += prd.quantity;
      totalPrice = totalPrice + prd.quantity * prd.price;
    });
  }

  if (type === 'reset') {
    return init;
  }

  return {
    ...state.products,
    products,
    totalPrice,
    totalQuantity,
  };
};

const CartProvider = ({
  children,
  existingCart,
}: {
  children: ReactNode;
  existingCart?: string;
}) => {
  const isInitialized = useRef(false);
  const [cart, cartDispatch] = useReducer(cartReducer, init);
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removing, setRemoving] = useState(false);
  const authCtx = useContext(AuthContext);

  if (!isInitialized.current) {
    const userCart: CartItems[] = existingCart ? JSON.parse(existingCart) : [];

    cartDispatch({ payload: userCart, type: 'hydrateCart' });

    isInitialized.current = true;
  }
  const showCart = () => setCartIsVisible(true);
  const hideCart = () => setCartIsVisible(false);

  const addToCart = async (product: ProductBrief) => {
    // If user is not logged in then we don't send cart to server
    if (!authCtx.isLoggedIn)
      return cartDispatch({ payload: product, type: 'add' });

    setAdding(true);
    let isFirst = true; // to keep track if product is being for first time

    const products: ProductPayload[] = cart.products.map((product) => ({
      id: product._id,
      size: product.size,
      quantity: product.quantity,
    }));

    const prdIndex = products.findIndex((p) => p.id === product._id);
    // if product exists
    if (prdIndex !== -1) {
      products[prdIndex].quantity += 1;
      isFirst = false;
    } else {
      products.push({ quantity: 1, id: product._id, size: product.size });
    }

    // sending cart to server
    await updateCartAction({
      products,
    });

    cartDispatch({ payload: product, type: 'add' });
    setAdding(false);
    isFirst && showCart(); // showing cart if product is being added for first time.
  };

  const removeFromCart = async (productId: string) => {
    // If user is not logged in then we don't send cart to server
    if (!authCtx.isLoggedIn)
      return cartDispatch({ payload: productId, type: 'remove' });
    setRemoving(true);
    const products: ProductPayload[] = cart.products.map((product) => ({
      id: product._id,
      size: product.size,
      quantity: product.quantity,
    }));

    const prdIndex = products.findIndex((p) => p.id === productId);
    const product = products[prdIndex];

    // if product exists
    if (prdIndex !== -1) {
      // if quantity is greater than 1 then we reduce quantity else we remove product
      if (product.quantity > 1) {
        products[prdIndex].quantity -= 1;
      } else {
        products.splice(prdIndex, 1);
      }
    }

    // sending cart to server
    await updateCartAction({
      products,
    });

    cartDispatch({ payload: productId, type: 'remove' });
    setRemoving(false);
  };

  const deleteItemFromCart = async (productId: string) => {
    // If user is not logged in then we don't send cart to server
    if (!authCtx.isLoggedIn)
      return cartDispatch({ payload: productId, type: 'deleteItem' });

    setDeleting(true);
    const products: ProductPayload[] = cart.products.map((product) => ({
      id: product._id,
      size: product.size,
      quantity: product.quantity,
    }));

    const prdIndex = products.findIndex((p) => p.id === productId);

    // if product exists
    if (prdIndex !== -1) {
      products.splice(prdIndex, 1); // removing product from cart
    }

    // sending cart to server
    await updateCartAction({
      products,
    });

    cartDispatch({ payload: productId, type: 'deleteItem' });

    setDeleting(false);
  };

  const reset = () => cartDispatch({ payload: '', type: 'reset' });

  return (
    <CartContext.Provider
      value={{
        ...cart,
        addToCart,
        removeFromCart,
        cartIsVisible,
        showCart,
        hideCart,
        reset,
        deleteItemFromCart,
        adding,
        removing,
        deleting,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
