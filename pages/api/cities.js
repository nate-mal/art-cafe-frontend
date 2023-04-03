import locs from "./locs-data.js";
function toNormalForm(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { judet } = req.query;
    // Process a POST request
    const options = locs.filter(
      (option) => toNormalForm(option.judet) === toNormalForm(judet)
    );

    res.status(200).json({ options });
  } else {
    // Handle any other HTTP method

    res.status(404).json({ options: [] });
  }
}

// const juds = [
//   {
//     name: "Alba",
//   },
//   {
//     name: "Arad",
//   },
//   {
//     name: "Argeș",
//   },
//   {
//     name: "Sibiu",
//   },
//   {
//     name: "Bihor",
//   },
//   {
//     name: "Bistrița-Năsăud",
//   },
//   {
//     name: "Botoșani",
//   },
//   {
//     name: "Brașov",
//   },
//   {
//     name: "Brăila",
//   },
//   {
//     name: "București",
//   },
//   {
//     name: "Buzău",
//   },
//   {
//     name: "Caraș-Severin",
//   },
//   {
//     name: "Călărași",
//   },
//   {
//     name: "Cluj",
//   },
//   {
//     name: "Constanța",
//   },
//   {
//     name: "Covasna",
//   },
//   {
//     name: "Dâmbovița",
//   },
//   {
//     name: "Dolj",
//   },
//   {
//     name: "Galați",
//   },
//   {
//     name: "Giurgiu",
//   },
//   {
//     name: "Gorj",
//   },
//   {
//     name: "Harghita",
//   },
//   {
//     name: "Hunedoara",
//   },
//   {
//     name: "Ialomița",
//   },
//   {
//     name: "Iași",
//   },
//   {
//     name: "Ilfov",
//   },
//   {
//     name: "Maramureș",
//   },
//   {
//     name: "Mehedinți",
//   },
//   {
//     name: "Mureș",
//   },
//   {
//     name: "Neamț",
//   },
//   {
//     name: "Olt",
//   },
//   {
//     name: "Prahova",
//   },
//   {
//     name: "Satu Mare",
//   },
//   {
//     name: "Sălaj",
//   },
//   {
//     name: "Bacău",
//   },
//   {
//     name: "Suceava",
//   },
//   {
//     name: "Teleorman",
//   },
//   {
//     name: "Timiș",
//   },
//   {
//     name: "Tulcea",
//   },
//   {
//     name: "Vaslui",
//   },
//   {
//     name: "Vâlcea",
//   },
//   {
//     name: "Vrancea",
//   },
// ];
