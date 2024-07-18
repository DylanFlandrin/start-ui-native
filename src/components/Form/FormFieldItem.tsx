import {
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from 'react';

import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { FormControl, FormControlProps } from '@/components/Form/FormControl';
import { useFormFieldContext } from '@/components/Form/FormField';

type FormItemContextValue = {
  id: string;
};
export const FormFieldItemContext = createContext<FormItemContextValue | null>(
  null
);
export const useFormFieldItemContext = () => {
  const ctx = useContext(FormFieldItemContext);
  if (!ctx) {
    throw new Error('Missing <FormFieldItem /> parent component');
  }
  return ctx;
};

export type FormFieldItemProps = {
  children?: ReactNode;
  id?: string;
  formControlProps?: FormControlProps;
};

export const FormFieldItem = forwardRef<View, FormFieldItemProps>(
  ({ ...props }, ref) => {
    const id = useId();
    const fieldContext = useFormFieldContext();
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    const contextValue = useMemo(() => ({ id }), [id]);

    return (
      <FormFieldItemContext.Provider value={contextValue}>
        <FormControl
          ref={ref}
          isInvalid={!!fieldState.error}
          isRequired={fieldContext.optionalityHint === 'required'}
          isDisabled={fieldContext.isDisabled}
          {...props.formControlProps}
        >
          {props.children}
        </FormControl>
      </FormFieldItemContext.Provider>
    );
  }
);
FormFieldItem.displayName = 'FormItem';
