import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  readonly title: string;
  readonly onPress?: (event: GestureResponderEvent) => void;
  readonly style?: StyleProp<ViewStyle>;
};

export function Button({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#000',
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={{ color: '#FFF', padding: 8 }}>{title}</Text>
    </TouchableOpacity>
  );
}
