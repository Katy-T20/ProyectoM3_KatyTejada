
import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();

import { getFirstCharacterByName } from "./services/Api.js";

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
