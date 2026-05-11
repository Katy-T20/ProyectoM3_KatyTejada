
export function renderHome() {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <section class="view view--home">
            <h1>Chat with your favorite Character!</h1>
            <p>A friendly experience with one of the most iconic characters</p>
            <p>You will have the opportunity to talk to Bugs Bunny, Rocket the Racoon</p>
            <a class="btn btn--primary" href="/chat">Let's start chatting</a>
        </section>
    `;
}