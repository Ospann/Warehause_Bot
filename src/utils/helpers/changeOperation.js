const changeOperation = (data, operation, supplier) => {
    return data.map((item) => {
        const selectedSupplier = supplier.find((supplier) => supplier.name === item.supplier);
        const selectedProduct = selectedSupplier.product.find((product) => product.name === item.product);
        item.operation = operation;
        item.price = operation === 'Sale' ? selectedProduct.order_price : selectedProduct.purchase_price;

        return item;
    });
};

export default changeOperation;
