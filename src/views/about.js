
export function renderAbout() {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <section class="view view--about">
            <h1>About this proyect</h1>
            <p>This is a AI chat developed to explore a brief conversation with your favorite character</p>
            <p>The chosen character is <strong>Bugs Bunny</strong></p>
            <p>Stack: HTML, CSS, JavaScript  vanilla, Vercel Functions, Google Gemini</p>
        </section>
    `;
}