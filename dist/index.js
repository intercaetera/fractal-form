import { useMemo, useCallback, useState } from "react";
export const lensForProp = prop => [whole => whole[prop], (whole, part) => ({
  ...whole,
  [prop]: part
})];
const newLens = (state, setState) => {
  const useLens = (view, update) => {
    const setInnerState = newPartOrUpdate => {
      setState(prevState => {
        const prevPart = view(prevState);
        const newPart = typeof newPartOrUpdate === 'function' ? newPartOrUpdate(prevPart) : newPartOrUpdate;
        if (newPart === prevPart) return prevState;
        return update(prevState, newPart);
      });
    };
    const innerState = view(state);
    const innerLens = useMemoizedLens(innerState, setInnerState);
    return innerLens;
  };
  return [state, setState, useLens];
};
const useMemoizedLens = (state, setState) => useMemo(() => newLens(state, setState), [state]);
export const useLensState = initialState => {
  const [state, setState] = useState(initialState);
  const lens = useMemoizedLens(state, setState);
  return lens;
};
export const useLensForm = initialValues => {
  const initialState = {
    value: initialValues,
    error: {},
    touched: {}
  };
  const [form, setForm, useFormLens] = useLensState(initialState);
  const [value, setValues, useValuesLens] = useFormLens(...lensForProp('value'));
  const [error, setErrors, useErrorsLens] = useFormLens(...lensForProp('error'));
  const [touched, setTouched, useTouchedLens] = useFormLens(...lensForProp('touched'));
  return {
    form,
    value,
    error,
    touched,
    setForm,
    setValues,
    setErrors,
    setTouched,
    useFormLens,
    useValuesLens,
    useErrorsLens,
    useTouchedLens
  };
};
export const useLensField = (useLens, fieldName, validate = () => null) => {
  const [{
    value,
    error,
    touched
  }, setField, useFieldLens] = useLens(form => ({
    value: form.value?.[fieldName],
    error: form.error?.[fieldName],
    touched: form.touched?.[fieldName]
  }), (form, {
    value,
    error,
    touched
  }) => ({
    value: {
      ...form.value,
      [fieldName]: value
    },
    error: {
      ...form.error,
      [fieldName]: error
    },
    touched: {
      ...form.touched,
      [fieldName]: touched
    }
  }));
  const onChange = useCallback(event => {
    setField({
      value: event.target.value,
      error: validate(value, event.target.value),
      touched
    });
  }, [touched]);
  const onBlur = useCallback(() => setField({
    value,
    error,
    touched: true
  }), [error, value]);
  const field = {
    onChange,
    onBlur,
    value,
    error,
    touched
  };
  return [field, setField, useFieldLens];
};