
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Substitua com a URL da sua API
        setOrders(response.data.map(order => ({
          ...order,
          date: '01/09/2024', // Data fictícia
          items: [
            { name: 'Produto 1', price: 'R$ 199,99' },
            { name: 'Produto 2', price: 'R$ 100,00' }
          ],
          total: 'R$ 299,99'
        })));
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  const toggleDetails = (index) => {
    const updatedOrders = orders.map((order, i) => {
      if (i === index) {
        return { ...order, showDetails: !order.showDetails };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo"></div>
      </nav>

      <div className="container">
        <header>
          <h1>Compras</h1>
        </header>
        <div className="orders">
          {orders.map((order, index) => (
            <div key={order.id} className="order" onClick={() => toggleDetails(index)}>
              <p className='date'>{order.date}</p>
              <div className="order-header">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Imagem do Pedido"
                  className="order-image"
                />
                <div className="order-info">
                  <h3>Pedido:{order.id}</h3>
                  <span className="status">
                    <p className="nome-status">Entregue</p>
                  </span>
                </div>
              </div>
              {order.showDetails && (
                <div className="order-details">
                  <p><strong>Data:</strong> {order.date}</p>
                  <p><strong>Total:</strong> {order.total}</p>
                  <p><strong>Itens:</strong></p>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>{item.name} - {item.price}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
