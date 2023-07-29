const changeOperation = (data, operation, products) => {
    return data.map((item) => {
        const selectedProduct = products.find((product) =>
            product.id == item.product_id
        );
        item.price = operation === 'Sale' ? selectedProduct.order : selectedProduct.purchase;

        return item;
    });
};

export default changeOperation;
