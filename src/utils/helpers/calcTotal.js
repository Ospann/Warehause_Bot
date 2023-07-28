const CalcTotal = (data) => {
    let total = 0;

    for (const item of data) {
        const price = parseFloat(item.price);
        const qty = parseFloat(item.qty);

        if (!isNaN(price) && !isNaN(qty)) {
            total += price * qty;
        }
    }

    return total;
}

export default CalcTotal;