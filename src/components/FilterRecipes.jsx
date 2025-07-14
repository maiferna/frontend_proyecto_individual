
/**
 * Componente para filtrar recetas por su categoría.
 */
export const FilterRecipes = ({ setCategory, category }) => {
    const categories = ['todas', 'ensaladas', 'legumbres', 'postres', 'vegano', 'vegetariano', 'pastas', 'carne', 'pescado', 'arroz', 'entrantes', 'otros'];

    const handleChange = (ev) => {
        setCategory(ev.target.value);
    }

    return (
        <section className="p-4">
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