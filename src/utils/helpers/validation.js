
const validation = (formData) => {
    return (
        formData.supplier !== "" &&
        formData.product !== "" &&
        formData.qty !== "" &&
        formData.price !== ""
    );
};

export default validation;
