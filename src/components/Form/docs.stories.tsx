import { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, TextInput, View } from 'react-native';

import { FieldCodeInput } from '@/components/FieldCodeInput';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@/components/Form/FormControl';

const Template = (args: ExplicitAny) => {
  return (
    <View style={styles.form}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <TextInput style={styles.input} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl isInvalid>
        <FormLabel>Password</FormLabel>
        <TextInput style={styles.input} secureTextEntry />
        <FormErrorMessage>Password is required.</FormErrorMessage>
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default {
  title: 'Form/FormControl',
  component: Template,
} as Meta<typeof FormControl>;
