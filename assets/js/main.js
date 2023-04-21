const contentQuizz = document.querySelector(".container");
let createQuizz;
let listQuestions = [];



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
            <input type="text" class="title-input" placeholder="Título do seu quizz">
            <input type="text" class="url" placeholder="URL da imagem do seu quizz">
            <input type="text" class="amount-questions" placeholder="Quantidade de perguntas do quizz">
            <input type="text" class="amount-levels" placeholder="Quantidade de níveis do quizz">
        </div>
        <button onclick="renderQuestionsQuizz()">Prosseguir pra criar perguntas</button>
        </div>
    `
}

startQuizz()

function initialEntries(){
    // const title = document.querySelector(".title-input").value;
    // const url = document.querySelector(".url").value;
    // const amountQuestions = document.querySelector('.inputs .amount-questions').value;
    // const amountLevels = document.querySelector(".amount-levels").value;

    const title = "fdggggggggggggggggggggggggggggggggggdfgfdg";
    const url = "https://http.cat/411.jpg";
    const amountQuestions = 3;
    const amountLevels = 3;

    createQuizz.title = title;
    createQuizz.image = url;
    createQuizz.amountQuestions = parseInt(amountQuestions);
    createQuizz.amountLevels = parseInt(amountLevels);
}

function ValidBasicQuizzInformation(){

    const urlImageRegex = /^https:\/\/.*\.(jpg|jpeg|png)$/i;
    const tituloRegex = /^.{20,65}$/;

    if(!tituloRegex.test(createQuizz.title)){
        return false;
    }else if(!urlImageRegex.test(createQuizz.image)){
        // console.log("invalido")
        return false;
    }else if(createQuizz.amountQuestions < 3){
        // console.log("invalido")
        return false;
    }else if(createQuizz.amountLevels < 2){
        return false;
    }else{
        return true;
    }

}

function inputQuizzQuestions(){

    const numberQuestions = createQuizz.amountQuestions;
    for(let i = 1; i <= numberQuestions; i++){
        let dataQuestions = {};

        dataQuestions.title = document.querySelector(`.question-${i}-texto`).value
        dataQuestions.color = document.querySelector(`.question-${i}-color`).value

        
        dataQuestions.answers = [];

        answersObject = {
            "text": document.querySelector(`.question-${i}-correct-answer1 .answer`).value,
            "image": document.querySelector(`.question-${i}-correct-answer1 .url`).value,
            "isCorrectAnswer": true
        }

        dataQuestions.answers.push(answersObject)

        





        // let questionCorrect = document.querySelector(`question-${i}-correct-answer1`)






    }
}

inputQuizzQuestions()

function getQuestionsHTML(){
    initialEntries()
    if(!ValidBasicQuizzInformation()){
        alert("Dados inválidos, preencha com os dados corretos!")
        return;
    }
    const numberQuestions = createQuizz.amountQuestions;
    let questions = '';
    for(let i = 1; i <= numberQuestions; i++){
        questions += renderQuestionsRepeated(i)
    }

    return questions
   
}


function renderQuestionsQuizz(){
    let questionsHTML = getQuestionsHTML();

    contentQuizz.innerHTML = `
    <div class="page-create-quizz">
        <h3 class="title">Crie suas perguntas</h3>
        ${questionsHTML}
        <button class="next-create-level">Prosseguir pra criar níveis</button>
    </div>
    `
}


function renderQuestionsRepeated(index){
    const firstIndex = index
    let wholeQuestion;
    if(index !== 1){
        wholeQuestion = 'hidden'
    }

    return `
        <div class="subtitle inputs">
            <div class="title-icon">
                <h4 class="number-question">Pergunta ${firstIndex}</h4>
                <div class="icon">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div class="content-questions ${wholeQuestion}">
                <div class="create-answers">
                    <input type="text" class="question-${index}-texto" placeholder="Texto da pergunta" />
                    <input type="text" class="question-${index}-color" placeholder="Cor de fundo da pergunta" />
                </div>

                <h4 class="subtitle-answer">Resposta correta</h4>

                <div class="create-answers question-${index}-correct-answer1">
                    <input type="text" class="answer" placeholder="Resposta correta" />
                    <input type="text" class="url" placeholder="URL da imagem" />
                </div>

                <h4 class="subtitle-answer">Respostas incorretas</h4>

                <div class="create-answers question-${index}-incorrect-answer0">
                    <input type="text" class="answer" placeholder="Resposta incorreta 1" />
                    <input type="text" class="url" placeholder="URL da imagem 1" />
                </div>

                <div class="create-answers question-${index}-incorrect-answer1">
                    <input type="text" class="answer" placeholder="Resposta incorreta 2" />
                    <input type="text" class="url" placeholder="URL da imagem 2" />
                </div>

                <div class="create-answers question-${index}-incorrect-answer2">
                    <input type="text" class="answer" placeholder="Resposta incorreta 3" />
                    <input type="text" class="url" placeholder="URL da imagem 3" />
                </div>

            </div>
        </div>
    `
}
