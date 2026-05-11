
import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";
import { getFirstCharacterByName } from "./services/api.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();

(async () => {
    console.log("Looking for Bugs_Bunny...");
    try {
        const Bugs_Bunny = await getFirstCharacterByName("Bugs_Bunny");
        console.log("Result:", Bugs_Bunny);
        console.log("Name:", Bugs_Bunny.name);
        console.log("Origin (animated):", Bugs_Bunny.origin?.name);
    } catch (err) {
        console.log("Error:", err.message, "| code:", err.code, "| status:", err.status);
    }
})();
