export type numberRange10 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type colorRGB = `rgb(${number}, ${number}, ${number})`;
export type colorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type colorHEX = `#${string}`;
export type color = colorRGB | colorRGBA | colorHEX;

export type lineStyle = "solid" | "dashed" | "dotted";

export type position = "left" | "right" | "center" | undefined;