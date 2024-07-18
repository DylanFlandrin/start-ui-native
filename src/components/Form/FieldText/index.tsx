import { ReactNode } from 'react';

import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { InputProps } from 'react-native-ficus-ui';

import { FieldCommonProps } from '@/components/Form/FormField';

export type FieldTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: 'text' | 'email' | 'number' | 'tel';
  label?: ReactNode;
  helper?: ReactNode;
  startElement?: ReactNode;
  endElement?: ReactNode;
} & Pick<InputProps, 'placeholder' | 'autoFocus'> &
  FieldCommonProps<TFieldValues, TName>;

export const FieldText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldTextProps<TFieldValues, TName>
) => (
  <Controller {...props} render={({ field }) => <View>{field.value}</View>} />
);
