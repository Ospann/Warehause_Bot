import { useState, useEffect, useCallback } from 'react';
import useTelegram from './utils/hooks/useTelegram';
import validation from './utils/helpers/validation';

const App = () => {
  const { onShowButton, onHideButton, tg, user } = useTelegram();
  const [suppliers, setsuppliers] = useState();
  const [message, setMessage] = useState();
  const open = Boolean(message);

  const [formData, setFormData] = useState({
    supplier: '',
    product: '',
    operation: '',
    qty: '',
    price: '',
    comment: '',
    user: '',
  });

  const resetFormData = () => {
    setFormData({
      supplier: '',
      product: '',
      operation: '',
      qty: '',
      price: '',
      comment: '',
      user: user.id,
    });
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  const sendData = useCallback(() => {
    fetch('', {
      method: 'POST',
      headers: {
        'telegram_id': user.id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        resetFormData();
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        clearMessage();
      })
      .catch((error) => {
        setMessage(error.message);
        console.error('Error during fetch:', error);
      });
  }, [formData]);

  useEffect(() => {
    if (!user) {
      return;
    }
    resetFormData();
    const fetchData = async () => {
      try {
        const response = await fetch('');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        const data = await response.json();
        setsuppliers(data);
      } catch (error) {
        setMessage(error.message);
        setTimeout(() => {
          tg.close();
        }, 3000);
      }
    };

    fetchData();
  }, [tg, user]);


  useEffect(() => {
    tg.onEvent('mainButtonClicked', sendData);

    return () => {
      tg.offEvent('mainButtonClicked', sendData);
    };
  }, [sendData, tg])

  useEffect(() => {
    if (validation(formData)) {
      onShowButton();
    } else {
      onHideButton();
    }
  }, [formData, onHideButton, onShowButton]);

  const handleChange = ({ target, }) => {
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="input-form">
      <div
        className='message'
        style={{
          border: '1px solid gray',
          display: open ? 'block' : 'none'
        }}>
        {message}
      </div>
      <select
        name="supplier"
        value={formData.supplier}
        onChange={handleChange}
      >
        <option value="">Select a supplier</option>
        {suppliers?.map((supplier) => (
          <option key={supplier.name} value={supplier.name}>
            {supplier.name}
          </option>
        ))}
      </select>
      <select
        name="product"
        value={formData.product}
        onChange={handleChange}
        disabled={!formData.product}
      >
        <option value="">Select a product</option>
        {formData.supplier &&
          suppliers
            ?.find((supplier) => supplier.name === formData.supplier)
            ?.product.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
      </select>
      <select>
        <option value="">Select the type of operation</option>
        <option value={1}>Sale</option>
        <option value={2}>Purchase</option>
      </select>
      <div className='time-form'>
        <input
          placeholder="0"
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="0"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <textarea
        placeholder="comment..."
        name="comment"
        cols={30}
        rows={5}
        style={{ resize: 'none' }}
        value={formData.comment}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
