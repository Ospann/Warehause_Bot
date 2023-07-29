import { Box, Button, Heading, Tooltip, useToast } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../utils/AppContext';
import classes from './Footer.module.css';
import CalcTotal from '../../utils/helpers/calcTotal';

const Footer = () => {
    const { data, setData, operation } = useAppContext();
    const toast = useToast();

    const sendData = () => {

        const requestData = {
            operation: operation,
            data: data,
        };
        if (data.length === 0) {
            toast({
                title: 'Fill something',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        } else {
            fetch("https://wh.maxinum.kz/api/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then((response) => {
                if (response.ok) {
                    setData([]);
                    toast({
                        title: 'Data uploaded',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    console.error('Error:', response.statusText);
                }
            })
                .catch((error) => {
                    console.error('Fetch Error:', error);
                })
        }
    };

    return (
        <Box className={classes.footer}>
            <Box>
                <Tooltip hasArrow label='Total order amount' bg='gray.300' color='black'>
                    <QuestionOutlineIcon w={5} h={5} />
                </Tooltip>
                <Heading size='md'>
                    Total: € {CalcTotal(data)}
                </Heading>
            </Box>
            <Button onClick={sendData} size='sm'>CONFIRM</Button>
        </Box>
    );
};

export default Footer;
