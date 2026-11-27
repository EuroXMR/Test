// Openly licensed core photos for Demo 2. Source, author and licence are
// recorded here and in CREDITS.md. "sourceSays" is the uploader's own
// description, shown *after* Claude's reading so visitors can compare.
export interface CoreSample {
  id: string;
  file: string; // under /public
  label: string;
  alt: string;
  sourceSays: string;
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
}

export const coreSamples: CoreSample[] = [
  {
    id: "komatiite",
    file: "/samples/core-komatiite.jpg",
    label: "Sample A",
    alt: "Close-up of grey-green drill core with a feathery, criss-crossing crystal texture",
    sourceSays: "Komatiite with spinifex texture (dendritic olivine, serpentinised to chlorite–actinolite), Widgiemooltha Komatiite, Western Australia.",
    author: "Rolinator (en.wikipedia)",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:KomatiiteA2.jpg",
  },
  {
    id: "conglomerate",
    file: "/samples/core-conglomerate.jpg",
    label: "Sample B",
    alt: "Cut end of a drill core: rounded pebbles of many colours in a sandy matrix, with a 1 cm scale bar",
    sourceSays: "Polymict conglomerate from an offshore rock core, Alaska, about 10,000 ft deep.",
    author: "Jstuby (en.wikipedia)",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Conglomerate_core_section.jpg",
  },
  {
    id: "listwanite",
    file: "/samples/core-listwanite.jpg",
    label: "Sample C",
    alt: "Reddish-brown drill core with green speckles and pale veins, marked with red and blue orientation lines",
    sourceSays: "Listwanite (carbonate-altered ultramafic rock) at the base of the Samail ophiolite, northern Oman. NQ core.",
    author: "Diorit",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Listwaenite_drill_core_Oman.jpg",
  },
  {
    id: "dolostone",
    file: "/samples/core-dolostone.jpg",
    label: "Sample D",
    alt: "Core box with five rows of pale grey, mottled drill core",
    sourceSays: "Dolostone (Knox Dolomite, Upper Cambrian) from the Warren County core, Ohio, USA.",
    author: "James St. John",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dolostone_(Knox_Dolomite,_Upper_Cambrian;_Warren_County_core,_Ohio,_USA)_1.jpg",
  },
];
