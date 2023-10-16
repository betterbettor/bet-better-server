export interface ResponseData<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

export const parseResponse = <T>(msg: string, data: T): ResponseData<T> => {
  return {
    success: true,
    status: 200,
    message: msg,
    data,
  };
};

export const isInvalidResponse = (data: any[]): boolean => {
  return data === null || data.length === 0;
};

export const parseErrorResponse = (msg: string): ResponseData<undefined> => {
  return {
    success: false,
    status: 400,
    message: msg,
  };
};

export const errorHandler = (err: { status: number; message: string }, req: Request, res: Response): any => {
  const code = err.status ?? 500;
  return {
    success: false,
    status: code,
    message: err.message,
  };
};
