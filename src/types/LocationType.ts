type AdministrativeInfo = {
  name: string;
  description: string;
  order: number;
  adminLevel?: number; // Some entries have this and some don't
  isoCode?: string; // Some entries have this and some don't
  wikidataId?: string; // Some entries have this and some don't
};

type InformativeInfo = {
  name: string;
  description?: string; // Some entries have this and some don't
  order: number;
  isoCode?: string; // Some entries have this and some don't
  wikidataId?: string; // Some entries have this and some don't
};

type LocalityInfo = {
  administrative: AdministrativeInfo[];
  informative: InformativeInfo[];
};

export type LocationInfoType = {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  csdCode: string;
  latitude: number;
  locality: string;
  localityInfo: LocalityInfo;
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
};
