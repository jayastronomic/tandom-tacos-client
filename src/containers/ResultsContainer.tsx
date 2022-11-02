import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  InfiniteHits,
} from "react-instantsearch-hooks-web";
import Hit from "../components/Hit";
import ExploreVideo from "../pages/ExplorePage/ExploreVideo";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700", // Meilisearch host
  "" // Meilisearch API key, if I have set one
);

const ResultsContainer = () => {
  return (
    <div className="flex flex-col overflow-auto items-center px-4 h-screen">
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
        />

        <RefinementList
          operator="and"
          attribute="restrictions"
          classNames={{
            root: "bg-white rounded-xl mt-2 w-full p-4 shadow",
            label: "space-x-2",
            list: "text-gray-600 font-semibold text-sm",
          }}
        />
        <InfiniteHits
          hitComponent={Hit}
          classNames={{
            loadMore:
              "py-4 rounded-full mb-4 mt-4 bg-white bg-blue-400 text-white hover:bg-blue-500 transition",
            root: "flex flex-col w-full",
          }}
          showPrevious={false}
        />
      </InstantSearch>
    </div>
  );
};

export default ResultsContainer;
