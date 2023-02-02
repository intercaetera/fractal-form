import { memo, useState } from "react"
import { useFractalForm, useLensField } from "./lib"

const Input = memo(({ label, value, onChange }) => (
  <label>{label}:
    <input value={value} onChange={onChange} />
  </label>
))

export const Basic = () => {
  const [submittedValues, setSubmittedValues] = useState({})
  const {useFormLens, value} = useFractalForm({ name: '' })
  const [nameField] = useLensField(useFormLens, 'name')

  const submitForm = () => setSubmittedValues(value)
  
  return (
    <div>
      <Input label="Name" {...nameField} />
      <button onClick={submitForm}>Submit form</button>
      <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
    </div>
  )
}
