import React, { FC } from "react";
import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import { NavMenuItem } from "./navigation.types";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// Example menu structure - this would be fetched from a CMS or other data source
const menuStructure: NavMenuItem[] = [
    {
        name: 'Quick Start from Template',
        href: '#',
        children: [
            {
                name: 'Deploy to Vercel',
                href: '#'
            },
            {
                name: 'Fork the Template',
                href: '#'
            },
        ]
    },
    {
        name: 'Start as New Project',
        href: '#',
        children: [
            {
                name: 'Install ',
                href: '#'
            },
            {
                name: 'Add Next.js Config',
                href: '#',
                isActive: true,
            },
            {
                name: 'Create Docs Theme Config',
                href: '#'
            },
            {
                name: 'Ready to Go!',
                href: '#'
            },
        ]
    },
];

const generateMenuItem = (item: NavMenuItem, intendation: number = 0) => {

    let children = null;

    if (item.children) {
        children = item.children.map((child) => {
            return generateMenuItem(child, intendation + 1);
        });
    }

    const semanticVariantPathPart = item.isActive ? 'active' : 'inactive';
    return (
        <Box
            display='block'
            key={item.name}
            py={1}
        >
            <Link 
                href={item.href}
                paddingLeft={intendation * 4}
                opacity={item.isActive ? 1 : 0.7}
                color={`rightNav.link.${semanticVariantPathPart}.color`}
                fontWeight={item.isActive ? 'semibold' : 'normal'}
                _hover={{
                    textDecoration: 'none',
                    opacity: 1
                }}
                transition='opacity 0.1s ease-in-out'
            >{item.name}</Link>
            {children}
        </Box>
    )
};

// Example links - these would be fetched from a CMS or other data source
const links = [
    {
        name: 'Question? Give us feedback',
        href: '#'
    },
    {
        name: 'Edit this page on GitHub',
        href: '#'
    },
];

// Memoize the links so they don't re-render on every page change
const MemoizedLinks = React.memo(() => {
    return (
        <>
        {
            links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        variant='right-bottom-nav'
                        w='100%'
                        display='block'
                    >{link.name} <ArrowForwardIcon /></Link>
                )
            })
        }
        </>
    )
}, () => false);

/**
 * Right navigation bar.
 */
const RightNav: FC = () => {
    return (
        <Box 
            as='aside'
            display={{ base: 'none', xl: 'block' }}
            color='text'
        >
            <Flex
                as='nav'
                direction='column'
                fontSize='sm'
            >
                {menuStructure.map((item) => generateMenuItem(item))}
            </Flex>
            <Box
                mt={7}
                pt={7}
                borderTop='1px solid'
                borderTopColor='gray.200'
                fontSize='xs'
            >
                <VStack rowGap={1} textAlign='left'>
                    <MemoizedLinks />
                </VStack>
            </Box>
        </Box>
    )
}

export default RightNav;