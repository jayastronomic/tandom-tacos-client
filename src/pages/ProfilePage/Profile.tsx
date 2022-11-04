import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import AuthUserRecipeContainer from "../../containers/AuthUserRecipeContainer";
import mascot from "../../images/mascot.gif";

const Profile = () => {
  const authUser = useAppSelector((state: any) => state.user);

  return (
    <div className="flex flex-col h-screen overflow-auto bg-orange-50 flex-1 hide-scrollbar">
      <div className="flex flex-col p-4">
        <div className="flex justify-center items-center rounded-full overflow-hidden h-56 w-56 m-auto border-2 border-gray-400 shadow-xl bg-gray-100">
          <FontAwesomeIcon
            icon={solid("user")}
            size="5x"
            className="text-gray-600"
          />
        </div>

        <div className="flex flex-col pt-4">
          <h1 className="font-semibold text-xl text-gray-800">
            {authUser.name}
          </h1>
          <h2 className="font-light text-gray-600">@{authUser.username}</h2>
        </div>
        {authUser.recipes.length === 0 ? (
          <div className="flex flex-col  items-center flex-1">
            <img className="w-64" alt="Tandem Taco Mascot" src={mascot} />
            <p className="text-gray-400">Oop! No Taco Recipes. Share one!</p>
          </div>
        ) : (
          <AuthUserRecipeContainer authUser={authUser} />
        )}
      </div>
    </div>
  );
};

export default Profile;
