
const characters = [
    {
        id: 1,
        name: "Bugs Bunny",
        status: "Active",
        species: "Rabbit",
        image: "https://upload.wikimedia.org/wikipedia/en/1/17/Bugs_Bunny.svg",
        origin: { name: "Looney Tunes" },
        location: { name: "Warner Bros. Studio" },
    },
    {
        id: 2,
        name: "Rocket Raccoon",
        status: "Active",
        species: "Raccoon",
        image: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2c/Rocket_Raccoon_Profile.png",
        origin: { name: "Halfworld" },
        location: { name: "Guardians of the Galaxy" },
    },
];

function normalizeName(name) {
    return name?.toString()?.trim().toLowerCase().replace(/[_\s]+/g, " ");
}

export async function getFirstCharacterByName(name) {
    const normalizedName = normalizeName(name);

    if (!normalizedName) {
        const err = new Error("No results");
        err.code = "NO_RESULTS";
        throw err;
    }

    const first = characters.find((character) =>
        normalizeName(character.name).includes(normalizedName)
    );

    if (!first) {
        const err = new Error("No results");
        err.code = "NO_RESULTS";
        throw err;
    }

    return first;
}