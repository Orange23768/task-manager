const API_URL = "http://localhost:5000/api/tasks";
const form = document.getElementById("task-form");

// Function to update task counters in column headers
function updateCounters() {
    document.getElementById("count-new").textContent = `(${document.getElementById("col-new").children.length})`;
    document.getElementById("count-in_progress").textContent = `(${document.getElementById("col-in_progress").children.length})`;
    document.getElementById("count-done").textContent = `(${document.getElementById("col-done").children.length})`;
}

// Function to create and insert a task card into the correct column
function createCardElement(taskData) {
    const { id, title, description, status, author } = taskData;
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", id);
    card.setAttribute("data-status", status);

    const currentDate = new Date().toLocaleDateString();

    card.innerHTML = `
        <div class="card-date">${currentDate}</div>
        <div class="card-title">${escapeHTML(title)}</div>
        <div class="card-desc">${escapeHTML(description || "")}</div>
        <div class="card-actions">
            <button class="edit-btn" type="button">Edytuj</button>
            <button class="delete-btn" type="button">Usuń</button>
        </div>
    `;

    // Edit button functionality
    const editBtn = card.querySelector(".edit-btn");
    const titleDiv = card.querySelector(".card-title");
    const descDiv = card.querySelector(".card-desc");

    editBtn.addEventListener("click", async () => {
        if (editBtn.textContent === "Edytuj") {
            const currentStatus = card.getAttribute("data-status");

            titleDiv.innerHTML = `<input type="text" class="edit-title-input" value="${escapeHTML(titleDiv.textContent)}" style="width: 100%; font-size: 14px; padding: 4px; box-sizing: border-box;">`;
            
            descDiv.innerHTML = `
                <textarea class="edit-desc-input" style="width: 100%; height: 60px; font-size: 13px; padding: 4px; box-sizing: border-box; margin-bottom: 8px;">${escapeHTML(descDiv.textContent)}</textarea>
                <div class="edit-status-container">
                    <label style="font-size: 12px; color: #fff;">Status: </label>
                    <select class="edit-status-select" style="font-size: 12px; padding: 2px;">
                        <option value="new" ${currentStatus === "new" ? "selected" : ""}>Nowe</option>
                        <option value="in_progress" ${currentStatus === "in_progress" ? "selected" : ""}>W trakcie</option>
                        <option value="done" ${currentStatus === "done" ? "selected" : ""}>Gotowe</option>
                    </select>
                </div>
            `;

            editBtn.textContent = "Zapisz";
        } else {
            const newTitle = card.querySelector(".edit-title-input").value;
            const newDesc = card.querySelector(".edit-desc-input").value;
            const newStatus = card.querySelector(".edit-status-select").value;

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle, description: newDesc, status: newStatus })
                });

                if (!response.ok) throw new Error("Błąd podczas aktualizacji zadania");
                const updatedTask = await response.json();

                titleDiv.textContent = updatedTask.title;
                descDiv.textContent = updatedTask.description || "";
                
                if (updatedTask.status !== card.getAttribute("data-status")) {
                    card.setAttribute("data-status", updatedTask.status);
                    const targetColumn = document.getElementById(`col-${updatedTask.status}`);
                    if (targetColumn) {
                        targetColumn.appendChild(card);
                    }
                }

                editBtn.textContent = "Edytuj";
                updateCounters();
            } catch (error) {
                console.error(error);
                alert("Nie udało się zaktualizować zadania na serwerze.");
            }
        }
    });

    // Delete button functionality
    card.querySelector(".delete-btn").addEventListener("click", async () => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok && response.status !== 204) throw new Error("Błąd podczas usuwania");

            card.remove();
            updateCounters();
        } catch (error) {
            console.error(error);
            alert("Nie udało się usunąć zadania z serwera.");
        }
    });

    // Append card to correct column container
    const targetColumn = document.getElementById(`col-${status}`);
    if (targetColumn) {
        targetColumn.appendChild(card);
    }
}

// Load tasks from backend API when opening the page
async function loadTasks() {
    try {
        // Clear columns first to prevent duplication
        document.getElementById("col-new").innerHTML = "";
        document.getElementById("col-in_progress").innerHTML = "";
        document.getElementById("col-done").innerHTML = "";

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Nie udało się pobrać zadań");
        
        const tasks = await response.json();
        tasks.forEach(task => {
            createCardElement(task);
        });
        updateCounters();
    } catch (error) {
        console.error(error);
        alert("Nie można połączyć się z API. Upewnij się, że serwer Node.js działa na porcie 5000.");
    }
}

// Handle form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const title = document.getElementById("tytul").value;
    const description = document.getElementById("opis").value;
    const status = document.getElementById("status").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, status })
        });

        if (!response.ok) throw new Error("Błąd podczas tworzenia zadania");
        const newTask = await response.json();

        createCardElement(newTask);
        updateCounters();
        form.reset();
    } catch (error) {
        console.error(error);
        alert("Nie udało się dodać zadania do serwera.");
    }
});

// Security helper to prevent HTML injection
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Run on startup
loadTasks();
