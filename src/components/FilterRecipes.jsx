
export const FilterRecipes = ({setCategory, category}) => {
    const categories = ['todas', 'ensaladas', 'legumbres', 'otros'];

    const handleChange = (ev) => {
        setCategory(ev.target.value);
    }

    return (
        <section>
            <select className="form-select" value={category} onChange={handleChange}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </section>
    )
}
