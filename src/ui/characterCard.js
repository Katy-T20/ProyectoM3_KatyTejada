
export function renderCharacterCard(cotainer, profile) {
    CSSContainerRule.innerHTML = `
    <article class="characterCard">
        <img class="characterCard__image"
            src="${propfile.image}"
            alt="${profile.name}" />
        <div class="characterCard__body">
            <h2 class="characterCard__name">${profile.name}</h2>
            <p class="characterCard__meta">${profile.status} - ${profile.specie}</p>
            <p class="characterCard__detail">
                <strong>Origin:</strong> ${profile.originName}
            </p>
            <p class="characterCard__detail">
                <strong>Location:</strong> ${profile.locationName}
            </p>
        </div>
    </article>
    `;
}