import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // State for all plants and the search term
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all plants on component mount → satisfies AllPlants.test.js
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  // Add a new plant → satisfies CreatePlant.test.js
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Update plant (price change) → advanced deliverable
  function handleUpdatePlant(updatedPlant) {
    setPlants(plants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
  }

  // Delete plant → advanced deliverable
  function handleDeletePlant(id) {
    setPlants(plants.filter((p) => p.id !== id));
  }

  // Filter plants by search term → satisfies SearchPlants.test.js
  const visiblePlants = plants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList
        plants={visiblePlants}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
