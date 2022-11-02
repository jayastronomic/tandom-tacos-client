import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Recipe } from "../interfaces/recipe.interface";
import { Highlight } from "react-instantsearch-hooks-web";
import { useLocation } from "react-router-dom";
import { Ingredient } from "../interfaces/ingredient.interface";

type RecipceCardProps = {
  recipe: Recipe;
};

const RecipeCard: any = ({ recipe }: RecipceCardProps): JSX.Element => {
  console.log(recipe);
  const location = useLocation();

  const tagClass =
    "border-b border-gray-400 bg-black bg-opacity-60 px-1 transition hover:translate-x-2 durattion-200 w-[6rem]";

  const cardContainerClass =
    "flex flex-col rounded-2xl border-b h-96 w-96 drop-shadow overflow-hidden transition" +
    " hover:drop-shadow-2xl hover:scale-[1.01] cursor-pointer flex-shrink-0";

  return (
    <div className={cardContainerClass}>
      <div className="relative h-1/2 overflow-hidden rounded-t">
        <img
          className="object-cover w-full h-full"
          alt=""
          src="https://urbanmatter.com/chicago/wp-content/uploads/2016/08/61658265_1031292940394672_2473784691572867072_o.jpg"
        />
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-opacity-40 w-full h-full bg-neutral-900 ">
          <div className="flex justify-center">
            <p className="text-white font-extralight text-2xl">
              {location.pathname === "/" ? (
                recipe.name
              ) : (
                <Highlight hit={recipe as any} attribute="name" />
              )}
            </p>
          </div>
          <div className="flex flex-col-reverse text-white text-smfont-extralight self-start h-full">
            {recipe.restrictions.map((restriction) => {
              return <div className={tagClass}>{restriction}</div>;
            })}
          </div>
        </div>
      </div>
      <div className="bg-white h-1/2 shadow px-4 pt-4 overflow-auto">
        <div className="text-sm text-gray-700 font-light">
          {location.pathname === "/"
            ? recipe.ingredients.map((ingredient: Ingredient) => {
                return (
                  <p>
                    {ingredient.name} - {ingredient.quantity}
                  </p>
                );
              })
            : recipe.ingredients.map((ingredient: any) => {
                return (
                  <p>
                    {ingredient[0]} - {ingredient[1]}
                  </p>
                );
              })}
        </div>
        <div className="absolute bottom-3 right-5 flex space-x-4 items-center text-sm text-right pt-2 text-gray-600 font-semibold">
          <FontAwesomeIcon icon={regular("heart")} size="xl" />
          <p>
            {!!recipe.user_uuid ? (
              <p>
                Recipe by <span className="hover:underline">Jake</span>
              </p>
            ) : (
              <p>
                Recipe by <span className="text-orange-300">Tandem</span>
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
