import { Box, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useTelegram from "../../utils/hooks/useTelegram";
import classes from './Header.module.css';

const Header = () => {
    const { tg } = useTelegram();

    return (
        <Box className={classes.header}>
            <ArrowBackIcon w={8} h={8} onClick={() => tg.close()} />
            <Heading size='lg'>Warehouse</Heading>
        </Box>
    )
}

export default Header;