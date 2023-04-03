import axios from "axios";

const prods = [
  {
    art_id: "1001A",
    name: "BRÜHEINHEIT RECONDIȚIONAT CU SIGILII PREMIUM PENTRU AEG CAFAMOSA",
    description:
      "Dacă aparatul dumneavoastră de cafea AEG CaFamosa complet automat sună chinuit, se blochează, afișează defecțiunea 8 sau cafeaua ajunge în recipientul pentru zațul de cafea, acest lucru se datorează adesea unității de preparare a cafelei. Această unitate de preparare a cafelei este echipată cu o garnitură de buze premium pentru o funcționare ușoară și o etanșare optimă. Unitatea de preparare a cafelei este furnizată complet cu supapa de drenaj corespunzătoare. Include instrucțiuni de service pentru descărcare.\n\nInstrucțiuni de reparații pot fi găsite aici: Instrucțiuni de service\n\n\nConținutul livrării:\n\n1x Unitate de preparare a cafelei completă cu supapă de drenaj (revizuită)",
    availability: "in-stock-ex",
    delivery_time: "5-8 zile",
    profit: 35,
    discount: null,
    images_nr: 1,
    category: "Brueheinheit",
    vendor_product_id: "1001A",
    vendor_product_price: 59.9,
    vendor_product_url:
      "https://www.juraprofi.de/AEG-Ersatzteile/CaFamosa-Ersatzteile/Brueheinheit/Brueheinheit-revidiert-mit-Premium-Dichtungen-fuer-AEG-CaFamosa::5907.html",
    vendor_product_name:
      "BRÜHEINHEIT REVIDIERT MIT PREMIUM DICHTUNGEN FÜR AEG CAFAMOSA",
    vendor_product_description:
      "Wenn sich Ihr AEG CaFamosa Kaffeevollautomat gequält anhört, blockiert, Störung 8 anzeigt oder der Kaffee im Tresterbehälter landet, dann liegt das oft an der Brüheinheit. Diese Brühgruppe ist ausgestattet mit Premium Lippendichtung für leichten Lauf und optimale Abdichtung. Die Brüheinheit wird komplett mit passendem Drainageventil geliefert. Inkl. Service Anleitungen zum runterladen.\n\nReparaturanleitungen finden Sie hier: Service Anleitungen\n\nLieferumfang:\n1x Brüheinheit komplett mit Drainageventil (revidiert)",
    vendor_product_delivery_info:
      "Verfügbar sofort ab Lager\nLieferzeit: 1-3 Tage1)",
    marks: ["AEG"],
    models: [
      [
        "CaFamosa CF80",
        "CaFamosa CF81",
        "CaFamosa CF85",
        "CaFamosa CF90",
        "CaFamosa CF95",
        "CaFamosa CF100",
        "CaFamosa CF120",
        "CaFamosa CF150",
        "CaFamosa CF200",
        "CaFamosa CF300",
        "CaFamosa CF400",
        "CaFamosa CF500",
      ],
    ],
  },
  {
    art_id: "15770A",
    name: "KIT DE ÎNTREȚINERE PENTRU UNITATEA DE BROWTH PENTRU AEG CAFAMOSA",
    description:
      "Dacă grupul de preparare a cafelei de la AEG CaFamosa este lent sau cafeaua ajunge în recipientul cu zaț de cafea, puteți rezolva problema singur cu acest set. Include instrucțiuni de descărcare. Garniturile de etanșare a pistonului sunt noua versiune în calitate îmbunătățită.\n\nInstrucțiunile de reparații pot fi găsite aici: Instrucțiuni de service\n\n\nConținutul livrării:\n\n2x O-ring pentru pistoanele unității de preparare a cafelei\n2x O-ring pentru furtunul de presiune\n2x O-ring tubul de urcare\n1x O-ring racordul de intrare\n6g Unsoare siliconică multiplă (-45 până la 200°C)",
    availability: "in-stock-ex",
    delivery_time: "5-8 zile",
    profit: 35,
    discount: null,
    images_nr: 1,
    category: "Wartungssets",
    vendor_product_id: "15770A",
    vendor_product_price: 5.9,
    vendor_product_url:
      "https://www.juraprofi.de/AEG-Ersatzteile/CaFamosa-Ersatzteile/Wartungssets/Wartungsset-Brueheinheit-fuer-AEG-CaFamosa::5864.html",
    vendor_product_name: "WARTUNGSSET BRÜHEINHEIT FÜR AEG CAFAMOSA",
    vendor_product_description:
      "Wenn bei Ihrer AEG CaFamosa die Brühgruppe schwergängig ist oder der Kaffee im Tresterbehälter landet können Sie mit diesem Set den Fehler selbst beheben. Inkl. Anleitung zum runterladen. Bei den Kolbendichtungen handelt es sich um die neue Version in verbesserter Qualität.\n\nReparaturanleitungen finden Sie hier: Service Anleitungen\n\nLieferumfang:\n2x O-Ring für die Kolben der Brüheinheit\n2x O-Ring für den Druckschlauch\n2x O-Ring Steigrohr\n1x O-Ring Einlaufstutzen\n6g Multi Silikonfett (-45 bis 200°C)",
    vendor_product_delivery_info:
      "Verfügbar sofort ab Lager\nLieferzeit: 1-3 Tage1)",
    marks: ["AEG"],
    models: [
      [
        "CaFamosa CF80",
        "CaFamosa CF81",
        "CaFamosa CF85",
        "CaFamosa CF90",
        "CaFamosa CF95",
        "CaFamosa CF100",
        "CaFamosa CF120",
        "CaFamosa CF150",
        "CaFamosa CF200",
        "CaFamosa CF300",
        "CaFamosa CF400",
        "CaFamosa CF500",
      ],
    ],
  },
  {
    art_id: "556806A",
    name: "POMPA CP3 PENTRU AEG CAFAMOSA",
    description:
      "În cazul în care pompa unui aparat de cafea complet automat CaFamosa nu mai acumulează suficientă presiune, debitul devine mai slab și cafeaua nu mai are un gust la fel de bun. Un zgomot puternic de funcționare indică, de asemenea, o pompă defectă. Veți găsi mai jos, în recomandările de mai jos, garnitura corespunzătoare.\n\nConținutul livrării:\n\n1x pompă Invensys cp3a/st 230V/65W/50Hz",
    availability: "in-stock-ex",
    delivery_time: "5-8 zile",
    profit: 35,
    discount: null,
    images_nr: 1,
    category: "Pumpe-und-Fluidsystem",
    vendor_product_id: "556806A",
    vendor_product_price: 18.9,
    vendor_product_url:
      "https://www.juraprofi.de/AEG-Ersatzteile/CaFamosa-Ersatzteile/Pumpe-und-Fluidsystem/Pumpe-cp3-fuer-AEG-CaFamosa::6303.html",
    vendor_product_name: "PUMPE CP3 FÜR AEG CAFAMOSA",
    vendor_product_description:
      "Wenn bei CaFamosa Kaffeevollautomaten die Pumpe nicht mehr genug Druck aufbaut wird der Durchlauf schwächer und der Kaffee schmeckt nicht mehr so gut. Ein lautes Laufgeräusch deutet auch auf eine defekte Pumpe hin. Die passende Dichtung finden Sie weiter unten bei den Empfehlungen.\n\nLieferumfang:\n1x Pumpe Invensys cp3a/st 230V/65W/50Hz",
    vendor_product_delivery_info:
      "Verfügbar sofort ab Lager\nLieferzeit: 1-3 Tage1)",
    marks: ["AEG"],
    models: [
      [
        "CaFamosa CF80",
        "CaFamosa CF81",
        "CaFamosa CF85",
        "CaFamosa CF90",
        "CaFamosa CF95",
        "CaFamosa CF100",
        "CaFamosa CF120",
        "CaFamosa CF150",
        "CaFamosa CF200",
        "CaFamosa CF300",
        "CaFamosa CF400",
        "CaFamosa CF500",
      ],
    ],
  },
  {
    art_id: "58775A",
    name: "O-RING DE ETANȘARE PENTRU FURTUNUL DE PRESIUNE AEG CAFAMOSA",
    description:
      "Această garnitură se află pe toate conexiunile de furtun fixate cu o clemă la aparatele de cafea complet automate AEG CaFamosa.\n\nInstrucțiunile de reparare pot fi găsite aici: Instrucțiuni de service\n\nConținutul livrării:\n\n1x O-ring, așa cum se arată",
    availability: "in-stock-ex",
    delivery_time: "5-8 zile",
    profit: 35,
    discount: null,
    images_nr: 1,
    category: "Dichtungen",
    vendor_product_id: "58775A",
    vendor_product_price: 0.6,
    vendor_product_url:
      "https://www.juraprofi.de/AEG-Ersatzteile/CaFamosa-Ersatzteile/Dichtungen/O-Ring-Dichtung-fuer-die-AEG-CaFamosa-Druckschlaeuche::6104.html",
    vendor_product_name: "O-RING, DICHTUNG FÜR DIE AEG CAFAMOSA DRUCKSCHLÄUCHE",
    vendor_product_description:
      "Diese Dichtung befindet sich bei AEG CaFamosa Kaffeevollautomaten an allen Schlauchverbindungen die mit einer Klammer gesichert sind.\n\nReparaturanleitungen finden Sie hier: Service Anleitungen\n\nLieferumfang:\n1x O-Ring wie abgebildet",
    vendor_product_delivery_info:
      "Verfügbar sofort ab Lager\nLieferzeit: 1-3 Tage1)",
    marks: ["AEG"],
    models: [
      [
        "CaFamosa CF80",
        "CaFamosa CF81",
        "CaFamosa CF85",
        "CaFamosa CF90",
        "CaFamosa CF95",
        "CaFamosa CF100",
        "CaFamosa CF120",
        "CaFamosa CF150",
        "CaFamosa CF200",
        "CaFamosa CF300",
        "CaFamosa CF400",
        "CaFamosa CF500",
      ],
    ],
  },
];

export default async function handler(req, res) {
  let ax = axios.create({
    headers: {
      "Content-Type": "application/json",
      "api-key":
        "90d0bb27ed8fb76e7f157a3d0118eb9375c6ce7d3e3458e6609d488065b3ea178a4dea18b262ae71b5b2ee1920953f4fcd49188f44e27c09f008f65c32b762fbe3fcd64ad83ba89b78873ce73045ae527aa477c057d23385684ad3d61791ba479f38e45eb6b785507706c9d44ffd96fc7974bf10e83e07cc0a8b814aa7b8e257",
    },
  });
  if (req.method === "POST") {
    // Process a POST request

    res.status(200).json({ message: "only get request allowed" });
  } else {
    // Handle any other HTTP method
    const response = await axios.get(`${process.env.BACKEND_URL}/api/products`);
    // const data = response.json();
    console.log(response.data.data);
    res.status(200).json(response.data);
  }
}
[
  {
    ro_name: "Șuruburi și cleme",
    de_name: "Schraube-und-Klammer",
    main_category: 42,
  },
  {
    ro_name: "Garnituri Premium",
    de_name: "Dichtungen-Premium",
    main_category: 5,
  },
  { ro_name: "Pompa", de_name: "Pumpen", main_category: 4 },
];
