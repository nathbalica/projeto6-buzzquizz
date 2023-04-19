
function selectCard(selector) {

    const parentNode = selector.parentNode;
    if (!parentNode.classList.contains("selected-card")) {

        /*  To-do: Check boolean value from server (isCorrectAnswer) */

        const cards = parentNode.querySelectorAll(".card-content");
        cards.forEach(card => {

            if (card.innerHTML !== selector.innerHTML) {
                card.classList.add("card-opacity");
            }

            if (card.classList.contains("isCorrectAnswer")) {
                card.classList.add("correct-answer");
            }
            else {
                card.classList.add("wrong-answer");
            }
        });
        parentNode.classList.add("selected-card");
    }
}

function resetQuiz() {

    /*  Get all question cards from quiz page content and reset 
     *  classes and styles from selectCard function. */

    const questionCards = document.querySelector(".quiz-page-content").querySelectorAll(".card-questions");
    questionCards.forEach(questionCard => {

        questionCard.classList.remove("selected-card");

        const cards = questionCard.querySelectorAll(".card-content");
        cards.forEach(card => {

            if (card.classList.contains("card-opacity")) {
                card.classList.remove("card-opacity");
            }

            if (card.classList.contains("isCorrectAnswer")) {
                card.classList.remove("correct-answer");
            }
            else {
                card.classList.remove("wrong-answer");
            }
        });
    });
}