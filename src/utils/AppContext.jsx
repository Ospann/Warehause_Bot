import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [operation, setOperation] = useState('Sale');
    const [supplier, setSupplier] = useState([{
        name: "Apple",
        product: [
            {
                name: "Iphone",
                order_price: 999.99,
                purchase_price: 729.99
            },
            {
                name: "Macbook",
                order_price: 1299.99,
                purchase_price: 929.99
            }]
    }]);

    return (
        <AppContext.Provider value={{ data, setData, operation, setOperation, supplier, setSupplier }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };
