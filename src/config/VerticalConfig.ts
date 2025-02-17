import {
  CardComponent,
  DefaultRawDataType,
  VerticalConfigMap,
} from "@yext/search-ui-react";

import { UniversalSection } from "../components/search/UniversalSection";
import ProductProminentVideo from "../components/cards/ProductProminentVideo";
import FileStandard from "../components/cards/FileStandard";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import ProductProminentImage from "../components/cards/ProductProminentImage";
import DocumentStandard from "../components/cards/DocumentStandard";

export interface GlobalConfigProps {
  accountEnv: "Production" | "Sandbox";
  searchExperienceVersion: "Production" | "Staging";
  chatExperienceVersion: "Production" | "Staging";
  isChatEnabled: boolean;
  locale: string;
  isGenerativeDirectAnswerEnabled: boolean;
  region: "US" | "EU";
}

export const GlobalConfig: GlobalConfigProps = {
  accountEnv: "Sandbox", //Production or Sandbox
  searchExperienceVersion: "Production", // Production or Staging
  chatExperienceVersion: "Production", // Production or Staging
  isChatEnabled: false, //true or false, also fill YEXT_PUBLIC_CHAT_APIKEY and YEXT_PUBLIC_CHAT_BOTID to work
  locale: "en", // your locale eg: en_GB
  isGenerativeDirectAnswerEnabled: true, //true or false
  region: "US", //US or EU
};
/**
 *
 * Define properties for each section type shown in the search interface.
 * label: Display name for the section.
 * verticalKey: Optional key that uniquely identifies each type of content (e.g., 'faq', 'jobs').
 * pageType: Defines layout style, e.g., "grid-cols-2" (two-column grid), "map" (map view).
 * universalLimit: Limits the number of items shown in universal search.
 * sortByOptions: Custom sorting options for items.
 * cardType: Specifies how each item in the section is displayed (using different card components).
 * visualTypeHead: Boolean to enable special header visuals (optional).
 *
 *
 * Recommendation
 * gridPageType - ProductProminentVideo, LocationStandard, ProfessionalLocationAndGrid, ProductProminentImage
 *
 *
 * Sample sorting format - // ["fieldName, Ascending Label, Descending Label"] examples: ["name, Name (A-Z), Name (Z-A)"] or ["name, Name (A-Z), Name (Z-A)", "price.value, Price (Low - High), Price (High - Low)"]
 *
 */

export interface VerticalProps {
  label: string;
  verticalKey?: string;
  pageType:
    | "grid-cols-2"
    | "grid-cols-3"
    | "grid-cols-4"
    | "standard"
    | "map"
    | "universal";
  universalLimit?: number;
  verticalLimit?: number;
  sortFields?: string[];
  cardType?: CardComponent;
  visualTypeHead?: boolean;
  hideLabel?: boolean;
  hideInNavBar?: boolean;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    pageType: "universal",
  },
  {
    label: "Services",
    verticalKey: "services",
    pageType: "standard",
    cardType: DocumentStandard,
    universalLimit: 5,
    verticalLimit: 10,
  },
  {
    label: "Providers",
    verticalKey: "providers",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
    universalLimit: 4,
    verticalLimit: 10,
    visualTypeHead: true,
  },
  {
    label: "Locations",
    verticalKey: "locations",
    pageType: "map",
    cardType: LocationStandard,
    universalLimit: 5,
    verticalLimit: 10,
  },
  // {
  //   label: "Jobs",
  //   verticalKey: "jobs",
  //   pageType: "standard",
  //   cardType: JobStandard,
  //   universalLimit: 3,
  //   verticalLimit: 5,
  // },
  // {
  //   label: "Events",
  //   verticalKey: "events",
  //   pageType: "standard",
  //   cardType: EventStandard,
  //   universalLimit: 3,
  //   verticalLimit: 5,
  // },
  // {
  //   label: "Products",
  //   verticalKey: "product",
  //   pageType: "grid-cols-3",
  //   cardType: ProductProminentImage,
  //   universalLimit: 3,
  //   verticalLimit: 5,
  //   sortFields: ["name"], // ["fieldName, Ascending Label, Descending Label"] examples: ["name, Name (A-Z), Name (Z-A)"] or ["name, Name (A-Z), Name (Z-A)", "price.value, Price (Low - High), Price (High - Low)"]
  // },
];

// Configuration options for enabling or disabling features

export const UniversalConfig: VerticalConfigMap<
  Record<string, DefaultRawDataType>
> = VerticalConfig.reduce(
  (configMap, item) => {
    if (item.verticalKey) {
      configMap[item.verticalKey] = {
        CardComponent: item.cardType,
        SectionComponent: UniversalSection,
        label: item.label,
      };
    }
    return configMap;
  },
  {} as VerticalConfigMap<Record<string, DefaultRawDataType>>
);
