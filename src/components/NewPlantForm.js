import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price, // string to satisfy test
    };

    // POST to backend → satisfies CreatePlant.test.js
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" }, // must match test capitalization
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((savedPlant) => onAddPlant(savedPlant));

    setFormData({ name: "", image: "", price: "" });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
