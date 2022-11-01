import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
} from "react-instantsearch-hooks-web";
import Hit from "../components/Hit";
import ExploreVideo from "../pages/ExplorePage/ExploreVideo";

const searchClient = instantMeiliSearch(
  "http://127.0.0.1:7700", // Meilisearch host
  "" // Meilisearch API key, if I have set one
);

const ResultsContainer = () => {
  return (
    <div className="flex flex-col overflow-auto items-center">
      <InstantSearch searchClient={searchClient} indexName="Recipe">
        <SearchBox
          classNames={{
            form: "relative flex flex-col px-4 py-4",
            input:
              "bg-gray-200 py-2 px-6 rounded-full focus:outline-none focus:ring-1",
            submitIcon: "absolute left-5 top-8",
          }}
          className=""
          placeholder={"Search Tandem Taco"}
        />

        <ExploreVideo />
        <Pagination className="flex" />
        <RefinementList attribute="restrictions" />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};

export default ResultsContainer;
