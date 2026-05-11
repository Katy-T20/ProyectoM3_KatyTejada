
import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";
import { getFirstCharacterByName } from "./services/api.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();

(async () => {
    console.log("Looking for Rick...");
    try {
        const rick = await getFirstCharacterByName("rick");
        console.log("Result:", rick);
        console.log("Name:", rick.name);
        console.log("Origin (animated):", rick.origin?.name);
    } catch (err) {
        console.log("Error:", err.message, "| code:", err.code, "| status:", err.status);
    }
})();
