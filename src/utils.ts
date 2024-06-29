import { Id } from "./types";

export const random = (min: number, max: number, fraction: number = 0): number => (
  Math.floor((Math.random() * (max - min + 1) + min) * 10 ** fraction) / 10 ** fraction
);

export const generateId =  (): Id  => Math.random().toString(16).slice(2);