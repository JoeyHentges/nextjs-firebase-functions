export type Action = {
  type: string;
  error: {
    message: string;
  };
  payload: unknown;
};
