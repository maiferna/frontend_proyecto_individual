

export const CheckboxGroup = ({ label, name, options, selected = [], onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      <div className="d-flex flex-wrap gap-2">
        {options.map((option) => (
          <div className="mb-1" key={option}>
            <input
              className="btn-check"
              type="checkbox"
              name={name} // ✅ para que e.target.name funcione
              value={option}
              id={`${name}-${option}`}
              checked={selected.includes(option)}
              onChange={onChange} // ✅ pasamos el evento como está
            />
            <label className="btn btn-outline-dark" htmlFor={`${name}-${option}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

