
export function getUserMessage(error) {

    if (error?.code === "NO RESULTS") {
        return "I can't find that character's name. Try a different one.";
    }

    if (error?.status === 404) {
        return "The character you're looking for does not exist.";
    }

    if (error?.status == 429) {
        return "AI is saturated. Try again in a  minute";
    }

    if (error?.status >= 500) {
        return "The API is having some issues. Try again in a few minutes.";
    }

    if (error?.name === "TypeError" && error.message.includes("fetch")) {
        return "We couldn't connect with the API. Double check your connection.";
    }

    return "Something went wrong. Try again.";
}