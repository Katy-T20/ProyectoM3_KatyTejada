
import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";
import { getFirstCharacterByName } from "./services/api.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();

(async () => {
    console.log("Looking for Bugs Bunny...");
    try {
        const bugsBunny = await getFirstCharacterByName("Bugs Bunny");
        console.log("Result:", bugsBunny);
        console.log("Name:", bugsBunny.name);
        console.log("Origin (animated):", bugsBunny.origin?.name);
    } catch (err) {
        console.log("Error:", err.message, "| code:", err.code, "| status:", err.status);
    }
})();
