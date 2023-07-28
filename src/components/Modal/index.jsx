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
    const { setData, data, operation, supplier } = useAppContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useTelegram();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        supplier: '',
        product: '',
        operation: operation,
        qty: '',
        price: '',
        user: '',
    });

    const resetFormData = () => {
        setFormData({
            supplier: '',
            product: '',
            operation: operation,
            qty: '',
            price: '',
            user: user.id,
        });
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'product') {
            const selectedSupplier = supplier.find((supplier) => supplier.name === formData.supplier);
            const selectedProduct = selectedSupplier.product.find((product) => product.name === value);

            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                price: operation === 'Sale' ? selectedProduct.order_price : selectedProduct.purchase_price,
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
                            {supplier?.map((supplier) => (
                                <option key={supplier.name} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            disabled={!formData.supplier}
                        >
                            <option value="">Select a product</option>
                            {formData.supplier &&
                                supplier
                                    ?.find((supplier) => supplier.name === formData.supplier)
                                    ?.product.map((product) => (
                                        <option key={product.name} value={product.name}>
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