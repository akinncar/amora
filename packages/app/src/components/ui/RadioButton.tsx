import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type RadioButtonProps = {
  readonly checked: boolean;
  readonly label: string;
  readonly onPress?: (event: GestureResponderEvent) => void;
  readonly style?: StyleProp<ViewStyle>;
};

export function RadioButton({
  checked,
  label,
  onPress,
  style,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 4,
          flexDirection: 'row',
        },
        style,
      ]}
      onPress={onPress}
    >
      <View style={{ width: 18, height: 18, borderRadius: 18, borderWidth: 2 }}>
        <View
          style={{
            backgroundColor: checked ? '#000' : '#FFF',
            width: '100%',
            height: '100%',
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#FFF',
          }}
        />
      </View>
      <Text
        style={{
          color: '#000',
          paddingLeft: 8,
          textAlign: 'center',
          alignSelf: 'center',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
