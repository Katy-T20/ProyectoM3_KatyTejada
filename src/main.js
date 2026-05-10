
import { router } from "./routes.js";
import { setupLinkInterception } from "./navigation.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();