const API_URL = "http://localhost:3000/api";

function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert("Registrado com sucesso! Faça login.");
    });
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            document.getElementById("auth").style.display = "none";
            document.getElementById("taskManager").style.display = "block";
            listTasks();
        } else {
            alert("Login falhou.");
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    document.getElementById("auth").style.display = "block";
    document.getElementById("taskManager").style.display = "none";
}

function createTask() {
    const title = document.getElementById("taskTitle").value;
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/task`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("taskTitle").value = "";
        listTasks();
    });
}

function listTasks() {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/task`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(tasks => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done;
            checkbox.onchange = () => toggleTaskDone(task._id, checkbox.checked);

            const span = document.createElement("span");
            span.textContent = task.title;
            if (task.done) {
                span.style.textDecoration = "line-through";
                span.style.color = "gray";
            }

            const delBtn = document.createElement("button");
            delBtn.textContent = "Excluir";
            delBtn.onclick = () => deleteTask(task._id);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    });
}

function toggleTaskDone(id, done) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ done })
    })
    .then(res => res.json())
    .then(data => {
        listTasks(); // Atualiza a lista após mudar o status
    });
}

function deleteTask(id) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/task/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        listTasks();
    });
}
