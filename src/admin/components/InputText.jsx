
export const InputText = ({ label, name, value, onChange}) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder='Título'
            />
            {/* <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Nombre de la receta"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
            /> */}
        </div>
    )
}