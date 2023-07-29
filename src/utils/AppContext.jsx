import { createContext, useState, useContext, useMemo } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [operation, setOperation] = useState('Sale');
    const [products, setProducts] = useState([]);

    const supplierList = useMemo(() => {
        const suppliersSet = new Set(products.map(product => product.supplier));
        return Array.from(suppliersSet);
    }, [products]);

    return (
        <AppContext.Provider value={{ data, setData, operation, setOperation, products, setProducts, supplierList }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };
