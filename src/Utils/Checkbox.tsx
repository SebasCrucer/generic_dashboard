import { useState } from 'react'
import './Checkbox.css'

export const Checkbox = (params: React.InputHTMLAttributes<HTMLInputElement>) => {
    const [checked, setChecked] = useState(params.checked || false)
    const handleClick = () => {
        setChecked(!checked)
    }
    return (
        <div className='Checkbox' onClick={handleClick}>
            <div className="checkbox-container">
                <input
                    {...params}
                    checked={checked}
                    type="checkbox"
                    className="custom-checkbox"
                />
                <label htmlFor="miCheckbox" />
            </div>
        </div>
    )
}
