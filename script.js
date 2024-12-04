// Dados de usuários
const users = [
    { username: 'professor', password: 'prof123', role: 'professor' },
    { username: 'aluno', password: 'aluno123', role: 'aluno' }
];

// Rotinas de treino dos alunos
let studentTraining = {
    'aluno1': {},
    'aluno2': {}
};

// Função de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();  
    const password = document.getElementById("password").value.trim();  
    const userType = document.getElementById("userType").value.trim();  

    const user = users.find(u => u.username === username && u.password === password && u.role === userType);

    if (user) {
        if (user.role === 'professor') {
            window.location.href = "professor.html"; 
        } else if (user.role === 'aluno') {
            window.location.href = "aluno.html"; 
        }
    } else {
        alert("Usuário, senha ou tipo de usuário incorretos.");
    }
});

// Limite de exercícios por dia
const maxExercises = 5; 
const exerciseContainers = document.querySelectorAll('.exercise-container'); 

// Função para controlar a seleção de exercícios
exerciseContainers.forEach(container => {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedExercises = container.querySelectorAll('input[type="checkbox"]:checked').length;

            // Se o limite de exercícios for atingido, desabilita os checkboxes restantes
            if (selectedExercises >= maxExercises) {
                checkboxes.forEach(box => {
                    if (!box.checked) {
                        box.disabled = true;
                    }
                });
                alert('Você pode selecionar no máximo 5 exercícios por dia.');
            } else {
                // Habilita todos os checkboxes se o limite não for atingido
                checkboxes.forEach(box => {
                    box.disabled = false;
                });
            }
        });
    });
});

// Função para salvar a rotina de treino
document.getElementById("trainingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const trainingRoutine = {};
    const exerciseContainers = document.querySelectorAll('.day');

    // Captura os exercícios selecionados para cada dia
    exerciseContainers.forEach(container => {
        const day = container.querySelector('h3').textContent.trim();
        const selectedExercises = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);

        if (selectedExercises.length > 0) {
            trainingRoutine[day] = selectedExercises;
        }
    });

    // Verifica se alguma rotina foi selecionada
    if (Object.keys(trainingRoutine).length > 0) {
        // Salva a rotina no localStorage
        localStorage.setItem("trainingRoutine", JSON.stringify(trainingRoutine));
        alert("Rotina salva com sucesso!");
        window.location.href = "rotina-salva.html"; // Redireciona para a página de exibição
    } else {
        alert("Nenhum exercício foi selecionado. Por favor, escolha pelo menos um.");
    }
});

// Exibição da rotina salva (para professor ou aluno)
document.addEventListener("DOMContentLoaded", function() {
    const trainingRoutine = JSON.parse(localStorage.getItem("trainingRoutine"));
    const routineOutput = document.getElementById("routineOutput");

    if (trainingRoutine && Object.keys(trainingRoutine).length > 0) {
        let outputHTML = '<ul>';
        for (const day in trainingRoutine) {
            outputHTML += `<li><strong>${day}:</strong><ul>`;
            trainingRoutine[day].forEach(exercise => {
                outputHTML += `<li>${exercise}</li>`;
            });
            outputHTML += '</ul></li>';
        }
        outputHTML += '</ul>';
        routineOutput.innerHTML = outputHTML;
    } else {
        routineOutput.innerHTML = "<p>Nenhuma rotina foi salva.</p>";
    }
});

// Função para limpar o localStorage (se necessário)
function clearStorage() {
    localStorage.removeItem("trainingRoutine");
    alert("Rotina excluída do localStorage.");
}
