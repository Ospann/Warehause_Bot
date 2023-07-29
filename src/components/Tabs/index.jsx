// import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import classes from "./Tabs.module.css";
import { CheckIcon } from "@chakra-ui/icons"
import { useAppContext } from "../../utils/AppContext";
import changeOperation from "../../utils/helpers/changeOperation";

const Tabs = () => {
    const { operation, setOperation, data, setData, products } = useAppContext();
    const handleTabClick = (tab) => {
        setOperation(tab);
        const changedData = changeOperation(data, tab, products);
        setData(changedData);
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.title}>
                <Heading size="lg">Operation type</Heading>
            </Box>
            <Box className={classes.operations}>
                <Box
                    className={`${classes.tab} ${operation === "Sale" ? classes.selected : ""
                        }`}
                    onClick={() => handleTabClick("Sale")}
                >
                    <Heading size="md">Sale</Heading>
                    <Text fontSize="md">You sell something</Text>
                    {operation === "Sale" && <CheckIcon className={classes.checkmate} />}
                </Box>
                <Box
                    className={`${classes.tab} ${operation === "Purchase" ? classes.selected : ""
                        }`}
                    onClick={() => handleTabClick("Purchase")}
                >
                    <Heading size="md">Purchase</Heading>
                    <Text fontSize="md">You order something</Text>
                    {operation === "Purchase" && <CheckIcon className={classes.checkmate} />}
                </Box>
            </Box>
        </Box>
    );
};

export default Tabs;
