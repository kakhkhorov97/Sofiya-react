/** Sonner Toast Handling **/

import { toast } from "sonner";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;

  toast.error(message);
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000,
) => {
  toast.success(msg, {
    duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000,
) => {
  toast.success(msg, {
    duration,
  });
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = "",
) => {
  if (show_button) {
    toast.error(msg, {
      duration: Infinity,
      action: {
        label: "OK",
        onClick: () => {
          if (forward_url !== "") {
            window.location.replace(forward_url);
          }
        },
      },
    });
  } else {
    toast.error(msg, {
      duration: 2000,
      onAutoClose: () => {
        if (forward_url !== "") {
          window.location.replace(forward_url);
        }
      },
    });
  }
};
