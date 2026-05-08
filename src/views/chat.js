
export function renderChat() {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <div class="chatApp">
            <header class="chatHeader">
                <h1 class="chatHeader__title">Chat</h1>
                <p class="chatHeader__subtitle">With your favorite character</p>
            </header>

            <main class="chatMessages" aria-label="Messages">
                <div class="message message--character">Hey there, how can I help you?</div>
                <div class="message message--user">I want to practice responsive design</div>
                <div class="message message--character">Perfect! Let's start with mobile-first</div>
                <div class="message message--user">Why mobile-first?</div>
                <div class="message message--character">Because small screens are the most restrictive cases. If it works on small screens, it is easier to scale up</div>
                <div class="message message--user">what about viewport?</div>
                <div class="message message--character">Meta viewport tells the browser to use the device's width and height as needed</div>
                <div class="message message--user">Flexbox or Grid?</div>
                <div class="message message--character">Both are great options. Flexbox is better for one-dimensional layouts, while Grid is better for two-dimensional layouts.</div>
            </main>

            <form class="chatComposer">
                <input
                    class="chatComposer__input"
                    type="text"
                    placeholder="Type a message..."
                    aria-label="Type your message" 
                />
                <button class="chatComposer__send" type="submit">Send</button>
            </form>
        </div>
    `;
}