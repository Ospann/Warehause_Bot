import { Box, Button, Heading, Tooltip, useToast } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { useAppContext } from '../../utils/AppContext';
import classes from './Footer.module.css';
import CalcTotal from '../../utils/helpers/calcTotal';

const Footer = () => {
    const { data, setData } = useAppContext();
    const toast = useToast();

    const sendData = () => {
        if (data.length === 0) {
            toast({
                title: 'Fill something',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        } else {
            setData([]);
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
