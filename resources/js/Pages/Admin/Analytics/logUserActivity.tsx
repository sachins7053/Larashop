import axios from "axios";

export const getUserData = async () => {
    const source = document.referrer || "Direct";
    const landing_page = window.location.pathname;
    const dateTime = new Date().toISOString();
    const time = dateTime.replace('T', ' ').substring(0, 19);
    const location = await getLocation();

    return { source, landing_page, time, location };
};

const getLocation = async (): Promise<string> => {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return `${data.city}, ${data.region}, ${data.country}`;
    } catch (error) {
        console.error("Location fetch error:", error);
        return "Unknown";
    }
};

export const logUserActivity = async () => {
    const userData = await getUserData();
    try {
        await axios.post("/api/user-activity", userData);
    } catch (error) {
        console.error("Error logging user activity:", error);
    }
};
