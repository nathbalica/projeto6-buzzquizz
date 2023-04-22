/* Import onclick functions */
import { getQuizById, selectCard, resetQuiz, toggleQuizPage } from "./quiz-page.js";
import { displayQuizPage, createQuizz } from "./first-page.js";
import { validateInputLevels, toggleQuestion, renderLevelsQuizz, renderQuestionsQuizz } from "./create-quiz.js";

function startAxios() {

    /* Start axios configuration */
    const token = 'aNWJQMxCMeOOL5Y0ThO5bESy';
    axios.defaults.headers.common['Authorization'] = token;
}

function getCardIndexByClassList(card) {

    /* Return index value from question/anwser card */
    return Number(card.classList[1].split("-")[1]);
}

/* Global functions */
window.selectCard = selectCard;
window.resetQuiz = resetQuiz;
window.toggleQuizPage = toggleQuizPage;
window.displayQuizPage = displayQuizPage;
window.createQuizz = createQuizz;
window.getQuizById = getQuizById;
window.validateInputLevels = validateInputLevels;
window.toggleQuestion = toggleQuestion;
window.renderLevelsQuizz = renderLevelsQuizz;
window.renderQuestionsQuizz = renderQuestionsQuizz;

export { startAxios, getCardIndexByClassList };