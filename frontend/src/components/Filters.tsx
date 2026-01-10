import React from "react";

interface FiltersProps {
  selectedRestaurant: string | null;
  setSelectedRestaurant: (val: string | null) => void;
  selectedCuisine: string | null;
  setSelectedCuisine: (val: string | null) => void;
  selectedDay: string | null;
  setSelectedDay: (val: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedRestaurant, setSelectedRestaurant,
  selectedCuisine, setSelectedCuisine,
  selectedDay, setSelectedDay
}) => {
  return (
    <div className="flex space-x-4">
      <select value={selectedRestaurant ?? ""} onChange={(e) => setSelectedRestaurant(e.target.value || null)}>
        <option value="">All Restaurants</option>
        <option value="R1">Restaurant 1</option>
        <option value="R2">Restaurant 2</option>
      </select>

      <select value={selectedCuisine ?? ""} onChange={(e) => setSelectedCuisine(e.target.value || null)}>
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Chinese">Chinese</option>
      </select>

      <select value={selectedDay ?? ""} onChange={(e) => setSelectedDay(e.target.value || null)}>
        <option value="">Any Day</option>
        <option value="Monday">Monday</option>
        <option value="Weekend">Weekend</option>
      </select>
    </div>
  );
};

export default Filters;
