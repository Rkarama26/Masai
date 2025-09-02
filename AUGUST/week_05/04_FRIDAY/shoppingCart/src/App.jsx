import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './features/cart/cartSlice';

function App() {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  // Example products
  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Headphones', price: 150 }
  ];

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '700px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Shopping Cart</h1>

      <h2 style={{ color: '#555', marginTop: '2rem' }}>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{
            flex: '1 1 200px',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
              <p style={{ margin: 0, fontWeight: 'bold' }}>${product.price}</p>
            </div>
            <button
              onClick={() => dispatch(addItem(product))}
              style={{
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ color: '#555', marginTop: '2rem' }}>Cart</h2>
      {items.length === 0 ? <p>Cart is empty</p> :
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '5px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span>{item.name} - ${item.price}</span>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                style={{
                  padding: '0.3rem 0.6rem',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      }

      <h3 style={{ textAlign: 'right', marginTop: '1.5rem', color: '#333' }}>
        Total: ${total}
      </h3>
    </div>

  );
}

export default App;
