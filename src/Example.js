import { memo } from 'react'
import { useFractalForm, useLensField } from './lib';

const initialValues = {
  name: 'b',
  address: {
    street: 'Main Street',
    number: 255
  } 
}

const Input = memo(({ label, value, error, touched, ...rest }) => (
  <label>{label}:
    <input value={value} {...rest} />
    {touched && <span style={{ color: 'red' }}>{error}</span>}
  </label>
))

const nameValidate = (_, name) => name.length < 5 ? 'name is too short' : null
const streetValidate = (_, street) => street.includes('Street') ? null : 'street must include the word "Street"'
const numberValidate = (_, number) => isNaN(Number(number)) ? 'number isnt a number' : null

export const Example = () => {
  const {useFormLens, error, value, touched} = useFractalForm(initialValues)

  const [nameField] = useLensField(useFormLens, 'name', nameValidate)
  const [_addressField, _setAddress, useAddressLens] = useLensField(useFormLens, 'address')

  return (
    <div className="App">
      <h2>User</h2>

      <Input label="Name" {...nameField} />

      <AddressForm useAddressLens={useAddressLens} />

      <div>
        <pre style={{ textAlign: 'left' }}>{JSON.stringify(value, null, 2)}</pre>
      </div>

      <div>
        <pre style={{ textAlign: 'left', color: '#ff9999' }}>{JSON.stringify(error, null, 2)}</pre>
      </div>

      <div>
        <pre style={{ textAlign: 'left', color: 'gray' }}>{JSON.stringify(touched, null, 2)}</pre>
      </div>
    </div>
  );
}

const AddressForm = memo(({ useAddressLens })  => {
  const [streetField] = useLensField(useAddressLens, 'street', streetValidate)
  const [numberField] = useLensField(useAddressLens, 'number', numberValidate)

  return (
    <>
      <h2>Address</h2>
      <Input label="Street" {...streetField} />
      <Input label="Number" {...numberField} />
    </>
  )
})
