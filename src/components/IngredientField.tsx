type IngredientFieldProps = {
  state: {
    name: string;
    quantity: string;
    preparation: string;
  };
  handleIngredients: any;
  position: number;
};

const IngredientField = ({
  state,
  handleIngredients,
  position,
}: IngredientFieldProps) => {
  return (
    <div className="flex flex-wrap mt-2 border p-4 justify-between border-gray-200">
      <p>Ingredient {position + 1}</p>
      <input
        className="block border focus:outline-none focus:ring-2 focus:bg-blue-50 rounded px-1 text-sm"
        name="name"
        value={state.name}
        type="text"
        placeholder="Ingredient name..."
        onChange={(e) => handleIngredients(e)}
      />
      <input
        className="block border focus:outline-none focus:ring-2 focus:bg-blue-50 mt-2 rounded px-1 text-sm"
        name="quantity"
        type="text"
        placeholder="Quantity..."
        onChange={(e) => handleIngredients(e)}
        value={state.quantity}
      />
      <input
        className="block border focus:outline-none focus:ring-2 focus:bg-blue-50 mt-2 rounded px-1 text-sm"
        name="preparation"
        value={state.preparation}
        type="text"
        placeholder="Preparation..."
        onChange={(e) => handleIngredients(e)}
      />
    </div>
  );
};

export default IngredientField;
