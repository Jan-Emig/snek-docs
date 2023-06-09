import { Flex, Spacer } from '@chakra-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useNavOffset } from '../../hooks/use-nav-offset';
import MainBottomNav from './MainBottomNav';
import NavbarControls from './components/NavbarControls';

export interface ILeftNavProps {
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
  hideControls?: boolean;
  children?: ReactNode;
}

/**
 * Left navigation bar.
 */
const LeftNav: FC<ILeftNavProps> = ({
  isExpanded,
  setIsExpanded,
  hideControls,
  children
}) => {
  const navTopOffset = useNavOffset();
  return (
    <Flex
      position="sticky"
      top={`calc(70px + ${navTopOffset})`}
      as="nav"
      fontSize="sm"
      flexDirection="column"
      h={`calc(100vh - 100px - ${navTopOffset})`}
      w={isExpanded ? 'auto' : '5rem'}
      color="shared.text.default"
    >
      {children}
      <Spacer />
      {!hideControls && (
        <NavbarControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      )}
    </Flex>
  );
};

export default LeftNav;
