import React from 'react';

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="col-sm-8">
      <div>
        <input {...input} className="form-control" placeholder={label} type={type} />
        {touched && ((error && <span style={{ color: "red" }}>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

export const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <div>
        <select className="form-control" {...input}>
          {children}
        </select>
        {touched && error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </div>
  )
  
export const RadioGroup = ({ input, label, meta: { touched, error }, options }) => {
    return (
      <div className="col-sm-8">
        {options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}&nbsp;&nbsp;</label>)}<br />
        {touched && !input.value && <span style={{ color: "red" }}>{'Select Option'}</span>}
      </div>
    )
  }