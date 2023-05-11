import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import MainBreadcrumb from "../navigation/MainBreadcrumb";

/**
 * Main wrapper component.
 */
const MainWrapper: FC = () => {
    return (
        <Box
            as='main'
            px={{ base: 5, md: 0 }}
        >
            <MainBreadcrumb />
        </Box>
    )
}

export default MainWrapper;