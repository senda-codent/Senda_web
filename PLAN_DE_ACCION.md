# Plan de Acción - Plataforma Senda

## Visión del Proyecto

**WHY (Por qué):** Ayudar a las personas a vivir mejor, poniendo al servicio nuestro conocimiento y experiencia.

**HOW (Cómo):** Combinar tecnología inteligente (AI) con el acompañamiento humano de profesionales.

**WHAT (Qué):** Una plataforma integral para el bienestar personal con herramientas para transformar la calidad de vida de forma accesible, guiada y coherente.

## Principios Fundamentales

- **Cero tareas manuales:** Todo debe venir resuelto para el usuario
- **Arquitectura flexible:** WHY y HOW son core, WHAT es dinámico y debe ser fácil de adaptar
- **Planes personalizados:** Se adaptan a cada usuario en entrenamiento, nutrición, descanso, meditación y bienestar integral

---

## Fase 1: Planificación y Arquitectura (Semanas 1-2)

### 1.1 Definición del Stack Tecnológico

#### Frontend (Core)
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño responsivo con Grid y Flexbox
  - Variables CSS para theming
  - Media queries para mobile-first
  - Animaciones y transiciones nativas
- **JavaScript (Vanilla)** - Lógica del cliente
  - ES6+ features (modules, async/await, destructuring)
  - DOM manipulation nativo
  - LocalStorage para persistencia local
  - Fetch API para comunicación con backend

#### Librerías Externas Mínimas
- **Chart.js** - Visualización de datos y dashboards
- **Day.js** - Manejo de fechas (más ligero que Moment.js)

#### Backend (Fase posterior - Inicialmente mock data)
- **Node.js + Express** - API REST simple
- **JSON files** - Base de datos inicial (migrar a SQLite/PostgreSQL después)
- **JWT simple** - Autenticación básica

#### AI/ML (Integración futura)
- **OpenAI API** o **Claude API** - Generación de planes personalizados
- Llamadas vía Fetch API desde el frontend o backend

#### Integraciones (Fases posteriores)
- **Wearables:** APIs REST de Garmin, Apple Health, Google Fit
- **Pagos:** Stripe (integración simple con checkout)
- **Email:** EmailJS o servicio SMTP simple

#### Hosting (Inicial)
- **Frontend:** GitHub Pages, Netlify o Vercel (hosting estático gratis)
- **Backend:** Render, Railway o Heroku (planes gratuitos)
- **Archivos:** Cloudinary free tier o almacenamiento local inicial

### 1.2 Arquitectura de Archivos

```
senda-web/
├── index.html                 # Landing page
├── login.html                 # Login/Registro
├── onboarding.html            # Proceso inicial
├── dashboard.html             # Vista principal diaria
├── training.html              # Módulo de entrenamiento
├── nutrition.html             # Módulo de nutrición
├── meditation.html            # Módulo de meditación
├── community.html             # Comunidad y grupos
├── profile.html               # Perfil de usuario
│
├── css/
│   ├── global.css             # Estilos globales y variables
│   ├── components.css         # Componentes reutilizables
│   ├── landing.css            # Estilos de landing
│   ├── dashboard.css          # Estilos de dashboard
│   ├── training.css           # Estilos de entrenamiento
│   ├── nutrition.css          # Estilos de nutrición
│   ├── meditation.css         # Estilos de meditación
│   └── responsive.css         # Media queries
│
├── js/
│   ├── main.js                # Código principal compartido
│   ├── auth.js                # Lógica de autenticación
│   ├── api.js                 # Funciones de API/fetch
│   ├── storage.js             # Manejo de LocalStorage
│   ├── utils.js               # Funciones de utilidad
│   ├── dashboard.js           # Lógica del dashboard
│   ├── training.js            # Lógica de entrenamiento
│   ├── nutrition.js           # Lógica de nutrición
│   ├── meditation.js          # Lógica de meditación
│   └── charts.js              # Configuración de Chart.js
│
├── assets/
│   ├── images/                # Imágenes e íconos
│   ├── videos/                # Videos de ejercicios
│   └── audio/                 # Meditaciones guiadas
│
├── data/                      # Mock data (inicial)
│   ├── users.json             # Usuarios de ejemplo
│   ├── workouts.json          # Planes de entrenamiento
│   ├── meals.json             # Recetas y planes nutricionales
│   └── meditations.json       # Sesiones de meditación
│
└── backend/                   # Fase posterior
    ├── server.js              # Express server
    ├── routes/                # Endpoints REST
    └── db/                    # Base de datos
```

---

## Fase 2: MVP - Versión Mínima Viable (Semanas 3-12)

### 2.1 Funcionalidades Core del MVP

#### A. Autenticación y Onboarding
- [ ] Registro/Login con email y redes sociales
- [ ] Cuestionario inicial:
  - Objetivos (perder peso, ganar músculo, bienestar general)
  - Nivel de experiencia en ejercicio
  - Restricciones alimentarias
  - Disponibilidad de tiempo
  - Preferencia: AI vs Profesional

#### B. Dashboard Diario (Vista Principal)
El usuario ve cada día:
1. **Plan de Entrenamiento del Día**
   - Ejercicios con videos/GIFs
   - Duración estimada
   - Marcar como completado

2. **Plan de Nutrición del Día**
   - Desayuno, almuerzo, cena, snacks
   - Recetas paso a paso
   - Lista de ingredientes

3. **Meditación del Día**
   - Meditación guiada (audio/video)
   - Ejercicios de respiración
   - Registro obligatorio diario

#### C. Módulo de Entrenamiento (MVP)
- [ ] **Opción AI:**
  - Generación automática de plan semanal/mensual
  - Adaptación basada en progreso y feedback

- [ ] **Opción con Entrenador:**
  - Búsqueda de entrenadores por zona/especialidad
  - Chat directo con el entrenador
  - Entrenador asigna plan personalizado

- [ ] **Tracking:**
  - Marcar ejercicios completados
  - Registro de peso/repeticiones
  - Historial de entrenamientos

#### D. Módulo de Nutrición (MVP)
- [ ] **Opción AI:**
  - Plan semanal de comidas
  - Generación automática de lista de compras
  - Recetas con ingredientes y pasos

- [ ] **Opción con Nutricionista:**
  - Búsqueda de nutricionistas
  - Plan personalizado por profesional
  - Seguimiento de adherencia

- [ ] **Funcionalidades:**
  - Calendario de comidas
  - Recetas con instrucciones paso a paso
  - Registro de comidas consumidas

#### E. Módulo de Meditación (MVP)
- [ ] Biblioteca de meditaciones guiadas (5-20 min)
- [ ] Ejercicios de respiración
- [ ] Timer personalizable
- [ ] Registro diario obligatorio
- [ ] Racha de días consecutivos

#### F. Perfil de Usuario
- [ ] Datos personales
- [ ] Métricas: peso, altura, edad
- [ ] Objetivos y progreso
- [ ] Configuración de notificaciones
- [ ] Preferencias (AI vs Profesional)

---

## Fase 3: Funcionalidades Intermedias (Semanas 13-24)

### 3.1 Integración con Wearables
- [ ] Conexión con Garmin
- [ ] Conexión con Apple Health
- [ ] Conexión con Google Fit
- [ ] Sincronización automática de:
  - Pasos
  - Calorías quemadas
  - Frecuencia cardíaca
  - Sueño
  - Entrenamientos

### 3.2 Módulo de Comunidad
- [ ] Búsqueda de usuarios por:
  - Ubicación geográfica
  - Deporte/actividad
  - Nivel de experiencia
- [ ] Creación de grupos de entrenamiento
- [ ] Chat grupal
- [ ] Eventos y quedadas para entrenar
- [ ] Feed social (opcional, progreso compartido)

### 3.3 Análisis y Dashboards
- [ ] Dashboard de progreso:
  - Gráficos de peso/medidas
  - Adherencia a entrenamientos
  - Adherencia a nutrición
  - Racha de meditación
- [ ] Insights generados por AI
- [ ] Comparación temporal (mes a mes)
- [ ] Exportación de reportes PDF

### 3.4 Sistema de Profesionales
- [ ] Portal para profesionales:
  - Perfil profesional (certificaciones, especialidades)
  - Gestión de clientes
  - Creación de planes
  - Chat con clientes
  - Calendario de sesiones
- [ ] Sistema de reviews/calificaciones
- [ ] Búsqueda avanzada de profesionales
- [ ] Videollamadas integradas (Zoom/similar)

---

## Fase 4: Funcionalidades Avanzadas (Semanas 25-40)

### 4.1 Módulo de Kinesiología
- [ ] Búsqueda de kinesiólogos
- [ ] Evaluación de lesiones
- [ ] Planes de recuperación
- [ ] Ejercicios de rehabilitación

### 4.2 Análisis del Sueño
- [ ] Integración con datos de wearables
- [ ] Análisis de calidad del sueño
- [ ] Recomendaciones para mejorar descanso
- [ ] Alarma inteligente (ciclos de sueño)

### 4.3 Marketplace
- [ ] Productos de bienestar:
  - Suplementos
  - Equipamiento deportivo
  - Libros/cursos
- [ ] Servicios:
  - Sesiones individuales con profesionales
  - Planes premium personalizados
  - Consultas especializadas
- [ ] Sistema de afiliados

### 4.4 Gamificación
- [ ] Sistema de puntos/XP
- [ ] Logros y badges
- [ ] Niveles de usuario
- [ ] Desafíos semanales
- [ ] Tabla de clasificación (opcional)

### 4.5 Salud Preventiva
- [ ] Recordatorios médicos (chequeos anuales)
- [ ] Seguimiento de hábitos saludables
- [ ] Integración con estudios médicos
- [ ] Alertas de salud basadas en datos

---

## Fase 5: Optimización y Escalabilidad (Semanas 41+)

### 5.1 Mejoras de AI
- [ ] Modelo de ML personalizado (no solo API externa)
- [ ] Predicción de lesiones
- [ ] Optimización automática de planes
- [ ] Chatbot inteligente 24/7

### 5.2 App Móvil Nativa
- [ ] iOS (Swift/SwiftUI)
- [ ] Android (Kotlin/Jetpack Compose)
- [ ] Notificaciones push avanzadas
- [ ] Modo offline

### 5.3 Internacionalización
- [ ] Multiidioma (ES, EN, PT)
- [ ] Adaptación cultural
- [ ] Diferentes unidades de medida

### 5.4 Escalabilidad Técnica
- [ ] Migración a microservicios completos
- [ ] CDN global
- [ ] Cache distribuido (Redis)
- [ ] Load balancing
- [ ] Auto-scaling

---

## Cronograma Resumido

| Fase | Duración | Objetivo |
|------|----------|----------|
| **Fase 1** | Semanas 1-2 | Planificación y setup inicial |
| **Fase 2** | Semanas 3-12 | MVP funcional (Dashboard + 3 módulos core) |
| **Fase 3** | Semanas 13-24 | Wearables + Comunidad + Profesionales |
| **Fase 4** | Semanas 25-40 | Módulos avanzados + Marketplace |
| **Fase 5** | Semanas 41+ | Optimización y escalabilidad |

---

## Estructura del Proyecto (Inicial)

### Repositorios Sugeridos
1. `senda-frontend` - Next.js + TypeScript
2. `senda-backend` - NestJS + TypeScript
3. `senda-mobile` - React Native (futuro)
4. `senda-ai-service` - Python (ML/AI)

### Primeros Pasos Técnicos

1. **Estructura inicial del proyecto:**
```bash
# Crear directorios
mkdir -p css js assets/images assets/videos assets/audio data

# Crear archivos HTML principales
touch index.html login.html onboarding.html dashboard.html
touch training.html nutrition.html meditation.html profile.html

# Crear archivos CSS
touch css/global.css css/components.css css/responsive.css

# Crear archivos JS
touch js/main.js js/auth.js js/api.js js/storage.js js/utils.js
touch js/dashboard.js js/training.js js/nutrition.js js/meditation.js

# Crear archivos de datos mock
touch data/users.json data/workouts.json data/meals.json data/meditations.json
```

2. **HTML Base Template:**
Cada página HTML seguirá esta estructura:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senda - [Nombre Página]</title>
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/[specific].css">
</head>
<body>
    <!-- Contenido -->
    <script src="js/utils.js"></script>
    <script src="js/main.js"></script>
    <script src="js/[specific].js"></script>
</body>
</html>
```

3. **Variables CSS Globales (css/global.css):**
```css
:root {
    /* Colores principales */
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --accent-color: #FF9800;
    --text-dark: #333;
    --text-light: #666;
    --bg-light: #f5f5f5;
    --white: #ffffff;

    /* Espaciado */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;

    /* Tipografía */
    --font-main: 'Segoe UI', system-ui, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.75rem;
}
```

4. **Estructura de datos JSON (data/users.json):**
```json
{
    "users": [
        {
            "id": "1",
            "email": "demo@senda.com",
            "password": "demo123",
            "profile": {
                "name": "Usuario Demo",
                "age": 30,
                "weight": 70,
                "height": 170,
                "goals": ["fitness", "nutrition"],
                "preferAI": true
            }
        }
    ]
}
```

---

## Métricas de Éxito

### KPIs Iniciales
- **Adquisición:** Usuarios registrados/mes
- **Activación:** % usuarios que completan onboarding
- **Retención:** % usuarios activos día 7, 30, 90
- **Engagement:**
  - Entrenamientos completados/semana
  - Comidas logueadas/día
  - Sesiones de meditación/día
- **Monetización:** Conversión a planes de pago
- **Satisfacción:** NPS (Net Promoter Score)

---

## Consideraciones Importantes

### Privacidad y Seguridad
- [ ] Cumplimiento GDPR/LGPD
- [ ] Encriptación de datos sensibles
- [ ] Política de privacidad clara
- [ ] Consentimiento para datos de salud

### UX Critical
- [ ] Onboarding < 3 minutos
- [ ] Dashboard carga en < 2 segundos
- [ ] Móvil-first (80% de uso esperado en mobile)
- [ ] Accesibilidad (WCAG 2.1)

### Modelo de Negocio (Sugerido)
1. **Freemium:**
   - Gratis: Planes con AI básicos
   - Premium: Profesionales + módulos avanzados

2. **Comisiones:**
   - % sobre sesiones con profesionales
   - % sobre ventas en marketplace

3. **Suscripciones:**
   - Mensual: $9.99
   - Anual: $99.99

---

## Próximos Pasos Inmediatos

1. [ ] Validar stack tecnológico con el equipo
2. [ ] Diseñar wireframes de las pantallas principales
3. [ ] Configurar repositorios y entorno de desarrollo
4. [ ] Crear base de datos inicial (schema Prisma)
5. [ ] Implementar autenticación básica
6. [ ] Construir onboarding flow
7. [ ] Desarrollar primera versión del dashboard diario

---

**Última actualización:** 2025-11-11
