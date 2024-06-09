import {useTheme, Box} from 'native-base';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface BottomTabBarIconProps {
  icon: string;
  focused: boolean;
}

export const BottomTabBarIcon: FC<BottomTabBarIconProps> = ({
  icon,
  focused,
}) => {
  const {colors} = useTheme();
  return (
    <Box>
      <Feather
        name={icon}
        size={24}
        color={focused ? colors.primary['500'] : 'gray'}
      />
    </Box>
  );
};
