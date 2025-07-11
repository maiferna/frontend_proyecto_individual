
import { useState } from 'react';

export const FilterRecipes = ({ setCategory, category }) => {
    const categories = ['todas', 'ensaladas', 'legumbres', 'postre'];

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