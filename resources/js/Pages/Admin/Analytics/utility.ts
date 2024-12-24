export const getUserData = async () => {
    const source = document.referrer || "Direct";
    const landingPage = window.location.pathname;
    const time = new Date().toISOString();
    const location = await getLocation();

    return { source, landingPage, time, location };
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
