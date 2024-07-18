import React from 'react';

import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitHandler,
} from 'react-hook-form';
import { View } from 'react-native';

export type FormProps<TFieldValues extends FieldValues> = StrictUnion<
  | (FormProviderProps<TFieldValues> & {
      noHtmlForm?: false;
      onSubmit?: SubmitHandler<TFieldValues>;
    })
  | (FormProviderProps<TFieldValues> & {
      noHtmlForm: true;
    })
>;

export const Form = <TFieldValues extends FieldValues>({
  noHtmlForm = false,
  ...props
}: FormProps<TFieldValues>) => {
  // Dans React Native, nous n'utilisons pas de balise <form>, donc noHtmlForm n'a pas d'effet ici.
  return (
    <FormProvider {...props}>
      <View>{props.children}</View>
    </FormProvider>
  );
};

// Les exports restent les mêmes, en supposant que les composants importés sont adaptés à React Native.
export { FormField } from './FormField';
export { FormFieldItem } from './FormFieldItem';
