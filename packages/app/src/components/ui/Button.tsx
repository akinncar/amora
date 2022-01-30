import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  readonly title: string;
  readonly onPress?: (event: GestureResponderEvent) => void;
};

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#000',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#FFF' }}>{title}</Text>
    </TouchableOpacity>
  );
}
