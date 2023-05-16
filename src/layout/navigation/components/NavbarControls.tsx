import { SunIcon, MoonIcon, CheckIcon } from "@chakra-ui/icons";
import { useColorMode, Flex, Menu, MenuButton, Button, Icon, MenuList, IconButton, ColorMode, MenuItem, FlexProps } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import HideSidebarIcon from "../../../components/icons/HideSidebar";
import React from "react";

interface NavbarControlsProps {
    isMobile?: boolean;
    isExpanded?: boolean;
    setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}
/**
 * The navbar controls including the expand/collapse and color mode toggle button.
 */
const NavbarControls: FC<NavbarControlsProps> = ({ isMobile = false, isExpanded, setIsExpanded }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const conditional_props: FlexProps = {};
    if (isMobile) {
        isExpanded = true;
        conditional_props.position = 'absolute'
        conditional_props.bottom = 0;
        conditional_props.bgColor = 'drawer.bgColor';
        conditional_props.w = 'calc(100% - 3rem)';
    }

    const isLightColorMode = colorMode === 'light';
    return (
        <Flex
            w='100%'
            borderTop={isExpanded ? '1px solid' : undefined }
            borderTopColor='gray.200'
            py={5}
            gap={3}
            flexDir={isExpanded ? 'row' : 'column'}
            alignItems='center'
            {...conditional_props}
        >
            <Menu 
                placement='top'
                variant='brand-hover'
                isLazy
                matchWidth={isMobile}
            >
                <MenuButton
                    as={Button}
                    size='sm'
                    flexGrow={1}
                    variant='ghost'
                    textAlign='left'
                >
                    <Icon as={isLightColorMode ? SunIcon : MoonIcon} mr={isExpanded ? 2 : 0} />
                { 
                    isExpanded && (isLightColorMode ? 'Light' : 'Dark') 
                }
                </MenuButton>
                <MenuList>
                    <MemoizedColorModeMenuItems
                        currentColorMode={colorMode}
                        toggleColorMode={toggleColorMode}
                    />
                </MenuList>
            </Menu>
            {
                !isMobile && setIsExpanded && (
                    <IconButton
                        icon={
                            <HideSidebarIcon
                                transform={!isExpanded ? 'rotate(180deg)' : undefined} 
                                transition='transform 0.2s ease-in-out'
                            />
                        }
                        aria-label={`${isExpanded ? 'Close' : 'Open'}`}
                        size='sm'
                        variant='ghost'
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                )
            }
        </Flex>
    )
}

/**
 * Memoized color mode menu items.
 */
const colorModes = ['Light', 'Dark', 'System'];
//TODO: Fix system color mode toggle (doesnt work - doesnt stay in sync with system)
const MemoizedColorModeMenuItems = React.memo<{currentColorMode: ColorMode, toggleColorMode: () => void }>(({ currentColorMode, toggleColorMode }) => {
    return (
        <>
            {
                colorModes.map((mode, i) => {
                    const isCurrentColorMode = currentColorMode === mode.toLocaleLowerCase();
                    return (
                        <MenuItem
                            key={i}
                            position='relative'
                            disabled={isCurrentColorMode}
                            onClick={!isCurrentColorMode && mode !== 'System' ? toggleColorMode : undefined}
                        >
                            { mode }
                            { 
                                isCurrentColorMode && (
                                    <CheckIcon
                                        position='absolute'
                                        right={3}
                                        top='50%'
                                        transform='translateY(-50%)'
                                        boxSize='10px'
                                    /> 
                                )
                            }
                        </MenuItem>
                    )
                })
            }
        </>
    )
}, (prevProps, nextProps) => prevProps.currentColorMode === nextProps.currentColorMode);


export default NavbarControls;