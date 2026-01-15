type Env = {
  port: number;
};

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value ?? fallback);

  // Keep the server usable even if PORT is missing or invalid.
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

export const env: Env = {
  port: parsePort(process.env.PORT, 4000),
};
