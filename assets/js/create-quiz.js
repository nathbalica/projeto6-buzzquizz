import { toggleCreateQuiz } from "./main.js";
import { getQuizById } from "./quiz-page.js";
import { getQuizzes } from "./first-page.js";


const contentQuizz = document.querySelector(".container");
const loadingScreen = document.querySelector(".loading-screen");
let createQuizz;
let listQuestions = [];
let listLevels = [];

function startQuizz(){

    createQuizz = {
        title: "",
        image: "",
        amountQuestions: 0,
        amountLevels: 0
    }
    
    contentQuizz.innerHTML = `
        <div class="page-create-quizz">
        <h3 class="title">Comece pelo começo</h3>
        <div class="inputs">
            <input type="text" data-test="title-input" class="title-input" placeholder="Título do seu quizz">
            <input type="text" data-test="img-input" class="url" placeholder="URL da imagem do seu quizz">
            <input type="text" data-test="questions-amount-input" class="amount-questions" placeholder="Quantidade de perguntas do quizz">
            <input type="text" data-test="levels-amount-input" class="amount-levels" placeholder="Quantidade de níveis do quizz">
        </div>
        <button data-test="go-create-questions" onclick="renderQuestionsQuizz()">Prosseguir pra criar perguntas</button>
        </div>
    `;
}

function validBasicQuizzInformation(){

    const title = document.querySelector(".title-input").value;
    const url = document.querySelector(".url").value;
    const amountQuestions = document.querySelector('.inputs .amount-questions').value;
    const amountLevels = document.querySelector(".amount-levels").value;

    createQuizz.title = title;
    createQuizz.image = url;
    createQuizz.amountQuestions = parseInt(amountQuestions);
    createQuizz.amountLevels = parseInt(amountLevels);

    const tituloRegex = /^.{20,65}$/;

    if(!tituloRegex.test(createQuizz.title)){
        alert("O título deve conter entre 20 e 65 caracteres.");
        return false;
    }else if(!validateUrl(createQuizz.image)){
        alert("A URL da imagem não é válida.");
        // console.log("invalido")
        return false;
    }else if(createQuizz.amountQuestions < 3 || createQuizz.amountQuestions === ''){
        alert("O número mínimo de perguntas é 3.");
        // console.log("invalido")
        return false;
    }
    else if(!createQuizz.amountQuestions){
        alert(`Por favor, preencha o campo Quantidade de perguntas do quizz`)
        return false;

    }
    else if(!createQuizz.amountLevels){
        alert(`Por favor, preencha o campo Quantidade de Niveis do quizz:`)
        return false;

    }else if(createQuizz.amountLevels < 2 || createQuizz.amountLevels === ''){
        alert("O número mínimo de níveis é 2.");
        return false;
    }else{
        return true;
    }
}

function validateUrl(url) {
    return url.match(/^(?:(?:https?):\/\/)?(?:[\w-]+\.)+[a-z]{2,12}(?:\/(?:[\w_.-]+)?)*(?:\?(?:[\w-]+=[\w-]+(?:&[\w-]+=[\w-]+)*))?(?:#[\w-]+)?$/i);
}

function inputQuizzQuestions(){

    listQuestions = [];

    const numberQuestions = createQuizz.amountQuestions;

    for(let i = 1; i <= numberQuestions; i++){
        let dataQuestions = {
            title: '',
            color: '',
            answers: []
          };

        dataQuestions.title = document.querySelector(`.question-${i}-texto`).value
        dataQuestions.color = document.querySelector(`.question-${i}-color`).value

        // Validação do texto da pergunta
        if (dataQuestions.title.length < 20) {
            alert("Por favor, insira um texto de pergunta com no mínimo 20 caracteres");
            return false;
        }

        // Validação da cor de fundo
        if (!dataQuestions.color.match(/^#[0-9A-F]{6}$/i)) {
            alert("Por favor, insira uma cor em formato hexadecimal (exemplo: #FFA500)");
            return false;
        }

        const answersCorrect = {
            "text": document.querySelector(`.question-${i}-correct-answer1 .answer`).value,
            "image": document.querySelector(`.question-${i}-correct-answer1 .url`).value,
            "isCorrectAnswer": true
        }

        const isValidAnswerImage = validateUrl(answersCorrect.image);

        // Validação da resposta correta
        if (answersCorrect.text === "" || answersCorrect.image === "" || !isValidAnswerImage) {
            alert("Por favor, preencha os dados da resposta correta corretamente");
            return false;
        }

        dataQuestions.answers.push(answersCorrect);

        console.log("Inserindo as respostas corretas:\n")
        console.log("dataQuestions:", dataQuestions)
        console.log("ListQuestion:", listQuestions)

        for(let j = 0; j < 3; j++){
            let answerText = document.querySelector(`.question-${i}-incorrect-answer${j} .answer`).value;
            let answerImage = document.querySelector(`.question-${i}-incorrect-answer${j} .url`).value;
            

            if (answerText.trim() === '' || answerImage.trim() === '') {
                continue; // Skip adding empty answer to dataQuestions
              }

            let answersIncorrect = {
                "text": answerText,
                "image": answerImage,
                "isCorrectAnswer": false
            }
            
            const isValidAnswerImageIncorrect = validateUrl(answersIncorrect.image);
            if(!isValidAnswerImageIncorrect){
                alert("Por favor, preencha os dados da resposta incorreta corretamente");
                return false;
            }
            dataQuestions.answers.push(answersIncorrect)
        }

        
        if (dataQuestions.answers.filter(answer => answer.isCorrectAnswer).length === 0) {
            alert("Por favor, selecione a resposta correta para a pergunta");
            return false;
          }
    
        if (dataQuestions.answers.filter(answer => answer.isCorrectAnswer === false).length < 1) {
            alert("Por favor, escreva pelo menos uma alternativa falsa!");
            return false;
          }
    
        listQuestions.push(dataQuestions)
    }
    return true;
}

function getQuestionsHTML(){
    if(!validBasicQuizzInformation()){
        return;
    }
    const numberQuestions = createQuizz.amountQuestions;
    let questions = '';
    for(let i = 1; i <= numberQuestions; i++){
        questions += renderQuestionsRepeated(i);
    }

    return questions;
}

function renderQuestionsQuizz(){
    if(!validBasicQuizzInformation()){
        return;
    }
    let questionsHTML = getQuestionsHTML();

    contentQuizz.innerHTML = `
    <div class="page-create-quizz">
        <h3 class="title">Crie suas perguntas</h3>
        ${questionsHTML}
        <button data-test="go-create-levels" class="next-create-level" onclick="renderLevelsQuizz()">Prosseguir pra criar níveis</button>
    </div>
    `;
}

function toggleQuestion(event) {
    const icon = event.target;
    const content = icon.closest('.title-icon').nextElementSibling;
    content.classList.toggle('hidden');
}

function renderQuestionsRepeated(index){

    let wholeQuestion, hiddenIcon;
    if(index !== 1){
        wholeQuestion = 'hidden';
    }
    if(index === 1){
        hiddenIcon = 'hidden'
    }

    return `
        <div data-test="question-ctn" class="subtitle inputs">
            <div class="title-icon">
                <h4 class="number-question">Pergunta ${index}</h4>
                <div class="icon ${hiddenIcon}" data-test="toggle" onclick="toggleQuestion(event)">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div class="content-questions ${wholeQuestion}">
                <div class="create-answers">
                    <input type="text" data-test="question-input" class="question-${index}-texto" placeholder="Texto da pergunta" />
                    <input type="text" data-test="question-color-input" class="question-${index}-color" placeholder="Cor de fundo da pergunta" />
                </div>

                <h4 class="subtitle-answer">Resposta correta</h4>

                <div class="create-answers question-${index}-correct-answer1">
                    <input data-test="correct-answer-input" type="text" class="answer" placeholder="Resposta correta" />
                    <input data-test="correct-img-input" type="text" class="url" placeholder="URL da imagem" />
                </div>

                <h4 class="subtitle-answer">Respostas incorretas</h4>

                <div class="create-answers question-${index}-incorrect-answer0">
                    <input data-test="wrong-answer-input" type="text" class="answer" placeholder="Resposta incorreta 1" />
                    <input data-test="wrong-img-input" type="text" class="url" placeholder="URL da imagem 1" />
                </div>

                <div class="create-answers question-${index}-incorrect-answer1">
                    <input data-test="wrong-answer-input" type="text" class="answer" placeholder="Resposta incorreta 2" />
                    <input data-test="wrong-img-input" type="text" class="url" placeholder="URL da imagem 2" />
                </div>

                <div class="create-answers question-${index}-incorrect-answer2">
                    <input data-test="wrong-answer-input" type="text" class="answer" placeholder="Resposta incorreta 3" />
                    <input data-test="wrong-img-input" type="text" class="url" placeholder="URL da imagem 3" />
                </div>

            </div>
        </div>
    `;
}

function inputQuizzLevels(){
    listLevels = [];
    const numberLevels = createQuizz.amountLevels;
    let hasZeroPercentLevel = false;
    console.log(numberLevels)
    for(let i = 1; i <= numberLevels; i++){
        const dataLevels = {
            "title": document.querySelector(`.nivel${i}-text`).value,
            "image": document.querySelector(`.nivel${i}-url`).value,
            "text": document.querySelector(`.nivel${i}-description`).value,
            "minValue": parseInt(document.querySelector(`.nivel${i}-hits`).value)
        };

        // Validando Título do nível
        if (dataLevels.title.length < 10) {
            alert("O título do nível deve ter no mínimo 10 caracteres.");
            return false;
        }
    
        // Validando % de acerto mínima
        if (dataLevels.minValue < 0 || dataLevels.minValue > 100) {
            alert("A % de acerto mínima deve ser um número entre 0 e 100.");
            return false;
        }
    
        if (dataLevels.minValue === 0) {
            hasZeroPercentLevel = true;
        }
    
        // Validando URL da imagem do nível
        if (!validateUrl(dataLevels.image)) {
            alert("A URL da imagem do nível deve ter formato de URL.");
            return false;
        }
    
        // Validando Descrição do nível
        if (dataLevels.text.length < 30) {
            alert("A descrição do nível deve ter no mínimo 30 caracteres.");
            return false;
        }

        listLevels.push(dataLevels);
    }


    if (!hasZeroPercentLevel) {
      alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
      return false;
    }
    return true;
}

function getLevelsHTML(){

    const numberLevels = createQuizz.amountLevels;
    let levels = '';
    for(let i = 1; i <= numberLevels; i++){
        levels += renderLevelsRepeated(i);
    }

    return levels;
}

function renderLevelsQuizz(){
    if(!inputQuizzQuestions()){
        return;
    }

    let levelsHTML = getLevelsHTML();

    contentQuizz.innerHTML = `
    <div class="page-create-quizz levels">
    <h3 class="title">Agora, decida os níveis</h3>
        ${levelsHTML}
        <button data-test="finish" class="next-create-level" onclick="validateInputLevels()">Finalizar Quizz</button>
    </div>
    `;
}


function renderLevelsRepeated(index){
    let wholeLevel;
    if(index !== 1){
        wholeLevel = 'hidden';
    }
    if(index === 1){
        hiddenIcon = 'hidden'
    }
    return `
        <div data-test="level-ctn" class="subtitle inputs">
            <div data-test="toggle" class="title-icon" onclick="toggleQuestion(event)">
                <h4 class="number-question">Nivel ${index}</h4>
                <div class="icon ${hiddenIcon}">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div class="content-questions ${wholeLevel}">
                <div class="create-answers">
                    <input data-test="level-input" type="text" class="nivel${index}-text" placeholder="Título do nível" />
                    <input data-test="level-percent-input" type="text" class="nivel${index}-hits" placeholder="% de acerto mínima" />
                    <input data-test="level-img-input" type="text" class="nivel${index}-url" placeholder="URL da imagem do nível" />
                    <input data-test="level-description-input" type="text" class="nivel${index}-description" placeholder="Descrição do nível" />
                </div>
            </div>
        </div>
    `;
}

function validateInputLevels(){
    if(!inputQuizzLevels()){
        return;
    }
    saveDataQuizz();
}

function saveDataQuizz(){
    const saveData = {
        title: createQuizz.title,
        image: createQuizz.image,
        questions: listQuestions,
        levels: listLevels
    }

    document.querySelector(".levels").classList.add("hidden");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    loadingScreen.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    console.log(saveData);
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', saveData);
    console.log(saveData)
    promise.then(response => {
        AnswerWorked(response);
        storeUserCreatedQuizId(response.data.id, response.data.key);
    });
}

function AnswerWorked(response){
    console.info(`Quiz ${response.data.key} criado com Sucesso!!!`);
    loadingScreen.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    return response.data;
}

function storeUserCreatedQuizId(id, key) {
    const storedIds = JSON.parse(localStorage.getItem("id")) || [];
    const quizIndex = storedIds.findIndex(quiz => quiz.id === id);
    
    if (quizIndex === -1) {
      storedIds.push({ id, key });
      localStorage.setItem("id", JSON.stringify(storedIds));
      renderAcessQuizz(id);
    }

    loadingScreen.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");

    return storedIds.map((quiz) => ({ id: quiz.id, key: quiz.key }));
}

function returnToHome() {
    const firstPageContainer = document.querySelector(".first-page-container");
    const createQuizcontainer = document.querySelector(".container");
    createQuizcontainer.classList.add('hidden');
    firstPageContainer.classList.remove('hidden');
    loadingScreen.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    getQuizzes();
}

function renderAcessQuizz(id){
    contentQuizz.innerHTML = `
    <div data-test="success-banner" class="page-create-quizz">
        <h3 class="title">Seu quizz está pronto!</h3>
        <div class="quizz-preview onclick="getQuizById(${id})">
            <img src="${createQuizz.image}"/>
            <h4 class="title-quizz">${createQuizz.title}</h4>
        </div>
        <button data-test="go-quiz" class="acess-quizz" onclick="getQuizById(${id})">Acessar Quizz</button>
        <button data-test="go-home" class="back-home" onclick="returnToHome()">Voltar pra home</button>

    </div>
    `;
}

export { startQuizz, validateInputLevels, toggleQuestion, renderLevelsQuizz, renderQuestionsQuizz, returnToHome };