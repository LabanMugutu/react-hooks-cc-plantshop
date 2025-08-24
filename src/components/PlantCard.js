import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;

  // Local state for sold out toggle → satisfies InStock.test.js
  const [inStock, setInStock] = useState(true);

  // Toggle sold out status
  function handleToggleStock() {
    setInStock(!inStock);
  }

  // Update plant price → advanced deliverable
  function handlePriceChange(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => onUpdatePlant(updatedPlant));
  }

  // Delete plant → advanced deliverable
  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" })
      .then(() => onDeletePlant(id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>

      {/* Sold out toggle button */}
      <button onClick={handleToggleStock} className="primary">
        {inStock ? "In Stock" : "Out of Stock"}
      </button>

      {/* Input to update price → advanced deliverable */}
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={handlePriceChange}
      />

      {/* Delete button → advanced deliverable */}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
