import Estimate from "../src/components/ReparoPage/Estimate";
import Gallery from "../src/components/ReparoPage/Gallery";
import  Head  from "next/head";
export default function Reparo() {
  return (
    <><Head>
      <title>Reparo (Atelierul Art Cafe)</title>
        <meta name="description" content="Estimare cost gratuită pentru reparații aparate de cafea. Servicii rapide și eficiente pentru o cafea perfectă în fiecare dimineață!
Revitalizăm aparatul tău de cafea automat, pentru o aromă și o funcționare perfectă!" />
      <meta property="og:title" content="Reparo (Atelierul Art Cafe)" />
    <meta property="og:description" content="Estimare cost gratuită pentru reparații aparate de cafea. Servicii rapide și eficiente pentru o cafea perfectă în fiecare dimineață!
Revitalizăm aparatul tău de cafea automat, pentru o aromă și o funcționare perfectă!"  />
    <meta property="og:image" itemprop="image" content={`${process.env.NEXT_PUBLIC_URL}/assets/estimate/cleaning.png`}/>
    <meta property="og:updated_time" content="1681823297"/></Head>
    <div style={{ marginTop: "5em" }}>
      <Estimate />
      <Gallery />
    </div>
    </>
  );
}
