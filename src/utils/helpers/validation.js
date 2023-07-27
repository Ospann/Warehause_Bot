
const validation = (formData) => {
    return (
        formData.client !== "" &&
        formData.project !== "" &&
        (formData.hour !== "" || formData.minute !== "") &&
        formData.date !== ""
    );
};

export default validation;
