import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type TextInputProps = {
  readonly label?: string;
  readonly style?: StyleProp<ViewStyle>;
} & RNTextInputProps;

export function TextInput({ label, style, ...props }: TextInputProps) {
  return (
    <View style={style}>
      {label && <Text style={{ paddingBottom: 6 }}>{label}</Text>}
      <View
        style={{
          borderWidth: 1,
          borderRadius: 4,
          padding: 10,
          backgroundColor: '#FFF',
        }}
      >
        <RNTextInput {...props} />
      </View>
    </View>
  );
}
