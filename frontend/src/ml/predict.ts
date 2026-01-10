interface Features {
  restaurant: string | null;
  cuisine: string | null;
  day: string | null;
}

export const predict = (features: Features): number => {
  // TODO: replace with actual ML logic
  return Math.floor(Math.random() * 60); // dummy prediction
};
