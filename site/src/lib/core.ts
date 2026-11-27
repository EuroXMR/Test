// Shared geometry for the core graphics (SVG, 3D, rail): one source for depths and colours.
import { intervals } from "../content/content";

export const TOTAL_DEPTH = intervals[intervals.length - 1].to;

// Rock tones for the core itself. Slightly greyed versions of the accents so the
// core reads as stone, not as a chart.
export const ROCK: Record<string, string> = {
  iron: "#8f5a49",
  slate: "#5d6b76",
  ochre: "#a88b5c",
  basalt: "#55585b",
  quartz: "#c9c3b6",
};

export const fmtDepth = (m: number) => m.toFixed(1);

/** Fixed break positions (m) so the core looks like real broken core pieces. */
export const BREAKS = [9.1, 23.6, 38.2, 51.5, 63.0];
