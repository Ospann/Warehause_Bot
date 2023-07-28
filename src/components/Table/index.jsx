import {
    TableContainer,
    Box,
    Td,
    Tr,
    Table,
    Tbody,
    Heading,
    // Button
} from "@chakra-ui/react";
import classes from './Table.module.css';
import CustomOrderModal from "../Modal";
import { useAppContext } from "../../utils/AppContext";

const CustomTable = () => {
    const { data } = useAppContext();
    console.log(data)
    return (
        <Box className={classes.container}>
            <Box className={classes.title}>
                <Heading size='lg'>Order summary</Heading>
                {/* <Button>Add</Button> */}
                <CustomOrderModal />
            </Box>
            <TableContainer>
                <Table variant='simple'>
                    <Tbody>
                        {data.map((option, index) => (
                            <Tr key={index}>
                                <Td>{option.product}</Td>
                                <Td>Qty: {option.qty}</Td>
                                <Td isNumeric> € {option.price}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CustomTable;