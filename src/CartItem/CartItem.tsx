import { Wrapper } from './CartItem.styles';
import { CartItemType } from '../App';
import Item from '../Item/Item';
import { Button } from '@material-ui/core';

type props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
};

const CartItem: React.FC<props> = ({ handleAddToCart, handleRemoveFromCart, item }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.price * item.amount).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button size="small" disableElevation variant="contained" onClick={() => handleRemoveFromCart(item.id)}>
          -
        </Button>
        <p>{item.amount}</p>
        <Button size="small" disableElevation variant="contained" onClick={() => handleAddToCart(item)}>
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);
export default CartItem;
