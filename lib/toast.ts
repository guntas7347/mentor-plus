import toast from "react-hot-toast";

export const notify = {
  success: (msg: string) => toast.success(msg),

  error: (msg: string) => toast.error(msg),

  loading: (msg: string) => toast.loading(msg),

  dismiss: (id?: string) => toast.dismiss(id),

  promise: async <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => string);
    },
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },
};
