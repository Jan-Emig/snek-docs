import { Box, Stack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import React from 'react';

import { useNavOffset } from '../hooks/use-nav-offset';
import RightNav from '../layout/navigation/RightNav';
import MainBottomNav from '../layout/navigation/MainBottomNav';

// Default custom components (replaces HTML tags)
import Text from '../components/main-content/text/Text';
import Heading from '../components/main-content/heading/Heading';
import List from '../components/main-content/list/List';
import ListItem from '../components/main-content/list/ListItem';
import CodeSnippet from '../components/main-content/code-snippet/CodeSnippet';
import Link from '../components/core/Link';

// Insertable custom components (via Jaen)
import Filesystem from '../components/main-content/filesystem/Filesystem';
import ImageCard from '../components/main-content/image-card/ImageCard';
import Callout from '../components/main-content/callout/Callouts';
import IconCard from '../components/main-content/icon-card/IconCard';
import CodePlayground from '../components/main-content/code-playground/CodePlayground';

export interface DocContentProps {}

export const DocContent: React.FC<DocContentProps> = () => {
  const navTopOffset = useNavOffset();

  return (
    <Stack spacing={{ base: 0, xl: 12 }} direction="row">
      <Box maxW="900px" w="full">
        <Field.Mdx
          name="documentation"
          components={{
            // TEXT
            p: props => <Text {...props} />,
            h1: props => <Heading variant="h1" {...props} />,
            h2: props => <Heading variant="h2" {...props} />,
            h3: props => <Heading variant="h3" {...props} />,
            h4: props => <Heading variant="h4" {...props} />,
            h5: props => <Heading variant="h5" {...props} />,
            h6: props => <Heading variant="h6" {...props} />,
            // LIST
            ul: (props: any) => <List {...props}></List>,
            ol: (props: any) => <List variant="ordered" {...props}></List>,
            li: (props: any) => <ListItem {...props}></ListItem>,
            a: (props: any) => <Link href={props.href} {...props} />,
            // TABLE
            table: (props: any) => (
              <Table variant="striped" w="fit-content" {...props} />
            ),
            thead: (props: any) => <Thead {...props} />,
            tbody: (props: any) => <Tbody {...props} />,
            tr: (props: any) => <Tr {...props} />,
            th: (props: any) => <Th {...props} />,
            td: (props: any) => <Td {...props} />,
            // MISC
            code: ({
              className,
              playground,
              ...props
            }: {
              playground?: boolean;
              className?: string;
              children: string;
            }) => {
              const lang = className?.replace('language-', '') || 'text';

              if (playground) {
                return (
                  <CodePlayground
                    codeEditorProps={{
                      language: lang,
                      ...props
                    }}
                    executeCode={async code => {
                      await new Promise(resolve => setTimeout(resolve, 3000));

                      // Fetch some random data from the internet
                      const res = await fetch(
                        'https://jsonplaceholder.typicode.com/todos/1'
                      );
                      const data = await res.json();

                      return (
                        <Box>
                          <h1>How cool is that?</h1>
                          <pre>{JSON.stringify(data, null, 2)}</pre>
                        </Box>
                      );
                    }}
                    {...props}
                  />
                );
              }

              return <CodeSnippet language={lang} {...props} />;
            },
            // CUSTOM COMPONENTS
            Filesystem,
            ImageCard,
            Callout,
            IconCard
          }}
        />
        <MainBottomNav />
      </Box>

      <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
        <RightNav />
      </Box>
    </Stack>
  );
};
