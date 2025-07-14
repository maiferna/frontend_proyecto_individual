import React from 'react'

export const SelectInput = ({ label, name, options, value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className="form-select"
        id={name}
        name={name}
        value={value}
        onChange={onChange} // 👈 pasa el evento directamente
      >
        <option value="">Selecciona una opción</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};


