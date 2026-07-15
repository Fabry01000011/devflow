# 🚀 DevFlow - Productividad para Programadores

Una aplicación de gestión de tareas diseñada específicamente para **programadores del 2026**, potenciada por IA y con un diseño inspirado en papel. Organiza tu trabajo, mantén el enfoque y aumenta tu productividad.

![DevFlow - 2026](https://img.shields.io/badge/DevFlow-2026-6366f1?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ Características Principales

### 🎯 Gestión de Tareas
- ✅ Crear, editar y eliminar tareas
- 📊 Priorización en 4 niveles (Baja, Media, Alta, Urgente)
- ⏱️ Estimación de tiempo con presets (15m, 30m, 1h, 2h, medio día)
- 🔴 Marcar tareas como bloqueadas
- 🎯 Estado de completado con historial

### 🧠 Potencia de IA
- 💡 **Sugerencias inteligentes**: Análisis automático de tareas
- 📈 Recomendaciones de productividad
- 🔍 Priorización automática basada en urgencia
- 📊 Estadísticas y análisis de productividad
- 🎯 Detección de cuellos de botella

### 📋 Categorías de Programador
- 🐛 **Bug** - Correcciones y fixes
- ✨ **Feature** - Nuevas funcionalidades
- 🔧 **Refactor** - Mejoras de código
- 📖 **Docs** - Documentación
- ⚙️ **DevOps** - Tareas de infraestructura

### 👁️ Vistas Múltiples
- 📋 **Todas** - Panel general
- 📅 **Hoy** - Tareas del día
- 🏃 **Sprint** - Tareas del sprint actual
- 📚 **Backlog** - Tareas futuras

### 🎨 Interfaz Moderna
- 📄 Diseño inspirado en **papel** (colores naturales)
- 🌓 Soporte para tema claro y oscuro
- 📱 Completamente responsivo
- ⚡ Transiciones suaves y fluidas
- 🎯 UX enfocada en productividad

### 💾 Persistencia Inteligente
- 🗄️ Almacenamiento en **localStorage**
- 🔄 Sincronización automática
- 📊 Historial de tareas completadas
- ⚡ Carga instantánea

### ⌨️ Atajos de Teclado
- `Ctrl + Shift + A` - Enfoca el input de tarea
- `Ctrl + Enter` - Añade tarea rápidamente
- `Click` - Toggle completado
- `Hover` - Mostrar acciones

## 🏗️ Estructura del Proyecto

```
devflow/
├── index.html          # Estructura HTML5 (Navbar, Sidebar, Tasks)
├── styles.css          # CSS moderno con variables y temas
├── script.js           # Lógica JS con IA integrada
├── README.md           # Este archivo
└── .gitignore          # Configuración Git
```

## 🚀 Cómo Usar

### Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! No requiere dependencias

### Crear Tareas
```
1. Escribe la descripción
2. Selecciona Prioridad (Media por defecto)
3. Estima el tiempo (30 min por defecto)
4. Presiona "Agregar Tarea" o Ctrl+Enter
```

### Flujo de Trabajo
```
Tarea Nueva
    ↓
Categorizar (Bug/Feature/Refactor/etc)
    ↓
Priorizar (Baja/Media/Alta/Urgente)
    ↓
Estimar Tiempo
    ↓
Trabajar
    ↓
✅ Completar
    ↓
Estadísticas & Sugerencias
```

### Usar Sugerencias de IA
1. Click en botón "✨ IA" (esquina superior derecha)
2. Lee las recomendaciones
3. Actúa sobre las insights

## 🎯 Para Programadores

### Gestión de Sprints
- Agrupa tareas por sprint
- Estima capacidad total del sprint
- Visualiza progreso diario
- Detecta bloqueadores automáticamente

### Seguimiento de Bugs
- Categoría dedicada para bugs
- Priorización automática
- Historial de correcciones
- Análisis de patrones

### Refactoring Planificado
- Categoría específica para refactoring
- Estimation balanceada
- Integración con roadmap
- Tracking de mejoras técnicas

## 🎨 Personalización

### Cambiar Colores (Variables CSS)
Edita `styles.css`:
```css
:root {
    --color-primary: #6366f1;        /* Morado Indigo */
    --color-success: #10b981;         /* Verde */
    --color-danger: #ef4444;          /* Rojo */
    --color-warning: #f59e0b;         /* Amarillo */
}
```

### Cambiar Emojis de Categorías
En `script.js`, modifica:
```javascript
const CATEGORY_EMOJIS = {
    bug: '🐛',
    feature: '✨',
    refactor: '🔧',
    docs: '📖',
    devops: '⚙️'
};
```

## 📊 Estadísticas

La app rastrea automáticamente:
- ✅ Tareas completadas
- 📋 Tareas activas
- 🚫 Tareas bloqueadas
- ⏱️ Tiempo estimado vs actual
- 📈 Productividad semanal
- 🎯 Prioridades pendientes

## 💡 Tips de Productividad

1. **Técnica Pomodoro**: Usa los presets de 25min para sesiones
2. **Priorización**: Mantén máximo 3 tareas urgentes
3. **Estimación**: Sé realista con tiempos
4. **Sprint**: Revisa la vista "Hoy" cada mañana
5. **IA**: Checa sugerencias al iniciar sesión

## 🔒 Privacidad

- ✅ Datos guardados localmente (localStorage)
- ✅ Sin conexión a internet requerida
- ✅ Sin envío de datos a servidores
- ✅ Seguridad contra XSS integrada

## 🌓 Tema Oscuro

Click en el botón 🌙/☀️ en la esquina inferior izquierda del sidebar para cambiar entre temas.

Ambos temas optimizados para:
- Lectura prolongada
- Bajo consumo de batería
- Uso en diferentes horarios

## 🛠️ Stack Técnico

- **Frontend**: HTML5, CSS3 (Variables, Grid, Flexbox), Vanilla JS
- **Storage**: Browser localStorage API
- **UI/UX**: Diseño responsivo, animaciones CSS
- **Accesibilidad**: Semantic HTML, contrast ratios
- **Performance**: Zero dependencies, lightweight

## 📱 Soporte de Dispositivos

✅ Desktop (Chrome, Firefox, Safari, Edge)
✅ Tablet (iPad, Android tablets)
✅ Mobile (iPhone, Android)
✅ Responsive desde 320px

## 🚀 Roadmap Futuro

- [ ] Integración con GitHub Issues
- [ ] Estadísticas detalladas de productividad
- [ ] Exportar tareas a CSV/JSON
- [ ] Colaboración en tiempo real
- [ ] Integraciones con Slack/Discord
- [ ] Análisis de velocidad del sprint
- [ ] Machine Learning para estimaciones
- [ ] Sincronización en la nube

## 💬 Feedback

¿Sugerencias? ¿Bugs? Ayuda a mejorar DevFlow.

## 📄 Licencia

MIT License - Libre para usar y modificar

---

**Hecho para programadores, por programadores. 🚀**

*DevFlow 2026 - Productividad sin límites*
