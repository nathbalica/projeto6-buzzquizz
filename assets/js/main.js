const contentQuizz = document.querySelector(".container");
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

function validBasicQuizzInformation(){

    // const title = document.querySelector(".title-input").value;
    // const url = document.querySelector(".url").value;
    // const amountQuestions = document.querySelector('.inputs .amount-questions').value;
    // const amountLevels = document.querySelector(".amount-levels").value;

    const title = "fdgggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag";
    const url = "https://http.cat/411.jpg";
    const amountQuestions = 3;
    const amountLevels = 3;


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
    }else if(createQuizz.amountQuestions < 3){
        alert("O número mínimo de perguntas é 3.");
        // console.log("invalido")
        return false;
    }else if(createQuizz.amountLevels < 2){
        alert("O número mínimo de níveis é 2.");
        return false;
    }else{
        return true;
    }

}

function validateUrl(url) {
    return url.match(/^https:\/\/.*\.(jpg|jpeg|png)$/i);
  }

function inputQuizzQuestions(){

    const numberQuestions = createQuizz.amountQuestions;
    for(let i = 1; i <= numberQuestions; i++){
        let dataQuestions = {};

        dataQuestions.title = document.querySelector(`.question-${i}-texto`).value

        // Validação do texto da pergunta
        if (dataQuestions.title.length < 20) {
            alert("Por favor, insira um texto de pergunta com no mínimo 20 caracteres");
            return;
        }

        dataQuestions.color = document.querySelector(`.question-${i}-color`).value

        // Validação da cor de fundo
        if (!dataQuestions.color.match(/^#[0-9A-F]{6}$/i)) {
            alert("Por favor, insira uma cor em formato hexadecimal (exemplo: #FFA500)");
            return;
        }

        dataQuestions.answers = [];

        let answersCorrect = {
            "text": document.querySelector(`.question-${i}-correct-answer1 .answer`).value,
            "image": document.querySelector(`.question-${i}-correct-answer1 .url`).value,
            "isCorrectAnswer": true
        }

        const isValidAnswerImage = validateUrl(answersCorrect.image);
        // Validação da resposta correta
        if (answersCorrect.text === "" || answersCorrect.image === "" || !isValidAnswerImage) {
            alert("Por favor, preencha os dados da resposta correta corretamente");
            return;
        }

        dataQuestions.answers.push(answersCorrect)

        for(let j = 1; j <= 3; i++){
            let answersIncorrect = {
                "text": document.querySelector(`.question-${i}-correct-answer${j} .answer`).value,
                "image": document.querySelector(`.question-${i}-correct-answer${j} .url`).value,
                "isCorrectAnswer": false
            }

            const isValidAnswerImage = validateUrl(answersCorrect.image);
            // Validação das respostas incorretas
            if (answersIncorrect.text === "" || answersIncorrect.image === "" || !isValidAnswerImage) {
                alert("Por favor, preencha os dados de todas as respostas incorretas corretamente");
                return;
            }

            dataQuestions.answers.push(answersIncorrect)
        }

        if (dataQuestions.answers.filter(answer => answer.isCorrectAnswer).length === 0) {
            alert("Por favor, selecione a resposta correta para a pergunta");
            return;
          }
          
          if (dataQuestions.answers.length < 2) {
            alert("Por favor, insira pelo menos 2 respostas para a pergunta");
            return;
          }

        listQuestions.push(dataQuestions)

    }
}



function getQuestionsHTML(){
    if(!validBasicQuizzInformation()){
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
        <button class="next-create-level" onclick="renderLevelsQuizz()">Prosseguir pra criar níveis</button>
    </div>
    `
}

function toggleQuestion(event) {
    const icon = event.target;
    const content = icon.closest('.title-icon').nextElementSibling;
    content.classList.toggle('hidden');
  }


function renderQuestionsRepeated(index){

    let wholeQuestion;
    if(index !== 1){
        wholeQuestion = 'hidden'
    }

    return `
        <div class="subtitle inputs">
            <div class="title-icon">
                <h4 class="number-question">Pergunta ${index}</h4>
                <div class="icon" onclick="toggleQuestion(event)">
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


function inputQuizzLevels(){
    const numberLevels = createQuizz.amountLevels;
    for(let i = 1; i <= numberLevels; i++){
        let dataLevels = {
            "title": document.querySelector(`.level-${i} .nivel-text`).value,
            "image": document.querySelector(`.level-${i} .nivel-url`).value,
            "text": document.querySelector(`.level-${i} .nivel-description`).value,
            "minValue": parseInt(document.querySelector(`.level-${i} .nivel-hits`).value)
        };

            // Validando Título do nível
        if (dataLevels.title.length < 10) {
            alert("O título do nível deve ter no mínimo 10 caracteres.");
            return;
        }
    
        // Validando % de acerto mínima
        if (dataLevels.minValue < 0 || dataLevels.minValue > 100) {
            alert("A % de acerto mínima deve ser um número entre 0 e 100.");
            return;
        }
    
        if (dataLevels.minValue === 0) {
            hasZeroPercentLevel = true;
        }
    
        // Validando URL da imagem do nível
        if (!validateUrl(dataLevels.image)) {
            alert("A URL da imagem do nível deve ter formato de URL.");
            return;
        }
    
        // Validando Descrição do nível
        if (dataLevels.text.length < 30) {
            alert("A descrição do nível deve ter no mínimo 30 caracteres.");
            return;
        }
        listLevels.push(dataLevels)
    }
  
    if (!hasZeroPercentLevel) {
      alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
      return;
    }

}



function getLevelsHTML(){
    // if(!inputQuizzQuestions()){
    //     return;
    // }
    const numberLevels = createQuizz.amountLevels;
    let levels = '';
    for(let i = 1; i <= numberLevels; i++){
        levels += renderLevelsRepeated(i)
    }

    return levels
   
}

function renderLevelsQuizz(){
    let levelsHTML = getLevelsHTML();

    contentQuizz.innerHTML = `
    <div class="page-create-quizz">
    <h3 class="title">Agora, decida os níveis</h3>
        ${levelsHTML}
        <button class="next-create-level">Finalizar Quizz</button>
    </div>
    `
}


function renderLevelsRepeated(index){
    let wholeLevel;
    if(index !== 1){
        wholeLevel = 'hidden'
    }
    return `
        <div class="subtitle inputs">
            <div class="title-icon" onclick="toggleQuestion(event)">
                <h4 class="number-question">Nivel ${index}</h4>
                <div class="icon">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div class="content-questions ${wholeLevel}">
                <div class="create-answers level-${index}">
                    <input type="text" class="nivel-text" placeholder="Título do nível" />
                    <input type="text" class="nivel-hits" placeholder="% de acerto mínima" />
                    <input type="text" class="nivel-url" placeholder="URL da imagem do nível" />
                    <input type="text" class="nivel-description" placeholder="Descrição do nível" />
                </div>

            </div>
        </div>
    `
}