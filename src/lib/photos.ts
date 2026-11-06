export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

const THUMBNAILS = "https://thumb.wikimedia.org/wikipedia/commons/thumb";
const COMMONS = "https://commons.wikimedia.org/wiki";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";

const LICENSES = {
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0",
  "CC BY-SA 3.0": CC_BY_SA_3,
  "CC BY-SA 4.0": CC_BY_SA_4,
};

type NewPhoto = Omit<Photo, "src" | "license" | "licenseUrl" | "sourceUrl"> & {
  path: string;
  file: string;
  license: keyof typeof LICENSES;
};

function commons({ path, file, license, ...details }: NewPhoto): Photo {
  return {
    ...details,
    src: path.startsWith("https://") ? path : `${THUMBNAILS}/${path}`,
    license,
    licenseUrl: LICENSES[license],
    sourceUrl: `${COMMONS}/File:${file}`,
  };
}

/**
 * Every photo needs its author and license, because they must be credited.
 * Details are from each file's Wikimedia Commons page. Phase 4 moves the files
 * to Cloudinary; the credits stay the same.
 */
export const PHOTOS = {
  rajarani: {
    src: `${THUMBNAILS}/4/49/Rajarani_Temple%2C_Bhubaneswar%2C_Odisha%2C_India.JPG/1920px-Rajarani_Temple%2C_Bhubaneswar%2C_Odisha%2C_India.JPG`,
    width: 1920,
    height: 1280,
    alt: "Rajarani Temple lit up at night against a dark sky",
    title: "Rajarani Temple, Bhubaneswar",
    author: "Krupasindhu Muduli",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:Rajarani_Temple,_Bhubaneswar,_Odisha,_India.JPG`,
  },
  lingaraj: {
    src: `${THUMBNAILS}/b/bc/Lingaraj_Temple%2C_Bhubaneswar%2C_Odisha_2.jpg/1920px-Lingaraj_Temple%2C_Bhubaneswar%2C_Odisha_2.jpg`,
    width: 1920,
    height: 1440,
    alt: "Stone towers of the Lingaraj Temple complex",
    title: "Lingaraj Temple, Bhubaneswar",
    author: "Athulvis",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:Lingaraj_Temple,_Bhubaneswar,_Odisha_2.jpg`,
  },
  udayagiri: {
    src: `${THUMBNAILS}/0/09/Udayagiri_Caves_-_Rani_Gumpha_01.jpg/1920px-Udayagiri_Caves_-_Rani_Gumpha_01.jpg`,
    width: 1920,
    height: 1280,
    alt: "Carved rock-cut chambers of Rani Gumpha at the Udayagiri Caves",
    title: "Rani Gumpha, Udayagiri Caves",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: CC_BY_SA_3,
    sourceUrl: `${COMMONS}/File:Udayagiri_Caves_-_Rani_Gumpha_01.jpg`,
  },
  odiaLunch: {
    src: `${THUMBNAILS}/b/b6/Complete_traditional_Odia_vegetarian_lunch.jpg/1920px-Complete_traditional_Odia_vegetarian_lunch.jpg`,
    width: 1920,
    height: 1152,
    alt: "A plate of steamed rice surrounded by small bowls of traditional Odia dishes",
    title: "Traditional Odia vegetarian lunch",
    author: "foodLover-A",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:Complete_traditional_Odia_vegetarian_lunch.jpg`,
  },
  odissi: {
    src: `${THUMBNAILS}/9/9a/Odissi_dance_performance_03.jpg/1920px-Odissi_dance_performance_03.jpg`,
    width: 1920,
    height: 1272,
    alt: "An Odissi dancer performing on stage under blue light",
    title: "Odissi dance performance",
    author: "Prateek Pattanaik",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:Odissi_dance_performance_03.jpg`,
  },
  skyline: {
    src: `${THUMBNAILS}/8/8c/Bhubaneswar_skyline.jpg/1920px-Bhubaneswar_skyline.jpg`,
    width: 1920,
    height: 1280,
    alt: "Bhubaneswar skyline seen from Khandagiri hill",
    title: "Bhubaneswar skyline from Khandagiri hill",
    author: "Sailesh Patnaik",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:Bhubaneswar_skyline.jpg`,
  },
  moBus: {
    src: `${THUMBNAILS}/a/a4/A_Mo_Bus_in_Chandrasekharpur%2C_Bhubaneswar%2C_Odisha%2C_India.jpg/1920px-A_Mo_Bus_in_Chandrasekharpur%2C_Bhubaneswar%2C_Odisha%2C_India.jpg`,
    width: 1920,
    height: 1440,
    alt: "A blue Mo Bus on a tree-lined road in Chandrasekharpur",
    title: "Mo Bus in Chandrasekharpur",
    author: "Subhashish Panigrahi",
    license: "CC BY-SA 4.0",
    licenseUrl: CC_BY_SA_4,
    sourceUrl: `${COMMONS}/File:A_Mo_Bus_in_Chandrasekharpur,_Bhubaneswar,_Odisha,_India.jpg`,
  },
  parasurameswara: commons({
    path: "2/28/Parasuramesvara_Temple.jpg/1280px-Parasuramesvara_Temple.jpg",
    file: "Parasuramesvara_Temple.jpg",
    width: 1280,
    height: 1004,
    alt: "The carved stone tower and hall of Parasurameswara Temple",
    title: "Parasurameswara Temple",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
  }),
  brahmeswara: commons({
    path: "8/8f/Brahmeswara_temple_Bhubaneswar_%281%29.jpg/1280px-Brahmeswara_temple_Bhubaneswar_%281%29.jpg",
    file: "Brahmeswara_temple_Bhubaneswar_(1).jpg",
    width: 1280,
    height: 720,
    alt: "Brahmeswara Temple and its smaller shrines",
    title: "Brahmeswara Temple",
    author: "Ssriram mt",
    license: "CC BY-SA 4.0",
  }),
  anantaVasudeva: commons({
    path: "d/d8/Ananta_Basudeba_Temple%2C_Bhubaneswar_01.jpg/1280px-Ananta_Basudeba_Temple%2C_Bhubaneswar_01.jpg",
    file: "Ananta_Basudeba_Temple,_Bhubaneswar_01.jpg",
    width: 1280,
    height: 960,
    alt: "Painted entrance of the Ananta Vasudeva Temple",
    title: "Ananta Vasudeva Temple",
    author: "Prateek Pattanaik",
    license: "CC BY-SA 4.0",
  }),
  ramMandir: commons({
    path: "https://upload.wikimedia.org/wikipedia/commons/5/51/Ram_Mandir%2C_Bhubaneswar.jpg",
    file: "Ram_Mandir,_Bhubaneswar.jpg",
    width: 1280,
    height: 737,
    alt: "The red and white towers of Ram Mandir",
    title: "Ram Mandir, Bhubaneswar",
    author: "ଜଗଦୀଶ ଉତ୍ତରକବାଟ",
    license: "CC BY-SA 3.0",
  }),
  mukteshvara: commons({
    path: "3/32/Mukteshvara_Temple%2C_Bhubaneswar.jpg/1280px-Mukteshvara_Temple%2C_Bhubaneswar.jpg",
    file: "Mukteshvara_Temple,_Bhubaneswar.jpg",
    width: 1280,
    height: 879,
    alt: "Mukteshvara Temple with its carved stone gateway",
    title: "Mukteshvara Temple",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
  }),
  shantiStupa: commons({
    path: "1/1f/Shanti_Stupa%2C_Dhauli_01.jpg/1280px-Shanti_Stupa%2C_Dhauli_01.jpg",
    file: "Shanti_Stupa,_Dhauli_01.jpg",
    width: 1280,
    height: 879,
    alt: "The white dome of the Shanti Stupa at Dhauli",
    title: "Shanti Stupa, Dhauli",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
  }),
  nandankanan: commons({
    path: "0/02/Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg/1280px-Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg",
    file: "Nandankanan,_Bhubaneswar,_Odisha.jpg",
    width: 1280,
    height: 960,
    alt: "The entrance gate of Nandankanan Zoological Park",
    title: "Nandankanan Zoological Park",
    author: "Abhas Kumar Kheti",
    license: "CC BY-SA 3.0",
  }),
  stateMuseum: commons({
    path: "7/7d/Bhubaneswar_State_Museum.jpg/1280px-Bhubaneswar_State_Museum.jpg",
    file: "Bhubaneswar_State_Museum.jpg",
    width: 1280,
    height: 960,
    alt: "The Odisha State Museum building and its entrance",
    title: "Odisha State Museum",
    author: "User:Tinucherian",
    license: "CC BY 3.0",
  }),
  planetarium: commons({
    path: "b/b8/Pathani_Samanta_Planetarium.JPG/1280px-Pathani_Samanta_Planetarium.JPG",
    file: "Pathani_Samanta_Planetarium.JPG",
    width: 1280,
    height: 762,
    alt: "The round building of Pathani Samanta Planetarium",
    title: "Pathani Samanta Planetarium",
    author: "Subhashish Panigrahi",
    license: "CC BY-SA 4.0",
  }),
  naturalHistoryMuseum: commons({
    path: "1/1c/Regional_Museum_of_Natural_History_Bhubaneswar.jpg/1280px-Regional_Museum_of_Natural_History_Bhubaneswar.jpg",
    file: "Regional_Museum_of_Natural_History_Bhubaneswar.jpg",
    width: 1280,
    height: 960,
    alt: "The Regional Museum of Natural History building",
    title: "Regional Museum of Natural History",
    author: "Hellohappy",
    license: "CC BY-SA 4.0",
  }),
  kalingaStadium: commons({
    path: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Aerial_view_of_Kalinga_Stadium.jpg",
    file: "Aerial_view_of_Kalinga_Stadium.jpg",
    width: 1280,
    height: 720,
    alt: "Aerial view of Kalinga Stadium and its track",
    title: "Aerial view of Kalinga Stadium",
    author: "Government of Odisha",
    license: "CC BY 4.0",
  }),
  dalmaRestaurant: commons({
    path: "2/2c/Dalma_restaurant%2C_Bhubaneswar.jpg/1280px-Dalma_restaurant%2C_Bhubaneswar.jpg",
    file: "Dalma_restaurant,_Bhubaneswar.jpg",
    width: 1280,
    height: 848,
    alt: "Inside the dining room of Dalma restaurant",
    title: "Dalma restaurant, Bhubaneswar",
    author: "PreludeDigital",
    license: "CC BY-SA 3.0",
  }),
  dahibara: commons({
    path: "6/61/Kataka_dahibara_aludam.jpg/1280px-Kataka_dahibara_aludam.jpg",
    file: "Kataka_dahibara_aludam.jpg",
    width: 1280,
    height: 992,
    alt: "A serving of dahibara aludam",
    title: "Dahibara aludam",
    author: "Subhashish Panigrahi",
    license: "CC BY 3.0",
  }),
  odiaThali: commons({
    path: "2/24/Odia_Vegetarian_Thali.jpg/1280px-Odia_Vegetarian_Thali.jpg",
    file: "Odia_Vegetarian_Thali.jpg",
    width: 1280,
    height: 1197,
    alt: "An Odia vegetarian thali",
    title: "Odia vegetarian thali",
    author: "Swetapadma07",
    license: "CC BY-SA 3.0",
  }),
  northIndianThali: commons({
    path: "c/cf/North_Indian_Thali.JPG/1280px-North_Indian_Thali.JPG",
    file: "North_Indian_Thali.JPG",
    width: 1280,
    height: 853,
    alt: "A North Indian thali",
    title: "North Indian thali",
    author: "Piyush Nimbalkar",
    license: "CC BY-SA 4.0",
  }),
  pakhala: commons({
    path: "6/69/Pakhala_Bhata_machha_Bhaja_and_other.jpg/1280px-Pakhala_Bhata_machha_Bhaja_and_other.jpg",
    file: "Pakhala_Bhata_machha_Bhaja_and_other.jpg",
    width: 1280,
    height: 960,
    alt: "A meal of pakhala bhata with fried fish",
    title: "Pakhala bhata with fried fish",
    author: "Jnanaranjan sahu",
    license: "CC BY-SA 4.0",
  }),
  bhubaneswarStation: commons({
    path: "8/89/BBSrailwaystation.jpg/1280px-BBSrailwaystation.jpg",
    file: "BBSrailwaystation.jpg",
    width: 1280,
    height: 720,
    alt: "The entrance of Bhubaneswar railway station with vehicles outside",
    title: "Bhubaneswar railway station",
    author: "Anubhav2010",
    license: "CC BY-SA 4.0",
  }),
  airport: commons({
    path: "6/64/Biju_Patnaik_Airport%2C_Bhubaneswar%2C_Odisha.jpg/1280px-Biju_Patnaik_Airport%2C_Bhubaneswar%2C_Odisha.jpg",
    file: "Biju_Patnaik_Airport,_Bhubaneswar,_Odisha.jpg",
    width: 1280,
    height: 805,
    alt: "The terminal building of Biju Patnaik International Airport",
    title: "Biju Patnaik International Airport",
    author: "Krupasindhu Muduli",
    license: "CC BY-SA 3.0",
  }),
} satisfies Record<string, Photo>;
