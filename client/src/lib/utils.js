import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const getErrorMessage = (error) => {
    let message = error?.message;
    if (error.message === "Network Error") {
        message =
            "Network error! Please check your internet connection and try again.";
    }
    else if (error?.response?.data) {
        message = error?.response?.data || error?.response?.data?.message;
    }
    return message;
};
