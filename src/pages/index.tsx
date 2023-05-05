import React, { FC } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, ChakraProvider, Container, Grid, Heading, ThemeProvider } from "@chakra-ui/react"
import TopNav from "../components/navigation/TopNav"
import LeftNav from "../components/navigation/LeftNav"
import RightNav from "../components/navigation/RightNav"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ChakraProvider>
      <TopNav />
      <Grid 
        mt={5}
        w='7xl'
        mx='auto'
        templateRows={{ base: 'auto 1fr', md: 'auto 1fr' }}
        templateColumns={{ base: '1fr', md: 'minmax(auto, 250px) 4fr minmax(auto, 250px)' }}
        gap={10}
      >
        <LeftNav />
        <Box>

        </Box>
        <RightNav />
      </Grid>
    </ChakraProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Snek Docs</title>
