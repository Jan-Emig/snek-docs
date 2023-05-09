import { Center, Flex, Img, Spacer, Link, HStack, Input, InputGroup, InputRightElement, Kbd } from '@chakra-ui/react';
import React, { FC } from 'react';

const navLinkProps = {
    color: 'gray.800',
    opacity: 0.8,
    _hover: {
        textDecoration: 'none',
        opacity: 1
    },
    fontSize: 'sm',
}

const mobileProps = {
    display: { base: 'none', lg: 'initial' },
}

/**
 * Top navigation bar.
 */
const TopNav: FC = () => {
    return (
        <Center
            as='nav'
            position='sticky'
            top={0}
            h='64px'
            px={{ base: 5, xl: 0 }}
            borderBottom='1px solid'
            borderBottomColor='rgb(229, 231, 235)'
            backgroundColor='rgba(255, 255, 255, 0.8)'
            backdropFilter={'blur(5px)'}
            zIndex={999}
        >
            <Flex w='7xl'>
                <Link
                    href='#'
                    _hover={{
                        transform: 'scale(1.1)'
                    }}
                    transition='transform 0.2s ease-in-out'
                >
                    <Img
                        h='32px'
                        src='https://avatars.githubusercontent.com/u/55870326?s=200&v=4'
                        alt='Snek Logo'
                    />
                </Link>
                <Spacer />
                <Center>
                    <HStack spacing={4}>
                        <Link
                            href='#'
                            {...navLinkProps}
                            {...mobileProps}
                        >About</Link>
                        <Link
                            href='#'
                            isExternal
                            {...navLinkProps}
                            {...mobileProps}
                        >Contact</Link>
                        <InputGroup
                            size='sm'
                            {...mobileProps}
                        >
                            <Input
                                htmlSize={20}
                                placeholder='Search documentation'
                                borderRadius='md'
                                backgroundColor='blackAlpha.50'
                                pr='45px'
                                _focus={{
                                    backgroundColor: 'white',
                                }}
                            />
                            <InputRightElement
                                children={
                                    <Kbd
                                        borderBottomWidth={1}
                                        background='transparent'
                                        borderRadius={4}
                                        py={0.5}
                                    >⌘ K</Kbd>
                                }
                                pr='10px' 
                                color='rgb(107, 114, 128)'
                            />
                        </InputGroup>
                        <Link 
                            display='inline-block'
                            href='https://github.com/Jan-Emig/snek-docs'
                            // This doesnt work for some reason (min-width solves it temporarily)
                            boxSize='32px'
                            minW='32px'
                            _hover={{
                                transform: 'scale(1.2)'
                            }}
                            transition='transform 0.2s ease-in-out'
                        >
                            <Img
                                boxSize='32px'
                                src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                                alt='GitHub Logo'
                            />
                        </Link>
                    </HStack>
                </Center>
            </Flex>
        </Center>
    )
}

export default TopNav;