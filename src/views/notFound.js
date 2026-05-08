
export function renderNotFound() {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <section class="view view--notFound">
        <h1>404 - Route not found</h1>
        <p>The page you are searching for does not exist</p>
        <a class="btn btn--primary" href="/">Return to Home</a>
        </section>
    `;
}