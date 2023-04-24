/* Import onclick functions */
import { displayQuizPage, createQuizz, editQuiz, deleteQuiz } from "./first-page.js";
import { getQuizById, selectCard, resetQuiz, toggleQuizPage } from "./quiz-page.js";
import { validateInputLevels, toggleQuestion, renderLevelsQuizz, renderQuestionsQuizz, returnToHome } from "./create-quiz.js";

function startAxios() {

    /* Start axios configuration */
    const token = 'aNWJQMxCMeOOL5Y0ThO5bESy';
    axios.defaults.headers.common['Authorization'] = token;
}

function getIndexByClassList(item) {

    /* Return index value from quiz/question/anwser */
    return Number(item.classList[1].split("-")[1]);
}

function toggleCreateQuiz() {

    const firstPageContainer = document.querySelector(".first-page-container");
    const contentQuizz = document.querySelector(".container");

    firstPageContainer.classList.remove("hidden");
    contentQuizz.classList.add("hidden");
}

/* 
 *  Global functions
 */

/* First-page.js functions */
window.displayQuizPage = displayQuizPage;
window.createQuizz = createQuizz;
window.editQuiz = editQuiz;
window.deleteQuiz = deleteQuiz;

/* Quiz-page.js functions */
window.getQuizById = getQuizById;
window.selectCard = selectCard;
window.resetQuiz = resetQuiz;
window.toggleQuizPage = toggleQuizPage;

/* Create-quiz.js functions */
window.validateInputLevels = validateInputLevels;
window.toggleQuestion = toggleQuestion;
window.renderLevelsQuizz = renderLevelsQuizz;
window.renderQuestionsQuizz = renderQuestionsQuizz;
window.toggleCreateQuiz = toggleCreateQuiz;
window.returnToHome = returnToHome;

export { startAxios, getIndexByClassList, toggleCreateQuiz };