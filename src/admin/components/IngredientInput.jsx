import { useState } from "react";

export const IngredientInput = ({ ingredients, addIngredient, removeIngredient }) => {
  const [inputName, setInputName] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputName && inputQuantity) {
      addIngredient({ name: inputName, quantity: inputQuantity });
      setInputName('');
      setInputQuantity('');
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Ingredientes</label>
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Cantidad"
          value={inputQuantity}
          onChange={(e) => setInputQuantity(e.target.value)}
        />
        <button onClick={handleAdd} className="btn btn-green">
          +
        </button>
      </div>

      <div>
        {ingredients.map(({ name, quantity }) => (
          <span key={name} className="badge bg-secondary me-2 p-2 d-inline-flex align-items-center">
            {name} - {quantity}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              aria-label="Eliminar"
              onClick={() => removeIngredient(name)}
            ></button>
          </span>
        ))}
      </div>
    </div>
  );
};