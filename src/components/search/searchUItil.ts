import {
  useSearchActions,
  UniversalLimit,
  SortType,
  Direction,
} from "@yext/search-headless-react";
import { VerticalConfig } from "../../config/VerticalConfig";
import { toTitleCaseWithRules } from "../../utils/reusableFunctions";

type SearchUtilProps = {
  query?: string;
  vertical?: string;
  context?: any;
  searchActions: ReturnType<typeof useSearchActions>;
};

const getUniversalLimit = (): UniversalLimit =>
  VerticalConfig.filter(
    (item) => item.label !== "All" && item.universalLimit !== undefined
  ).reduce<UniversalLimit>((acc, item) => {
    acc[String(item.verticalKey)] = item.universalLimit as number;
    return acc;
  }, {});

const getVerticalLimit = (currVertical: string): number | undefined =>
  VerticalConfig.find(
    (item) => item.label !== "All" && item.verticalKey === currVertical
  )?.verticalLimit;

export const SearchUtils = ({
  vertical,
  query = "",
  searchActions,
  context = {},
}: SearchUtilProps): void => {
  if (query) searchActions.setQuery(query);
  if (vertical && vertical !== "universal") {
    searchActions.setVertical(vertical);
    const verticalLimit = getVerticalLimit(vertical);
    Object.keys(context).length !== 0 &&
      searchActions.setContext(getDecodexContext(context));
    if (verticalLimit !== undefined && verticalLimit >= 1) {
      searchActions.setVerticalLimit(verticalLimit);
    }
    searchActions.executeVerticalQuery();
  } else {
    searchActions.setUniversal();
    Object.keys(context).length !== 0 &&
      searchActions.setContext(getDecodexContext(context));
    searchActions.setUniversalLimit(getUniversalLimit());
    searchActions.executeUniversalQuery();
  }
};

export interface SortTypeProps {
  label: string;
  sortBy: {
    field: string;
    direction: Direction;
    type: SortType;
  };
}

export const buildSortOptions = (fields: string[]): SortTypeProps[] =>
  fields.flatMap((field) => {
    const [rawField, ascendingLabel, descendingLabel] = field
      .replaceAll(", ", ",")
      .split(",");

    const formattedField = toTitleCaseWithRules(rawField);
    return [
      {
        label: ascendingLabel || `${formattedField} - Ascending`,
        sortBy: {
          field: rawField,
          direction: Direction.Ascending,
          type: SortType.Field,
        },
      },
      {
        label: descendingLabel || `${formattedField} - Descending`,
        sortBy: {
          field: rawField,
          direction: Direction.Descending,
          type: SortType.Field,
        },
      },
    ];
  });

export const setQueryParams = (query?: string, vertical?: string): void => {
  const queryParams = new URLSearchParams(window.location.search);

  vertical
    ? queryParams.set("vertical", vertical)
    : queryParams.delete("vertical");
  query ? queryParams.set("query", query) : queryParams.delete("query");

  history.pushState(null, "", `?${queryParams.toString()}`);
};
const getDecodexContext = (input: any) => {
  return JSON.parse(
    input
      .replace(/([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$3":')
      .replace(/:([a-zA-Z0-9_]+)/g, ':"$1"')
  );
};
