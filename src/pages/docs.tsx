import React from "react";
import { HeadFC, graphql } from "gatsby";
import { Box, ChakraProvider, Flex, Grid, Text } from "@chakra-ui/react";
import TopNav from "../layout/navigation/TopNav";
import LeftNav from "../layout/navigation/LeftNav";
import RightNav from "../layout/navigation/RightNav";
import MainWrapper from "../layout/main/MainWrapper";
import theme from "../theme/theme";
import AppLayout from "../layout/AppLayout";
import {
  connectPage,
  usePageManager,
  PageManagerProvider,
  generatePageOriginPath,
} from "@snek-at/jaen";

//TODO: Use this to build the page tree
const PageTree = () => {
  const manager = usePageManager();

  return (
    <span>
      {/* {JSON.stringify(
        manager.pageTree.find((page) => page.id === "JaenPage /docs/")
      )} */}

      {manager.pageTree.map((page) => {
        return (
          <div key={page.id}>
            {page.id} {page.slug} (
              {generatePageOriginPath(manager.pageTree, page)})
          </div>
        );
      })}
    </span>
  );
};

const DocsPage = connectPage(
  () => {
    return (
      <AppLayout>
        {/* <PageManagerProvider>
          <PageTree />
        </PageManagerProvider> */}
        <Grid
          flex={1}
          mt={5}
          maxW="7xl"
          h="100%"
          mx="auto"
          templateRows="1fr"
          templateColumns={{
            base: "1fr",
            md: "0.8fr 2fr",
            xl: "minmax(auto, 250px) minmax(auto, 4fr) minmax(auto, 250px)",
          }}
          gap={10}
          px={{ base: 7, xl: 0 }}
        >
          <Box
            display={{ base: "none", md: "block" }}
            position="sticky"
            top="110px"
          >
            <LeftNav />
          </Box>
          <MainWrapper />
          <Box position="sticky" top="80px">
            <RightNav />
          </Box>
        </Grid>
      </AppLayout>
    );
  },
  {
    label: "Docs",
    children: ["DocPage"],
  }
);

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;

export default DocsPage;

export { Head } from "@snek-at/jaen";
