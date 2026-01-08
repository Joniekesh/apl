import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../lib/makeRequest";
const Dashboard = () => {
    const fetchProfile = async () => {
        try {
            const res = await makeRequest.get("/user/me");
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    });
    console.log("PROFILE", data);
    return _jsx("div", { children: "Dashboard" });
};
export default Dashboard;
