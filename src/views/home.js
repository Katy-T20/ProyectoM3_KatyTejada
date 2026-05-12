
import { getFirstCharacterByName, getAllCharacters } from "../services/api.js";
import { toCharacterProfile } from "../transform/character.js";
import { renderCharacterCard } from "../ui/characterCard.js";
import { getUserMessage } from "../ui/messages.js";

//Local view status
const state = {
    status: "idle",
    profile: null,
    errorMessage: null,
    currentName: "Bugs Bunny",
};

export function renderHome() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <section class="view view--home">
            <h1>Chat with your favorite Character!</h1>
            <p>A friendly experience with iconic and funny characters</p>
            
            <div class="characterSelector">
                ${getAllCharacters()
                    .map(char => `
                        <button class="characterSelector__button ${state.currentName === char.name ? "characterSelector__button--active" : ""}" 
                                data-character="${char.name}"
                                ${state.status === "loading" ? "disabled" : ""}>
                            ${char.name}
                        </button>
                    `)
                    .join("")}
            </div>

            <div id="characterContainer">${renderContainer()}</div>

            <p style="text-align:center; margin-top: 2rem;">
                <a class="btn btn--primary" href="/chat">Let's start chatting</a>
            </p>
        </section>
    `;
    setupHome();

    if (state.status === "idle"){
        loadCharacter(state.currentName);
    }
}

//Container's render depending on the status
function renderContainer() {
    if (state.status === "loading") {
        return `<p class="homeStatus homeStatus--loading">Loading Character...</p>`;
    }
    if (state.status === "error") {
        return `<p class="homeStatus homeStatus--error">${state.errorMessage}</p>`;
    }

    return "";
}

//Helper to mute the status and re-render
function setState(updates) {
    Object.assign(state, updates);
    renderHome();
}

//Hooks the character selector buttons
function setupHome() {
    const buttons = document.querySelectorAll(".characterSelector__button");
    
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const characterName = button.getAttribute("data-character");
            
            setState({ currentName: characterName });
            loadCharacter(characterName);
        });
    });
}

async function loadCharacter(name) {
    setState({ status: "loading", errorMessage: null });

    try {

        const raw = await getFirstCharacterByName(name);

        const profile = toCharacterProfile(raw);
        applyThemeForCharacter(profile.name);

        setState({ status: "success", profile });
        localStorage.setItem("lastCharacterName", profile.name);
        localStorage.setItem("selectedCharacter", profile.name);
        const $container = document.querySelector("#characterContainer");
        renderCharacterCard($container, profile);
    }   catch (err) {

        setState({
            status: "error",
            errorMessage: getUserMessage(err),
        });
    }
}

/*THEME HANDLER (Bugs → Comic, Rocket → Neon)*/

function applyThemeForCharacter(name) {
    const lower = name.toLowerCase();

    // Limpia clases anteriores
    document.body.classList.remove("theme-bugs", "theme-rocket", "theme-transition", "theme-portal");

    // Activa animación
    document.body.classList.add("theme-transition", "theme-portal");

    if (lower.includes("bugs") || lower.includes("bunny")) {
        document.body.classList.add("theme-bugs");
        return;
    }

    if (lower.includes("rocket") || lower.includes("raccoon")) {
        document.body.classList.add("theme-rocket");
        return;
    }
}