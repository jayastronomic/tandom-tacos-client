import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  SearchBox,
  RefinementList,
  InfiniteHits,
  ToggleRefinement,
} from "react-instantsearch-hooks-web";
import Hit from "../components/Hit";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700", // Meilisearch host
  "" // Meilisearch API key, if I have set one
);

const ResultsContainer = () => {
  return (
    <div className="flex flex-col overflow-auto items-center h-screen hide-scrollbar">
      <InstantSearch searchClient={searchClient} indexName="Recipe">
        <SearchBox
          autoFocus
          classNames={{
            form: "relative flex flex-col px-4 py-4",
            input:
              "bg-gray-200 py-2 px-6 rounded-full focus:outline-none focus:ring-1",
            submitIcon: "absolute left-5 top-8",
            resetIcon: "hidden",
          }}
          className=""
          placeholder={"Search Tandem Taco"}
          title="My custom title"
        />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <h1 className="bg-white rounded-t-xl px-4 shadow border-b font-medium">
              Restrictions
            </h1>
            <RefinementList
              operator="and"
              attribute="restrictions"
              classNames={{
                root: "bg-white rounded-b-xl w-[20rem] p-4 shadow",
                label: "space-x-2",
                list: "text-gray-600 font-semibold text-sm",
              }}
            />
          </div>
          <div>
            <h1 className="bg-white rounded-t-xl px-4 shadow border-b font-medium">
              Ingredients
            </h1>
            <RefinementList
              operator="and"
              attribute="ingredients"
              classNames={{
                root: "bg-white rounded-b-xl w-[20rem] p-4 shadow",
                label: "space-x-2",
                list: "text-gray-600 font-semibold text-sm",
              }}
            />
          </div>
        </div>
        <InfiniteHits
          hitComponent={Hit}
          classNames={{
            loadMore:
              "py-4 rounded-full mb-4 mt-4 bg-white bg-blue-400 text-white hover:bg-blue-500 transition w-[20rem]",
            root: "flex flex-col w-full items-center",
          }}
          showPrevious={false}
        />
      </InstantSearch>
    </div>
  );
};

export default ResultsContainer;
