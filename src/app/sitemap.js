const base = "https://labgenie.ai";
const routes = ["", "/platform", "/manufacturers", "/integrations", "/security", "/about", "/careers", "/contact"];

export default function sitemap() {
  return routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
