export type AppConfig = {
  host: string;
  port: number;
  cors: string[];
};

export type SwaggerConfig = {
  title: string;
  description: string;
  version: string;
  tag: string;
  path: string;
};

export type AuthMailServiceConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};
