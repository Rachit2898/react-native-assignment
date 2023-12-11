import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  cart: [],
  favorites: [],
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async id => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  },
);

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addOrUpdateProduct = productToAdd => {
        const existingProduct = state.cart.find(
          product => product.id === productToAdd.id,
        );

        if (existingProduct) {
          existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
          state.cart = [...state.cart, {...productToAdd, count: 1}];
        }
      };

      const product = action.payload;
      addOrUpdateProduct(product);
    },
    setToCart: (state, action) => {
      state.cart = action.payload;
    },
    addFav: (state, action) => {
      const product = action.payload;
      state.favorites.push(product);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {addToCart, addFav, setToCart} = productReducer.actions;

export default productReducer.reducer;
