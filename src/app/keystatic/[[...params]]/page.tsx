import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

// Keystatic admin UI, mounted at /keystatic. Outside the (site) route group, so
// it renders without the marketing nav/footer/smooth-scroll.
export default makePage(config);
