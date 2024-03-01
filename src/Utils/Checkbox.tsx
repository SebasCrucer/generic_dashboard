import './Checkbox.css'

export const Checkbox = (params: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className='Checkbox'>
            <div className="checkbox-container">
                <input
                    {...params}
                    type="checkbox"
                    className="custom-checkbox"
                />
                <label htmlFor="miCheckbox" />
            </div>
        </div>
    )
}
