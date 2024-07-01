import { Id } from "./types";

export const round = (value: number, fraction: number = 0): number => (
  Math.round(value * 10**fraction) / 10**fraction
);

export const random = (min: number, max: number, fraction: number = 0): number => (
  round((Math.random() * (max - min + 1) + min), fraction)
);

export const generateId =  (): Id  => Math.random().toString(16).slice(2);