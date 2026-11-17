// aqui eu me basei nas apostilas lá com oq falava e pesquisei nas parte que nao tava funcionando / 

// escuro (melhor modo)
const themeToggleButton = document.querySelector("#theme-toggle");
const bodyElement = document.body;

const savedTheme = localStorage.getItem("novaMind_theme");
if (savedTheme === "dark") {
    bodyElement.classList.add("dark-mode");
    themeToggleButton.textContent = "☀ Modo Claro";
}

// troca de tema
themeToggleButton.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");

    const isDarkModeActive = bodyElement.classList.contains("dark-mode");

    if (isDarkModeActive) {
        themeToggleButton.textContent = "☀ Modo Claro";
        localStorage.setItem("novaMind_theme", "dark");
    } else {
        themeToggleButton.textContent = "🌙 Modo Escuro";
        localStorage.setItem("novaMind_theme", "light");
    }
});

// botao do baixa agora
const ctaButton = document.querySelector("#cta-button");
const downloadModal = document.querySelector("#download-modal");
const modalClose = document.querySelector("#modal-close");
const downloadForm = document.querySelector("#download-form");
const userEmailInput = document.querySelector("#user-email");
const modalFeedback = document.querySelector("#modal-feedback");

// fecha o modal e limpa o formulario
function fecharModal() {
    downloadModal.classList.remove("active");
    modalFeedback.textContent = "";
    downloadForm.reset();
}

ctaButton.addEventListener("click", (event) => {
    event.preventDefault();
    downloadModal.classList.add("active");
});

modalClose.addEventListener("click", fecharModal);

downloadModal.addEventListener("click", (event) => {
    if (event.target === downloadModal) {
        fecharModal();
    }
});

// valida o email do baguio
downloadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailValue = userEmailInput.value.trim();

    if (emailValue !== "") {
        modalFeedback.style.color = "#16a34a";
        modalFeedback.textContent = `Sucesso! O link foi enviado para ${emailValue}.`;

        setTimeout(fecharModal, 3000);
    } else {
        modalFeedback.style.color = "#dc2626";
        modalFeedback.textContent = "Por favor, insira um e-mail válido.";
    }
});

// alerta de js
const heroSection = document.querySelector(".hero");

// monta o baner de coloca
function criarAlertaDinamico() {
    if (document.querySelector(".dynamic-alert-banner")) return;

    const alertBanner = document.createElement("div");
    alertBanner.classList.add("dynamic-alert-banner");

    const alertText = document.createElement("p");
    alertText.classList.add("dynamic-alert-text");
    alertText.innerHTML = "<strong>Novidade:</strong> a IA preditiva de tarefas já " +
        "está disponível para todos os usuários!";

    const alertCloseBtn = document.createElement("button");
    alertCloseBtn.classList.add("dynamic-alert-close");
    alertCloseBtn.textContent = "✕";
    alertCloseBtn.setAttribute("aria-label", "Fechar alerta");

    alertCloseBtn.addEventListener("click", () => {
        alertBanner.remove();
    });

    alertBanner.appendChild(alertText);
    alertBanner.appendChild(alertCloseBtn);

    if (heroSection) {
        heroSection.prepend(alertBanner);
    }
}

// alerta dps de 1.5s
setTimeout(criarAlertaDinamico, 1500);

// filtro de busca de cards
const searchInput = document.querySelector("#feature-search");
const featureCards = document.querySelectorAll(".features-grid .card");
const noResultsMsg = document.querySelector("#no-results");

if (searchInput && featureCards.length > 0) {
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();

        let visibleCount = 0;

        // Mostra ou esconde cada card
        featureCards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchTerm)) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = (visibleCount === 0) ? "block" : "none";
        }
    });
}

// gerenciador de tarefas
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// lista de tarefas salva no navegador
let tasksArray = JSON.parse(localStorage.getItem("novaMind_tasks")) || [];

function saveAndRenderTasks() {
    localStorage.setItem("novaMind_tasks", JSON.stringify(tasksArray));
    renderTasks();
}

// as tarefas na tela
function renderTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";

    tasksArray.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.addEventListener("click", () => {
            tasksArray[index].completed = !tasksArray[index].completed;
            saveAndRenderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("task-delete-btn");
        deleteBtn.textContent = "Excluir";
        deleteBtn.addEventListener("click", () => {
            tasksArray.splice(index, 1);
            saveAndRenderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

if (taskForm) {
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasksArray.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveAndRenderTasks();
        }
    });
}

renderTasks();

// simulador de ia 
const aiGenerateBtn = document.querySelector("#ai-generate-btn");
const aiResultBox = document.querySelector("#ai-result-box");
const aiOutputText = document.querySelector("#ai-output-text");

const insightsEmPortugues = [
    "Dividir grandes tarefas em micro-tarefas diárias aumenta a taxa de conclusão de metas.",
    "A técnica Pomodoro (25min de foco + 5min de descanso) reduz a fadiga mental.",
    "Organizar as prioridades na noite anterior economiza energia cognitiva pela manhã.",
    "Automatizar tarefas repetitivas libera espaço mental para resolver problemas complexos.",
    "Documentar bem o que você faz hoje é um presente para o seu 'eu' do futuro."
];

if (aiGenerateBtn) {
    // Espera 1,2 segundo e sorteia um insight
    aiGenerateBtn.addEventListener("click", async () => {
        aiGenerateBtn.disabled = true;
        aiGenerateBtn.textContent = "Consultando a IA...";
        aiResultBox.style.display = "block";
        aiOutputText.textContent = "Analisando padrões e gerando recomendação...";

        try {
            await new Promise(resolve => setTimeout(resolve, 1200));

            const randomIndex = Math.floor(Math.random() * insightsEmPortugues.length);
            aiOutputText.textContent = insightsEmPortugues[randomIndex];
        } catch (error) {
            aiOutputText.textContent = "Não foi possível gerar o insight agora.";
        } finally {
            aiGenerateBtn.disabled = false;
            aiGenerateBtn.textContent = "Gerar Insight de IA";
        }
    });
}

// formulario de contato
const contactForm = document.querySelector("#contact-form");
const contactFeedback = document.querySelector("#contact-feedback");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = new FormData(contactForm);
        const nome = dados.get("nome").trim();
        const mensagem = dados.get("mensagem").trim();

        if (nome === "" || mensagem === "") {
            contactFeedback.style.color = "#dc2626";
            contactFeedback.textContent = "Preencha todos os campos.";
            return;
        }

        contactFeedback.style.color = "#16a34a";
        contactFeedback.textContent = `Obrigado, ${nome}! Sua mensagem foi registrada.`;
        contactForm.reset();
    });
}
