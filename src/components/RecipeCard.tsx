import { useAppSelector } from "../app/hooks";
import { Recipe } from "../interfaces/recipe.interface";
import { Highlight } from "react-instantsearch-hooks-web";
import { Link, useLocation } from "react-router-dom";
import { Ingredient } from "../interfaces/ingredient.interface";
import taco from "../images/default.png";

type RecipceCardProps = {
  recipe: Recipe;
};

const RecipeCard: any = ({ recipe }: RecipceCardProps): JSX.Element => {
  const location = useLocation();
  const authUser = useAppSelector((state) => state.user);

  const tagClass =
    "border-b border-gray-400 bg-black bg-opacity-60 px-1 transition hover:translate-x-2 durattion-200 w-[6rem] text-sm";

  const cardContainerClass =
    "flex flex-col rounded-2xl border-b h-96 w-96 drop-shadow overflow-hidden transition" +
    " hover:drop-shadow-2xl hover:scale-[1.01] cursor-pointer flex-shrink-0";

  return (
    <div className={cardContainerClass}>
      <div className="relative h-1/2 overflow-hidden rounded-t">
        {recipe.image_exist ? (
          <img
            className="object-cover w-full h-full"
            alt=""
            src={recipe.image_url}
          />
        ) : (
          <img className="object-cover w-full h-full" alt="" src={taco} />
        )}
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-opacity-40 w-full h-full bg-neutral-900 ">
          <div className="flex justify-center">
            <p className="text-white font-extralight text-2xl">
              {location.pathname === "/" ||
              location.pathname === `/${authUser.username}` ? (
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

      <div className="bg-white h-1/2 shadow px-4 pt-4 overflow-auto hide-scrollbar">
        <div className="text-sm text-gray-700 font-light">
          <h3 className="font-bold underline">Ingredients</h3>
          {location.pathname === "/" ||
          location.pathname === `/${authUser.username}`
            ? recipe.ingredients.map((ingredient: Ingredient) => {
                return (
                  <p>
                    {ingredient.quantity} - {ingredient.name}
                  </p>
                );
              })
            : recipe.ingredients.map((ingredient: any, i) => {
                return (
                  <p>
                    {recipe.ingredients_quantities[i]} - {ingredient}
                  </p>
                );
              })}
        </div>
        <div className="absolute top-40 right-3 flex space-x-4 items-center text-sm text-right py-1 text-gray-600 font-semibold bg-white rounded px-4">
          {!!recipe.user_id ? (
            <p className="text-xs">
              Recipe by{" "}
              <span className="hover:underline text-blue-500">
                {recipe.user_username}
              </span>
            </p>
          ) : (
            <p className="text-xs">
              Recipe by <span className="text-orange-300">Tandem</span>
            </p>
          )}
        </div>
        <Link
          className="absolute top-8 right-5 text-sm text-white font-semibold  bg-blue-500 rounded px-2 hover:bg-blue-600"
          to={`/recipes/${recipe.uuid}`}
          state={{ uuid: recipe.uuid }}
        >
          see details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
