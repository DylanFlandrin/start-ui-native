import React, { ReactNode, createContext, useContext } from 'react';

import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface FormControlContextProps {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const FormControlContext = createContext<FormControlContextProps | undefined>(
  undefined
);

const useFormControlContext = () => {
  const context = useContext(FormControlContext);
  if (!context) {
    throw new Error('useFormControlContext must be used within a FormControl');
  }
  return context;
};

export interface FormControlProps extends FormControlContextProps {
  children: ReactNode;
  ref?: React.ForwardedRef<View>;
  style?: ViewStyle;
}

export const FormControl: React.FC<FormControlProps> = ({
  isInvalid,
  isRequired,
  isDisabled,
  children,
  ref,
  style,
}) => {
  const value = { isInvalid, isRequired, isDisabled };

  return (
    <FormControlContext.Provider value={value}>
      <View ref={ref} style={[styles.container, style]}>
        {children}
      </View>
    </FormControlContext.Provider>
  );
};

interface FormLabelProps {
  children: ReactNode;
  style?: TextStyle;
}

export const FormLabel: React.FC<FormLabelProps> = ({ children, style }) => {
  const { isRequired } = useFormControlContext();
  return (
    <Text style={[styles.label, style]}>
      {children}
      {isRequired && <Text style={styles.asterisk}>*</Text>}
    </Text>
  );
};

interface FormHelperTextProps {
  children: ReactNode;
  style?: TextStyle;
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  style,
}) => <Text style={[styles.helperText, style]}>{children}</Text>;

interface FormErrorMessageProps {
  children: ReactNode;
  style?: TextStyle;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  style,
}) => {
  const { isInvalid } = useFormControlContext();
  if (!isInvalid) return null;
  return <Text style={[styles.errorMessage, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  asterisk: {
    color: 'red',
  },
  helperText: {
    fontSize: 14,
    color: 'gray',
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
  },
});
