"use client";
import React from "react";
import { FormProviderSearchGarage } from "@spotfinder2/forms/src/searchGarages";
import { SearchPage } from "@spotfinder2/ui/src/components/templates/SearchPage";
export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  );
}
