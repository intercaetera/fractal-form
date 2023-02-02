import { useState } from "react"
import { useFractalForm, useLensField } from "./lib"

export const Basic = () => {
  const [submittedValues, setSubmittedValues] = useState({})
  const {useFormLens, value} = useFractalForm({})
  const [nameField] = useLensField(useFormLens, 'name')

  const submitForm = () => setSubmittedValues(value)
  
  return (
    <div>
      <label>Name:
        <input {...nameField} />
      </label>

      <button onClick={submitForm}>Submit form</button>

      <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
    </div>
  )
}
