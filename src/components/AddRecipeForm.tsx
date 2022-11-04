import React, { Dispatch, useReducer, useRef } from "react";
import { createRecipe } from "../network/Recipe";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { createRecipeSuccess } from "../features/recipes/recipesSlice";
import IngredientField from "./IngredientField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
    case "REMOVE_INGREDIENT_FIELD":
      let newIngredientList = [...state.ingredientList];
      newIngredientList.splice(newIngredientList.length - 1);
      return {
        ...state,
        ingredientList: newIngredientList,
      };
    case "TOGGLE_RESTRICTIONS":
      return {
        ...state,
        restrictions: { ...state.restrictions, [action.key]: action.checked },
      };
    case "ADD_PHOTO":
      return {
        ...state,
        avatar: action.photo,
      };
    case "SET_IMAGE_URL":
      return {
        ...state,
        imageURL: action.imageURL,
        hidden: true,
      };
    case "REMOVE_IMAGE_URL":
      return {
        ...state,
        imageURL: "",
        hidden: false,
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
  avatar: null,
  imageURL: "",
  hidden: false,
};

type AddRecipeFormProps = {
  setShow: Dispatch<boolean>;
};

const AddRecipeForm = ({ setShow }: AddRecipeFormProps): JSX.Element => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const fileInput = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();

    const restrictions: any = Object.keys(state.restrictions).filter(
      (key) => state.restrictions[key] === true
    );

    const directions = state.directions.split(". ");

    let formData = new FormData();
    if (!!state.avatar) {
      formData.append("recipe[image]", state.avatar);
    }
    formData.append("recipe[name]", state.name);
    formData.append("recipe[user_id]", user.id.toString());
    directions.forEach((direction: any) =>
      formData.append("recipe[directions][]", direction)
    );
    restrictions.forEach((restriction: any) =>
      formData.append("recipe[restrictions][]", restriction)
    );
    state.ingredientList.forEach((ingredient: any) =>
      formData.append("ingredients[]", JSON.stringify(ingredient))
    );

    const createdRecipe = await createRecipe(formData).catch(console.error);
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
  const handleRemoveIngredientField = (): void => {
    localDispatch({
      type: "REMOVE_INGREDIENT_FIELD",
    });
  };

  const handleClick = (): void => {
    fileInput.current?.click();
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      localDispatch({
        type: "ADD_PHOTO",
        photo: e.target.files[0],
      });
      localDispatch({
        type: "SET_IMAGE_URL",
        imageURL: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const removePhoto = (): void => {
    localDispatch({
      type: "REMOVE_IMAGE_URL",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col absolute bg-white h-[40rem] w-[28rem] rounded-2xl p-4 overflow-auto hide-scrollbar"
    >
      <p className="text-2xl border-b border-gray-400 font-bold text-gray-700">
        Add Recipe
      </p>

      <div className="flex justify-center pt-8">
        <div className="flex  justify-center items-center border w-full h-64 bg-gray-50 rounded hover:bg-gray-200 transition">
          {state.hidden ? (
            <div className="w-full h-full overflow-hidden rounded">
              <div className="relative">
                <img
                  className="object-cover "
                  src={state.imageURL}
                  alt="Taco Photo"
                />
                <div className="absolute w-full h-full inset-0 hover:bg-opacity-20 hover:bg-black transition"></div>
              </div>
              <button
                onClick={() => removePhoto()}
                type="button"
                className="absolute top-16 right-1 z-10 text-xl bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300 transition"
              >
                <FontAwesomeIcon icon={solid("close")} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleClick()}
              type="button"
              className="border rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 transition"
            >
              <FontAwesomeIcon
                className="text-gray-700 hover:text-gray-800"
                icon={solid("camera")}
              />
            </button>
          )}
        </div>
        <input
          className="hidden"
          type="file"
          ref={fileInput}
          onChange={handlePhoto}
        />
      </div>

      <input
        className="border mt-4 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:bg-blue-50"
        name="name"
        value={state.name}
        type="text"
        placeholder="Name of recipe..."
        onChange={(e) => handleChange(e)}
      />
      <p className="text-xl font-semibold text-gray-700 pt-4 ">Restrictions</p>
      <div className="grid grid-cols-3 border rounded p-4 text-gray-600">
        <label className="space-x-2">
          <span>vegan</span>
          <input
            className="cursor-pointer"
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
            className="cursor-pointer"
            type="checkbox"
            value="gluten-free"
            name="gluten-free"
            onChange={handleRestrictions}
            checked={state["gluten-free"]}
          />
        </label>
      </div>
      <div className="py-4">
        <p className="text-xl font-semibold text-gray-700">Ingredients</p>
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
        <div className="flex mt-4 justify-between">
          <button
            type="button"
            onClick={() => handleAddIngredientField()}
            className="rounded-xl bg-blue-500 text-white font-semibold self-end text-sm px-2 py-1 hover:bg-blue-600 "
          >
            + add ingredient
          </button>
          {state.ingredientList.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveIngredientField()}
              className="rounded-xl bg-red-500 text-white font-semibold self-end text-sm px-2 py-1 hover:bg-red-600 "
            >
              + remove ingredient
            </button>
          )}
        </div>
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
