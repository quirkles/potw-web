import { Baskervville, Overpass_Mono, Rubik } from "next/font/google";

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const baskerville = Baskervville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export { overpassMono, baskerville, rubik };
