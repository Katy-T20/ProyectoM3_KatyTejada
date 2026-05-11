
import { getFirstCharacterByName } from "../services/api.js";
import { toCharacterProfile } from "../transform/character.js";
import { renderCharacterCard } from "../ui/characterCard.js";
import { getUserMessage } from "../ui/messages.js";

//Local view status
const state = { 
    status = "idle",
    profile: null,
    errorMessage: null,
    currentName: "Rick",
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
                    placeholder="Character's Name"
                    arial-label="Character's Name"
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