import React, { Dispatch, FC } from "react";
import AddRecipeForm from "./AddRecipeForm";

type AddRecipeModalProps = {
  setShow: Dispatch<boolean>;
};

const AddRecipeModal = ({ setShow }: AddRecipeModalProps): JSX.Element => {
  return (
    <div className="absolute flex items-center justify-center h-full w-full bg-opacity-50">
      <button
        onClick={() => setShow(false)}
        className="w-full h-full bg-black bg-opacity-30"
      ></button>
      <AddRecipeForm setShow={setShow} />
    </div>
  );
};

export default AddRecipeModal;
