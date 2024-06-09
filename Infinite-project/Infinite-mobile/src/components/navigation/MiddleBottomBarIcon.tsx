import {useTheme, Box, Badge} from 'native-base';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface MiddleBottomBarIconProps {
  focused: boolean;
}

export const MiddleBottomBarIcon: FC<MiddleBottomBarIconProps> = ({
  focused,
}) => {
  const {colors} = useTheme();
  return (
    <Box>
      <Badge // bg="red.400"
        colorScheme="danger"
        rounded="full"
        mb={-4}
        mr={-4}
        zIndex={1}
        variant="solid"
        alignSelf="flex-end"
        _text={{
          fontSize: 'xs',
        }}>
        0
      </Badge>
      <Feather name={'shopping-bag'} size={24} color={colors.primary['500']} />
    </Box>
  );
};
