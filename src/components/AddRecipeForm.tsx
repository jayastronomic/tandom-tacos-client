import React, { Dispatch, FC, useReducer } from "react";
import { createRecipe } from "../network/Recipe";
import { useDispatch } from "react-redux";
import { createRecipeSuccess } from "../features/recipes/recipesSlice";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "recipeName":
      return { ...state, [action.key]: action.value };
    case "ingredientName":
      return { ...state, [action.key]: action.value };
    case "quantity":
      return { ...state, [action.key]: action.value };
    case "preparation":
      return { ...state, [action.key]: action.value };
    case "directions":
      return { ...state, [action.key]: action.value };
    case "vegan":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "vegetarian":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "halal":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "dairy-free":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "nut-free":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "kosher":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "gluten-free":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    default:
      return state;
  }
}

const initialState = {
  recipeName: "",
  ingredientName: "",
  quantity: "",
  preparation: "",
  directions: "",
  restrictions: {
    vegan: false,
    vegetarian: false,
    halal: false,
    ["dairy-free"]: false,
    ["nut-free"]: false,
    kosher: false,
    ["gluten-free"]: false,
  },
};

type AddRecipeFormProps = {
  setShow: Dispatch<boolean>;
};

const AddRecipeForm = ({ setShow }: AddRecipeFormProps): JSX.Element => {
  const [state, localDispatch]: any = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    localDispatch({
      type: e.target.name,
      key: e.target.name,
      value: e.target.value,
      checked: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const restrictions = Object.keys(state.restrictions).filter(
      (key) => state.restrictions[key] === true
    );

    const directions = state.directions.split(". ");

    const payload = {
      recipe: {
        name: state.recipeName,
        directions: directions,
        restrictions: restrictions,
        ingredients: [
          {
            name: state.ingredientName,
            quantity: state.quantity,
            preparation: state.preparation,
          },
        ],
      },
    };

    const createdRecipe = await createRecipe(payload).catch(console.error);
    dispatch(createRecipeSuccess(createdRecipe));
    setShow(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col absolute bg-white h-[40rem] w-[28rem] rounded p-4 overflow-auto"
    >
      <p>Add Recipe</p>
      <input
        name="recipeName"
        value={state.recipeName}
        type="text"
        placeholder="Name of recipe..."
        onChange={handleChange}
      />
      <p>restrictions</p>
      <div className="grid grid-cols-3">
        <label>
          vegan
          <input
            type="checkbox"
            value="vegan"
            name="vegan"
            onChange={handleChange}
            checked={state.vegan}
          />
        </label>
        <label>
          vegetarian
          <input
            type="checkbox"
            value="vegetarian"
            name="vegetarian"
            onChange={handleChange}
            checked={state.vegetarian}
          />
        </label>
        <label>
          halal
          <input
            type="checkbox"
            value="halal"
            name="halal"
            onChange={handleChange}
            checked={state.halal}
          />
        </label>
        <label>
          dairy-free
          <input
            type="checkbox"
            value="dairy-free"
            name="dairy-free"
            onChange={handleChange}
            checked={state["dairy-free"]}
          />
        </label>
        <label>
          nut-free
          <input
            type="checkbox"
            value="nut-free"
            name="nut-free"
            onChange={handleChange}
            checked={state["nut-free"]}
          />
        </label>
        <label>
          kosher
          <input
            type="checkbox"
            value="kosher"
            name="kosher"
            onChange={handleChange}
            checked={state.kosher}
          />
        </label>
        <label>
          gluten-free
          <input
            type="checkbox"
            value="gluten-free"
            name="gluten-free"
            onChange={handleChange}
            checked={state["gluten-free"]}
          />
        </label>
      </div>
      <p>ingredients</p>
      <div className="border h-[10rem]">
        <div className="flex overflow-auto">
          <input
            name="ingredientName"
            value={state.ingredientName}
            type="text"
            placeholder="Ingredient name..."
            onChange={handleChange}
          />
          <input
            name="quantity"
            type="text"
            placeholder="Quantity..."
            onChange={handleChange}
            value={state.quantity}
          />
          <input
            name="preparation"
            value={state.preparation}
            type="text"
            placeholder="Preparation..."
            onChange={handleChange}
          />
        </div>
      </div>
      <p>directions</p>
      <textarea
        className="border"
        name="directions"
        value={state.directions}
        placeholder="How do you make it?..."
        onChange={handleChange}
      />
      <button className="bg-gray-300" type="submit">
        Add recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
