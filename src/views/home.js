
import { getFirstCharacterByName } from "../services/api.js";
import { toCharacterProfile } from "../transform/character.js";
import { renderCharacterCard } from "../ui/characterCard.js";
import { getUserMessage } from "../ui/messages.js";

//Local view status
const state = {
    status: "idle",
    profile: null,
    errorMessage: null,
    currentName: "Bugs_Bunny",
};

export function renderHome() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <section class="view view--home">
            <h1>Chat with your favorite Character!</h1>
            <p>A friendly experience with iconic and funny characters</p>
            
            <form class="characterForm" id="characterForm">
                <input
                    class="characterForm__input"
                    id="characterInput"
                    type="text"
                    value="${state.currentName}"
                    placeholder="Character's name"
                    aria-label="Character's name"
                    ${state.status === "loading" ? "disabled" : ""}
                />
                <button class="characterForm__button" type="submit"
                        ${state.status === "loading" ? "disabled" : ""}>
                    Change Character
                </button>
            </form>

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

//Hooks the form' listerner
function setupHome() {
    const $form = document.querySelector("#characterForm");
    const $input = document.querySelector("#characterInput");

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $input.value.trim();

        if (!name) {
            setState({
                status: "error",
                errorMessage: "Type a name to search.",
            });
            return;
        }

        setState({ currentName: name });
        loadCharacter(name);
    });
}

async function loadCharacter(name) {
    setState({ status: "loading", errorMessage: null });

    try {

        const raw = await getFirstCharacterByName(name);

        const profile = toCharacterProfile(raw);

        setState({ status: "success", profile });
        const $container = document.querySelector("#characterContainer");
        renderCharacterCard($container, profile);
    }   catch (err) {

        setState({
            status: "error",
            errorMessage: getUserMessage(err),
        });
    }
}