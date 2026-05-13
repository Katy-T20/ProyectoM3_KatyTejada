
export function renderAbout() {
    const app = document.querySelector("#app");
    app.innerHTML = `
        <section class="view view--about">
            <div class="aboutHero">
                <h1>About This Project</h1>
                <p class="aboutHero__subtitle">Chat with iconic characters powered by AI</p>
            </div>

            <div class="aboutContent">
                <div class="aboutSection">
                    <h2>What is this?</h2>
                    <p>An interactive Single Page Application that lets you have conversations with beloved characters. Each character has its own unique personality and way of responding—crafted with detailed system prompts to stay true to their essence.</p>
                </div>

                <div class="aboutCharacters">
                    <h2>Meet the Characters</h2>
                    <div class="aboutCharGrid">
                        <div class="aboutCharCard">
                            <h3>🐰 Bugs Bunny</h3>
                            <p><strong>Origin:</strong> Looney Tunes</p>
                            <p class="aboutCharCard__desc">The clever trickster rabbit with a Brooklyn accent. Quick-witted, sarcastic, and always in control of the joke.</p>
                        </div>
                        <div class="aboutCharCard">
                            <h3>🚀 Rocket Raccoon</h3>
                            <p><strong>Origin:</strong> Guardians of the Galaxy</p>
                            <p class="aboutCharCard__desc">A brilliant engineer with explosive humor. Sarcastic, loud, and secretly caring beneath a rough exterior.</p>
                        </div>
                    </div>
                </div>

                <div class="aboutSection">
                    <h2>The Stack</h2>
                    <div class="aboutStackGrid">
                        <div class="aboutStackItem">
                            <span class="aboutStackItem__icon">🎨</span>
                            <span><strong>Frontend:</strong> Vanilla JS, HTML, CSS</span>
                        </div>
                        <div class="aboutStackItem">
                            <span class="aboutStackItem__icon">⚡</span>
                            <span><strong>Backend:</strong> Vercel Functions</span>
                        </div>
                        <div class="aboutStackItem">
                            <span class="aboutStackItem__icon">🤖</span>
                            <span><strong>AI:</strong> Google Gemini 2.5 Flash</span>
                        </div>
                        <div class="aboutStackItem">
                            <span class="aboutStackItem__icon">☁️</span>
                            <span><strong>Hosting:</strong> Vercel</span>
                        </div>
                    </div>
                </div>

                <div class="aboutSection">
                    <h2>Features</h2>
                    <ul class="aboutFeatures">
                        <li>✨ Dynamic character selection with visual themes</li>
                        <li>💬 Real-time AI-powered conversations</li>
                        <li>🎨 Character-specific themes that change the UI</li>
                        <li>📱 Responsive design for all devices</li>
                        <li>⚙️ System prompts that keep characters in character</li>
                        <li>💾 Persistent chat history during sessions</li>
                    </ul>
                </div>

                <div class="aboutCTA">
                    <p>Ready to chat?</p>
                    <a class="btn btn--primary" href="/">Go to Home</a>
                </div>
            </div>
        </section>
    `;
}