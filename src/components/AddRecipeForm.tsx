import React, { Dispatch, useReducer } from "react";
import { createRecipe } from "../network/Recipe";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { createRecipeSuccess } from "../features/recipes/recipesSlice";
import IngredientField from "./IngredientField";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "name":
      return { ...state, [action.key]: action.value };
    case "directions":
      return { ...state, [action.key]: action.value };
    case "INGREDIENT_FIELDS":
      const ingredients = [...state.ingredientList];
      ingredients[action.index][action.name] = action.value;
      return { ...state, ingredientList: ingredients };
    case "ADD_INGREDIENT_FIELD":
      return {
        ...state,
        ingredientList: [...state.ingredientList, action.payload],
      };
    case "TOGGLE_RESTRICTIONS":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    default:
      return state;
  }
}

const initialState = {
  name: "",
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
  ingredientList: [{ name: "", quantity: "", preparation: "" }],
};

type AddRecipeFormProps = {
  setShow: Dispatch<boolean>;
};

const AddRecipeForm = ({ setShow }: AddRecipeFormProps): JSX.Element => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  console.log(state);

  const handleChange = (e: any): void => {
    localDispatch({
      type: e.target.name,
      key: e.target.name,
      value: e.target.value,
      checked: e.target.checked,
    });
  };

  const handleIngredients = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    localDispatch({
      type: "INGREDIENT_FIELDS",
      value: e.target.value,
      name: e.target.name,
      index: index,
    });
  };

  const handleRestrictions = (e: React.ChangeEvent<HTMLInputElement>): void => {
    localDispatch({
      type: "TOGGLE_RESTRICTIONS",
      key: e.target.name,
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
        name: state.name,
        directions: directions,
        restrictions: restrictions,
        ingredients: state.ingredientList,
        user_id: user.id,
      },
    };

    const createdRecipe = await createRecipe(payload).catch(console.error);
    dispatch(createRecipeSuccess(createdRecipe));
    setShow(false);
  };

  const handleAddIngredientField = (): void => {
    localDispatch({
      type: "ADD_INGREDIENT_FIELD",
      payload: {
        name: "",
        quantity: "",
        preparation: "",
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col absolute bg-white h-[40rem] w-[28rem] rounded-2xl p-4 overflow-auto"
    >
      <p className="text-2xl border-b border-gray-500 font-bold">Add Recipe</p>
      <input
        className="border mt-4 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:bg-blue-50"
        name="name"
        value={state.name}
        type="text"
        placeholder="Name of recipe..."
        onChange={(e) => handleChange(e)}
      />
      <p className="text-xl font-semibold text-gray-800 pt-4">Restrictions</p>
      <div className="grid grid-cols-3 border rounded p-4 text-gray-600">
        <label className="space-x-2">
          <span>vegan</span>
          <input
            type="checkbox"
            value="vegan"
            name="vegan"
            onChange={handleRestrictions}
            checked={state.vegan}
          />
        </label>
        <label className="space-x-2">
          <span>vegetarian</span>
          <input
            type="checkbox"
            value="vegetarian"
            name="vegetarian"
            onChange={handleRestrictions}
            checked={state.vegetarian}
          />
        </label>
        <label className="space-x-2">
          <span>halal</span>
          <input
            type="checkbox"
            value="halal"
            name="halal"
            onChange={handleRestrictions}
            checked={state.halal}
          />
        </label>
        <label className="space-x-2">
          <span>dairy-free</span>
          <input
            type="checkbox"
            value="dairy-free"
            name="dairy-free"
            onChange={handleRestrictions}
            checked={state["dairy-free"]}
          />
        </label>
        <label className="space-x-2">
          <span>nut-free</span>
          <input
            type="checkbox"
            value="nut-free"
            name="nut-free"
            onChange={handleRestrictions}
            checked={state["nut-free"]}
          />
        </label>
        <label className="space-x-2">
          <span>kosher</span>
          <input
            type="checkbox"
            value="kosher"
            name="kosher"
            onChange={handleRestrictions}
            checked={state.kosher}
          />
        </label>
        <label className="space-x-2">
          <span>gluten-free</span>
          <input
            type="checkbox"
            value="gluten-free"
            name="gluten-free"
            onChange={handleRestrictions}
            checked={state["gluten-free"]}
          />
        </label>
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-semibold">Ingredients</p>
        <button
          type="button"
          onClick={() => handleAddIngredientField()}
          className="rounded-xl bg-blue-500 text-white font-semibold self-end text-sm px-2 py-1"
        >
          + add ingredient
        </button>
      </div>

      <div className="h-auto">
        {state.ingredientList.map((ingredientObj: any, index: number) => {
          return (
            <IngredientField
              key={index}
              position={index}
              state={ingredientObj}
              handleIngredients={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleIngredients(e, index)
              }
            />
          );
        })}
      </div>
      <div className="h-auto">
        <p className="pt-4 text-xl font-semibold text-gray-700">Directions</p>
        <textarea
          className="border resize-none w-full h-72 rounded p-2 focus:outline-none focus:ring-2 focus:bg-blue-50"
          name="directions"
          value={state.directions}
          placeholder="How do you make it?..."
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        className="bg-blue-400 text-white p-2 rounded hover:bg-blue-500 transition"
        type="submit"
      >
        Add recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
