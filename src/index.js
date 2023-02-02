import React from 'react'
import ReactDOM from 'react-dom/client'
import {Basic} from './Basic'

import { Example } from './Example'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Basic />
		<Example />
	</React.StrictMode>
)
