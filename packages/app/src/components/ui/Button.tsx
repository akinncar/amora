import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  readonly title: string;
  readonly onPress?: (event: GestureResponderEvent) => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly isLoading?: boolean;
};

export function Button({
  title,
  onPress,
  style,
  isLoading = false,
}: ButtonProps) {
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
      {isLoading ? (
        <ActivityIndicator color="#FFF" size={16} style={{ padding: 8 }} />
      ) : (
        <Text style={{ color: '#FFF', padding: 8 }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
