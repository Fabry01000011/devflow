// Estado Global
const STATE = {
    tasks: [],
    currentView: 'all',
    currentFilter: 'all',
    currentSort: 'priority-desc',
    currentCategory: null,
    searchQuery: '',
    theme: localStorage.getItem('devflow-theme') || 'light'
};

// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const navItems = document.querySelectorAll('.nav-item');
const categoryTags = document.querySelectorAll('.category-tag');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const prioritySelect = document.getElementById('prioritySelect');
const timeSelect = document.getElementById('timeSelect');
const themeToggle = document.getElementById('themeToggle');
const aiSuggestBtn = document.getElementById('aiSuggestBtn');
const aiPanel = document.getElementById('aiPanel');
const closeAiBtn = document.getElementById('closeAiBtn');
const viewTitle = document.getElementById('viewTitle');
const viewSubtitle = document.getElementById('viewSubtitle');

const STORAGE_KEY = 'devflow-tasks';
const CATEGORY_EMOJIS = {
    bug: '🐛',
    feature: '✨',
    refactor: '🔧',
    docs: '📖',
    devops: '⚙️'
};

// Inicialización
function init() {
    applyTheme(STATE.theme);
    loadTasks();
    setupEventListeners();
    renderTasks();
    updateStats();
}

function setupEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTask();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            STATE.currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(i => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
            STATE.currentView = e.currentTarget.dataset.view;
            updateViewInfo();
            renderTasks();
        });
    });

    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            categoryTags.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            STATE.currentCategory = e.target.dataset.category;
            renderTasks();
        });
    });

    searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value.toLowerCase();
        renderTasks();
    });

    sortSelect.addEventListener('change', (e) => {
        STATE.currentSort = e.target.value;
        renderTasks();
    });

    themeToggle.addEventListener('click', toggleTheme);
    aiSuggestBtn.addEventListener('click', showAiSuggestions);
    closeAiBtn.addEventListener('click', closeAiPanel);

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            taskInput.focus();
        }
    });
}

function updateViewInfo() {
    const titles = {
        all: 'Todas las Tareas',
        today: 'Tareas de Hoy',
        sprint: 'Sprint Actual',
        backlog: 'Backlog'
    };
    viewTitle.textContent = titles[STATE.currentView] || 'Todas las Tareas';

    const subtitles = {
        all: 'Todas tus tareas en un solo lugar',
        today: '📅 Enfócate en lo que importa hoy',
        sprint: '🏃 Tareas del sprint actual',
        backlog: '📚 Tareas futuras sin asignar'
    };
    viewSubtitle.textContent = subtitles[STATE.currentView] || '';
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        showNotification('Por favor, escribe una descripción', 'warning');
        return;
    }

    const priority = prioritySelect.value;
    const estimatedTime = parseInt(timeSelect.value);

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: priority,
        estimatedTime: estimatedTime,
        category: STATE.currentCategory || 'feature',
        createdAt: new Date().toISOString(),
        completedAt: null,
        blocked: false
    };

    STATE.tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    prioritySelect.value = 'medium';
    timeSelect.value = '30';
    renderTasks();
    updateStats();
    showNotification('✅ Tarea añadida', 'success');
}

function renderTasks() {
    taskList.innerHTML = '';

    let filtered = STATE.tasks.filter(task => {
        // Filtro por estado
        if (STATE.currentFilter === 'active' && task.completed) return false;
        if (STATE.currentFilter === 'completed' && !task.completed) return false;
        if (STATE.currentFilter === 'blocked' && !task.blocked) return false;

        // Filtro por vista
        if (STATE.currentView === 'today') {
            const today = new Date().toDateString();
            const createdDate = new Date(task.createdAt).toDateString();
            if (createdDate !== today) return false;
        }

        // Filtro por búsqueda
        if (STATE.searchQuery && !task.text.toLowerCase().includes(STATE.searchQuery)) {
            return false;
        }

        // Filtro por categoría
        if (STATE.currentCategory && task.category !== STATE.currentCategory) {
            return false;
        }

        return true;
    });

    // Ordenar
    filtered = sortTasks(filtered);

    if (filtered.length === 0) {
        taskList.innerHTML = `
            <div class="empty-message">
                <div class="empty-message-icon">📭</div>
                <p>No hay tareas que mostrar</p>
                <p style="font-size: 12px; margin-top: 8px; color: var(--color-text-light);">
                    ${STATE.currentFilter === 'completed' ? 'Completa algunas tareas para verlas aquí' : 'Crea una nueva tarea para empezar'}
                </p>
            </div>
        `;
        return;
    }

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}${task.blocked ? ' blocked' : ''}`;

        const priorityIcon = {
            urgent: '🔴',
            high: '🟠',
            medium: '🟡',
            low: '🟢'
        }[task.priority];

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
            <div class="task-content">
                <span class="task-text">${escapeHtml(task.text)}</span>
                <div class="task-meta">
                    <span class="task-badge priority-${task.priority}" title="Prioridad">${priorityIcon} ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                    <span class="task-badge" title="Categoría">${CATEGORY_EMOJIS[task.category]} ${task.category}</span>
                    <span class="task-time" title="Tiempo estimado">⏱️ ${task.estimatedTime}m</span>
                    ${task.blocked ? '<span class="task-badge" style="background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); color: var(--color-warning);">🚫 Bloqueada</span>' : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="action-btn block-btn" data-id="${task.id}" title="${task.blocked ? 'Desbloquear' : 'Bloquear'}">
                    ${task.blocked ? '✅' : '🚫'}
                </button>
                <button class="action-btn delete-btn" data-id="${task.id}" title="Eliminar">🗑️</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    // Event listeners para tareas
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTask);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });

    document.querySelectorAll('.block-btn').forEach(btn => {
        btn.addEventListener('click', toggleBlock);
    });
}

function sortTasks(tasks) {
    const sorted = [...tasks];
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };

    switch (STATE.currentSort) {
        case 'priority-desc':
            sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            break;
        case 'time-asc':
            sorted.sort((a, b) => a.estimatedTime - b.estimatedTime);
            break;
        case 'created-desc':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'duedate':
            sorted.sort((a, b) => a.estimatedTime - b.estimatedTime);
            break;
    }

    return sorted;
}

function toggleTask(e) {
    const id = parseInt(e.target.dataset.id);
    const task = STATE.tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        saveTasks();
        renderTasks();
        updateStats();
        if (task.completed) {
            showNotification('🎉 Tarea completada', 'success');
        }
    }
}

function deleteTask(e) {
    const id = parseInt(e.target.dataset.id);
    const task = STATE.tasks.find(t => t.id === id);
    if (confirm(`¿Eliminar: "${task.text}"?`)) {
        STATE.tasks = STATE.tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
        showNotification('🗑️ Tarea eliminada', 'success');
    }
}

function toggleBlock(e) {
    const id = parseInt(e.target.dataset.id);
    const task = STATE.tasks.find(t => t.id === id);
    if (task) {
        task.blocked = !task.blocked;
        saveTasks();
        renderTasks();
        updateStats();
        const status = task.blocked ? 'bloqueada' : 'desbloqueada';
        showNotification(`Tarea ${status}`, 'info');
    }
}

function updateStats() {
    const active = STATE.tasks.filter(t => !t.completed).length;
    const completed = STATE.tasks.filter(t => t.completed).length;
    document.getElementById('activeSidebarCount').textContent = active;
    document.getElementById('completedSidebarCount').textContent = completed;
}

function showAiSuggestions() {
    const suggestions = generateAiSuggestions();
    const suggestionsHtml = suggestions.map(s => `<div class="suggestion"><p>${s}</p></div>`).join('');
    document.getElementById('aiSuggestions').innerHTML = suggestionsHtml;
    aiPanel.classList.remove('hidden');
}

function generateAiSuggestions() {
    const active = STATE.tasks.filter(t => !t.completed);
    const urgent = STATE.tasks.filter(t => t.priority === 'urgent' && !t.completed);
    const blocked = STATE.tasks.filter(t => t.blocked);
    const totalTime = active.reduce((sum, t) => sum + t.estimatedTime, 0);

    const suggestions = [];

    if (urgent.length > 0) {
        suggestions.push(`🔴 ${urgent.length} tarea(s) urgente(s) - ¡Prioriza ahora!`);
    }

    if (blocked.length > 0) {
        suggestions.push(`🚫 ${blocked.length} tarea(s) bloqueada(s) - Resuelve dependencias`);
    }

    if (totalTime > 480) {
        suggestions.push(`⏱️ ${totalTime} minutos de trabajo - Divide en sesiones de 25min`);
    }

    if (active.length > 10) {
        suggestions.push(`📊 Tienes muchas tareas activas - Considera enfocar en 3-5 principales`);
    }

    const bugs = STATE.tasks.filter(t => t.category === 'bug' && !t.completed);
    if (bugs.length > 3) {
        suggestions.push(`🐛 ${bugs.length} bugs reportados - Considera hacer un sprint de correcciones`);
    }

    if (active.length === 0) {
        suggestions.push(`✨ ¡Excelente trabajo! Todas tus tareas completadas`);
    } else {
        const completed = STATE.tasks.filter(t => t.completed).length;
        const total = STATE.tasks.length;
        const percentage = Math.round((completed / total) * 100);
        suggestions.push(`📈 Progreso: ${percentage}% completado (${completed}/${total})`);
    }

    return suggestions;
}

function closeAiPanel() {
    aiPanel.classList.add('hidden');
}

function toggleTheme() {
    STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('devflow-theme', STATE.theme);
    applyTheme(STATE.theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        font-size: 14px;
        z-index: 2000;
        animation: slideUp 0.3s ease;
        box-shadow: var(--shadow-md);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.tasks));
}

function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    STATE.tasks = stored ? JSON.parse(stored) : [];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Iniciar
updateViewInfo();
init();
