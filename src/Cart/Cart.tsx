import { CartItemType } from '../App';
import { Wrapper } from './Cart.styles';
import CartItem from '../CartItem/CartItem';

type props = {
  cartItems: CartItemType[];

  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const Cart: React.FC<props> = ({ handleAddToCart, handleRemoveFromCart, cartItems }) => (
  <Wrapper>
    <h1>shopping cart</h1>

    {cartItems.length == 0 ? <p>cart is empty</p> : null}

    {cartItems.map(item => (
      <CartItem key={item.id} item={item} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
    ))}
  </Wrapper>
);
export default Cart;
