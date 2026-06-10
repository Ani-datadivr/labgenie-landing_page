import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Keystatic's read/write API (content reads, GitHub OAuth callback, commits).
export const { POST, GET } = makeRouteHandler({ config });
