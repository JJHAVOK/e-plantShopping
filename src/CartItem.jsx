import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Assuming CartSlice is in the same directory for relative import
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Remove '$' and convert to float before calculating
      const unitPrice = parseFloat(item.cost.substring(1));
      total += unitPrice * item.quantity;
    });
    return total.toFixed(2); // Format to two decimal places
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    // Function passed from ProductList to close the cart view
    onContinueShopping(e); 
  };

  const handleIncrement = (item) => {
    // Dispatch updateQuantity to increase the item's quantity by 1
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is greater than 1, decrease it by 1
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      // If quantity would drop to 0, remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Dispatch removeItem action with the item's name
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item (subtotal)
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the cost string
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

return (
        <div className="cart-container">
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {/* Conditional rendering for an empty cart */}
            {cart.length === 0 ? (
                <p style={{ color: 'black', fontSize: '20px' }}>Your cart is empty. Start adding some plants!</p>
            ) : (
            cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  {/* Display the calculated item subtotal */}
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            )))}
            </div>
          <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
          <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;