import { FC } from "react";
import RecipeCard from "./RecipeCard";

const Hit: FC = ({ hit }: any): JSX.Element => {
  console.log(hit);
  return (
    <div className="pt-10">
      <RecipeCard recipe={hit} key={hit.uuid} />
    </div>
  );
};

export default Hit;
