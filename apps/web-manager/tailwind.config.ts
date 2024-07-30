import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@spotfinder2/ui/tailwind.config")],
  content: ["src/**/*.{ts,tsx}", "../../libs/ui/src/**/*.{ts,tsx}"],
};
export default config;
