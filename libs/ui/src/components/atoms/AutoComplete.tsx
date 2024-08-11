import MuiAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { IconSearch } from "@tabler/icons-react";
import { LocationInfo } from "@spotfinder2/util/types";
import React from "react";
import { majorCitiesLocationInfo } from "@spotfinder2/util/constant";
type AutocompleteSimpleProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  "renderInput"
> & {
  placeholder?: string;
};
export const AutoComplete = <T,>({
  placeholder = "Search...",
  ...props
}: AutocompleteSimpleProps<T>) => {
  return (
    <MuiAutocomplete
      autoSelect
      handleHomeEndKeys
      classes={{
        root: " font-light ",
        input: "p-2",
        noOptions: "backdrop-filter backdrop-blur",
        loading: "backdrop-filter backdrop-blur",
        listbox: "p-0 backdrop-filter backdrop-blur max-h-64",
        option: "hover:bg-white bg-opacity-100",
        paper: "shadow-md border border-white mt-1 bg-transparent rounded-none",
      }}
      renderInput={(params) => {
        return (
          <div
            ref={params.InputProps.ref}
            className="flex items-center bg-transparent"
          >
            <input
              type="text"
              {...params.inputProps}
              placeholder={placeholder}
              className="w-full py-2 pl-3 text-sm pr-8 rounded-md shadow-md focus:ring-0 border border-white"
            />
            <IconSearch className="w-4 h-4 text-gray-800 stroke-2 -ml-7" />
          </div>
        );
      }}
      {...props}
    />
  );
};
