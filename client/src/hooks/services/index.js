import { toast } from "sonner";
import { makeRequest } from "../../lib/makeRequest";
import { getErrorMessage } from "../../lib/utils";
export const logout = async () => {
    try {
        const res = await makeRequest.post("/auth/logout");
        if (res.status === 200) {
            localStorage.removeItem("user");
        }
    }
    catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));
    }
};
