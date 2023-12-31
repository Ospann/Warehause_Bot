import {
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Select,
    Input,
    Alert,
    AlertIcon,
    ModalCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import useTelegram from '../../utils/hooks/useTelegram';
import { useState } from 'react';
import { useAppContext } from '../../utils/AppContext';
import validation from '../../utils/helpers/validation';

const OrderModal = () => {
    const { setData, data, operation, products, supplierList } = useAppContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useTelegram();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        supplier: '',
        product_id: '',
        qty: '',
        price: '',
        user_id: user.id,
    });

    const resetFormData = () => {
        setFormData({
            supplier: '',
            product_id: '',
            product: '',
            qty: '',
            price: '',
            user_id: user.id,
        });
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'product_id') {
            const selectedProduct = products.find((product) => product.id == value && product.supplier === formData.supplier);
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                product: selectedProduct.name,
                price: operation === 'Sale' ? selectedProduct.order : selectedProduct.purchase,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const sendData = () => {
        if (!validation(formData)) {
            setOpen(true)
            return;
        }
        const newData = [...data, formData];
        setData(newData);
        resetFormData();
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}><AddIcon /></Button>

            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='input-form'>
                        <Select
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                        >
                            <option value="">Select a supplier</option>
                            {supplierList?.map((supplier) => (
                                <option key={supplier} value={supplier}>
                                    {supplier}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleChange}
                            disabled={!formData.supplier}
                        >
                            <option value="">Select a product</option>
                            {formData.supplier &&
                                products
                                    ?.filter((product) => product.supplier === formData.supplier)
                                    .map((product) => (
                                        <option key={product.name} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                        </Select>
                        <Input
                            placeholder="quantity"
                            type="number"
                            name="qty"
                            value={formData.qty}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="price"
                            placeholder="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <Alert status='error' style={{ display: open ? "flex" : "none" }}>
                            <AlertIcon />
                            Fill in all the fields
                        </Alert>
                    </ModalBody>

                    <ModalFooter style={{ justifyContent: "center" }}>
                        <Button colorScheme='blue' mr={3} onClick={sendData}>
                            Submit Data
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrderModal;