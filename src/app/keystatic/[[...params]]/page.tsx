"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

// Keystatic admin UI, mounted at /keystatic. Outside the (site) route group, so
// it renders without the marketing nav/footer/smooth-scroll.
//
// 'use client' is required here: the @keystatic UI packages don't ship a client
// boundary in this version, so without it Next resolves the admin to a
// server-only stub that renders null (blank screen). Forcing the page into the
// client graph makes @keystatic/core/ui resolve to the real browser build.
export default makePage(config);
