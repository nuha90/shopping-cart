import { useState } from 'react';
import { useQuery } from 'react-query';
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Wrapper, StyledButton } from './App.styles';
import Item from './Item/Item';
import Cart from './Cart/Cart';

export type CartItemType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemOnCart = prev.find(item => item.id === clickedItem.id);

      if (isItemOnCart) {
        return prev.map(item => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id != id));
  };

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartIsOpen} onClose={() => setCartIsOpen(false)}>
        <Cart cartItems={cartItems} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
