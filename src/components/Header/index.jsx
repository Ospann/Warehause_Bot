import { Box, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons"
import classes from './Header.module.css';

const Header = () => {
    return (
        <Box className={classes.header}>
            <ArrowBackIcon w={8} h={8} />
            <Heading size='lg'>Warehouse</Heading>
        </Box>
    )
}

export default Header;