# TalentFlow

Sistema de **preselección y gestión de candidatos** desarrollado con **n8n, Google Sheets, Telegram, Gmail y una interfaz web de Dashboard para RRHH**.

TalentFlow permite automatizar el proceso de recepción, análisis y gestión de candidatos, además de proporcionar herramientas para que el personal de Recursos Humanos pueda consultar candidatos y actualizar su estado mediante un bot de Telegram.

---

# 1. Descripción del proyecto

**TalentFlow** es un sistema orientado a la automatización de procesos de selección de personal.

El sistema integra diferentes servicios para cubrir el flujo de trabajo de una candidatura:

- Registro de candidatos.
- Registro de vacantes.
- Evaluación automática de compatibilidad.
- Almacenamiento de información en Google Sheets.
- Consulta de candidatos mediante inteligencia artificial.
- Actualización del estado de los candidatos.
- Notificación automática por correo electrónico.
- Visualización de candidatos mediante un Dashboard web.
- Interacción del personal de RRHH mediante Telegram.

La automatización principal se realiza mediante **n8n**, que funciona como orquestador entre los diferentes servicios.

---

# 2. Arquitectura

La arquitectura del proyecto está basada en una integración entre una interfaz web, n8n y servicios externos.

```text
                    ┌─────────────────────┐
                    │     Candidato       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Formulario / Sistema│
                    │     de registro     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        n8n          │
                    │   Automatización    │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │ Google     │ │ IA / Gemini│ │   Gmail    │
          │ Sheets     │ │            │ │            │
          └────────────┘ └────────────┘ └────────────┘
                 │
                 ▼
          ┌────────────┐
          │ Dashboard  │
          │    RRHH    │
          └────────────┘
                 ▲
                 │
          ┌────────────┐
          │  Telegram  │
          │     Bot    │
          └────────────┘
```

### Componentes principales

| Componente | Función |
|---|---|
| **n8n** | Orquestación y automatización |
| **Google Sheets** | Almacenamiento de candidatos y vacantes |
| **Google Gemini** | Análisis y procesamiento mediante IA |
| **Telegram** | Interfaz de comunicación para RRHH |
| **Gmail** | Envío de notificaciones a candidatos |
| **Dashboard web** | Visualización de candidatos y métricas |
| **ngrok** | Exposición de los webhooks de n8n durante desarrollo |

---

# 3. Tecnologías utilizadas

### Backend / Automatización

- n8n
- JavaScript
- Google Sheets API
- Telegram Bot API
- Gmail
- Google Gemini

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Servicios externos

- Google Sheets
- Telegram
- Gmail
- Google Gemini
- ngrok

---

# 4. Estructura del proyecto

Una estructura recomendada para el proyecto es:

```text
TalentFlow/
│
├── dashboard/
│   ├── index.html
│   ├── dashboard.css
│   └── dashboard.js
│
├── vacantes/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── candidatos/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── workflows/
│   ├── telegrambot.json
│   └── ...
│
├── README.md
└── .gitignore
```

La estructura puede variar dependiendo de cómo se organice finalmente el proyecto.

---

# 5. Instalación

## 4.1. Requisitos

Antes de ejecutar el proyecto se necesita:

- Node.js
- n8n
- Una cuenta de Google
- Una cuenta de Telegram
- Un bot de Telegram
- Credenciales de Google Sheets
- Credenciales de Gmail
- API de Google Gemini
- ngrok para exponer n8n durante desarrollo
- Navegador web

---

## 4.2. Instalación de n8n

n8n puede ejecutarse mediante Docker o mediante instalación local.

Una alternativa utilizando Docker Compose es:

```yaml
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Posteriormente:

```bash
docker compose up -d
```

n8n estará disponible normalmente en:

```text
http://localhost:5678
```

---

# 6. Configuración

Una vez instalado n8n se deben configurar las credenciales necesarias.

## Google Sheets

El proyecto utiliza Google Sheets como sistema de almacenamiento de información.

Se utilizan dos hojas principales:

### Tabla de candidatos

Contiene la información de los candidatos, sus resultados de evaluación y el estado dentro del proceso de selección.

[Ver tabla de candidatos](https://docs.google.com/spreadsheets/d/1Hcb8Jr-_EVz39PXNikhc7BjuE77nu0JXGg4MABr9euA/edit?gid=0#gid=0)

### Tabla de vacantes

Contiene las vacantes disponibles y los requisitos asociados a cada una.

[Ver tabla de vacantes](https://docs.google.com/spreadsheets/d/1KGVCOKPqZa60F6Zly4GtlfGlHzwBlzO_LXWsVuutmaE/edit?gid=0#gid=0)

---

# 7. Workflow principal de Telegram

El sistema cuenta con un workflow destinado a la interacción entre RRHH y TalentFlow mediante Telegram.

## Flujo

```text
Telegram Trigger
       │
       ▼
   AI Agent
       │
       ▼
Identificar tipo de solicitud
       │
       ▼
      IF
   ┌───┴──────────────┐
   │                  │
CONSULTA       CAMBIO_ESTADO
   │                  │
   ▼                  ▼
Telegram          Google Sheets
respuesta          actualización
                      │
                      ▼
              Buscar candidato
                      │
                      ▼
              ¿Aceptado/Rechazado?
                 ┌────┴────┐
                 │         │
              Aceptado  Rechazado
                 │         │
                 ▼         ▼
               Gmail      Gmail
                 │         │
                 └────┬────┘
                      ▼
                Telegram
               confirmación
```

---

# 8. Telegram Bot

El bot permite al personal de RRHH interactuar con la información de candidatos mediante lenguaje natural.

### Bot de TalentFlow

[Acceder al bot de Telegram](https://t.me/Jerry_n8n_ai_bot)

El usuario puede realizar consultas como:

```text
Consulta el candidato TF-20260812184105-1038
```

También puede solicitar cambios de estado:

```text
Acepta al candidato TF-20260812184105-1038
```

o:

```text
Rechaza al candidato TF-20260812184105-1038
```

---

# 9. Inteligencia artificial

El workflow utiliza un agente de IA basado en Google Gemini.

El agente tiene como función interpretar las solicitudes realizadas por RRHH y determinar qué operación debe ejecutarse.

El sistema diferencia dos tipos principales de acciones:

```text
CONSULTA
```

y:

```text
CAMBIO_ESTADO
```

El agente debe iniciar sus respuestas utilizando una etiqueta determinada:

```text
[ACCION: CONSULTA]
```

o:

```text
[ACCION: CAMBIO_ESTADO]
```

Posteriormente, un nodo JavaScript analiza dicha etiqueta para determinar qué camino debe seguir el workflow.

---

# 10. Prompt utilizado

El agente de IA utiliza un prompt orientado a Recursos Humanos.

Su función principal es:

- Consultar candidatos.
- Buscar candidatos mediante `ID_candidato`.
- Identificar solicitudes de cambio de estado.
- Verificar la existencia del candidato.
- Utilizar Google Sheets como fuente de información.
- Evitar inventar información.
- Modificar únicamente la información solicitada.
- Informar cuando un candidato no existe.
- Confirmar las modificaciones realizadas.

La clasificación de las solicitudes se realiza mediante:

```text
[ACCION: CONSULTA]
```

para consultas y:

```text
[ACCION: CAMBIO_ESTADO]
```

para modificaciones.

Esto permite separar la interpretación realizada por la IA de la lógica posterior del workflow.

---

# 11. Herramientas del AI Agent

El agente cuenta con dos herramientas principales de Google Sheets.

## Consulta de candidatos

La herramienta:

```text
Get row(s) in sheet in Google Sheets
```

permite consultar la información almacenada en la hoja de candidatos.

Puede obtener información como:

- ID.
- Nombre.
- Correo.
- Teléfono.
- Vacante.
- Experiencia.
- Habilidades.
- Nivel académico.
- Score.
- Estado.
- Fecha de postulación.
- Observaciones.
- Revisión de RRHH.

---

## Actualización de candidatos

La herramienta:

```text
Update row in sheet in Google Sheets
```

permite modificar el estado de un candidato.

El campo utilizado para identificar la fila es:

```text
ID_candidato
```

Los estados utilizados para la actualización son:

```text
Aceptado
Rechazado
```

El workflow está configurado para no modificar las demás columnas durante esta operación.

---

# 12. Identificación del candidato

Después de una modificación, el workflow utiliza un nodo JavaScript para obtener el ID incluido en el mensaje de Telegram.

Se utiliza un patrón similar a:

```javascript
const id = datos.match(/TF-\d+-\d+/);
```

Esto permite detectar identificadores con una estructura como:

```text
TF-20260814160502-7584
```

Posteriormente se compara el ID recibido con:

```text
ID_candidato
```

almacenado en Google Sheets.

De esta forma se obtiene únicamente el candidato correspondiente.

---

# 13. Notificaciones por correo

Una vez modificado el estado del candidato, el workflow verifica si el resultado es:

```text
Aceptado
```

o:

```text
Rechazado
```

### Candidato aceptado

Se envía un correo indicando que la candidatura fue aceptada y que el candidato continuará con el proceso.

### Candidato rechazado

Se envía un correo informando que la candidatura no continuará en el proceso.

Finalmente, Telegram recibe una confirmación indicando:

```text
Candidato
ID
Estado
Correo al que se envió la notificación
```

---

# 14. Workflow del Dashboard

El Dashboard RRHH obtiene información de candidatos mediante un webhook de n8n.

El frontend realiza una petición HTTP:

```javascript
fetch(URL_WEBHOOK, {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});
```

La respuesta esperada tiene una estructura similar a:

```json
{
    "candidatos": []
}
```

Los candidatos recibidos se almacenan en:

```javascript
let candidatos = [];
```

Posteriormente se renderizan en la tabla HTML.

---

# 15. Dashboard RRHH

El Dashboard contiene cinco indicadores principales:

### Total candidatos

Muestra la cantidad total de candidatos recibidos.

### Score promedio

Calcula el promedio del campo:

```text
Score_compatibilidad
```

### Analizados

Cuenta los candidatos cuyo estado sea:

```text
Analizado
```

### Aceptados

Cuenta candidatos con estado:

```text
Aceptado
```

o:

```text
Preseleccionado
```

### Rechazados

Cuenta candidatos cuyo estado sea:

```text
Rechazado
```

---

# 16. Tabla del Dashboard

La tabla muestra:

| Campo | Descripción |
|---|---|
| ID | Identificador del candidato |
| Nombre | Nombre del candidato |
| Vacante | Vacante a la que se postuló |
| Experiencia | Años de experiencia |
| Score | Compatibilidad calculada |
| Estado | Estado actual |
| Revisión RRHH | Revisión realizada por RRHH |

El JavaScript contempla diferentes variantes de nombres de campos para facilitar la compatibilidad con la información recibida desde n8n.

---

# 17. Modelo de datos

La tabla principal de candidatos contiene los siguientes campos:

```text
ID_candidato
Nombre
Correo
Telefono
Vacante
Experiencia
Habilidades
Nivel_academico
Score_compatibilidad
Estado
Fecha_Postulacion
Observaciones_IA
Revision_RRHH
es_hoja_de_vida
datos_personales
perfil
formaciones
experiencias
habilidades
competencias
idiomas
observacion_IA
nivel_Educativo
vacante
experiencia
vacante_ref
req_habilidades
exp_minima
habilidades_coincidentes
total_requisitos
requisitos_cumplidos
puntos_habilidades
puntos_experiencia
score
clasificacion
recomendacion
```

---

# 18. Sistema de evaluación

La información del candidato contiene campos relacionados con la evaluación automática.

Entre ellos:

```text
vacante_ref
req_habilidades
exp_minima
habilidades_coincidentes
total_requisitos
requisitos_cumplidos
puntos_habilidades
puntos_experiencia
score
clasificacion
recomendacion
```

Estos campos permiten almacenar los resultados obtenidos durante la comparación entre el perfil del candidato y los requisitos de la vacante.

Por ejemplo:

```text
puntos_habilidades
puntos_experiencia
score
clasificacion
recomendacion
```

permiten conservar tanto la puntuación como la clasificación resultante.

---

# 19. Estados de los candidatos

El sistema maneja diferentes estados dependiendo de la etapa del proceso.

Entre los valores observados en la información almacenada se encuentran:

```text
Analizado
Aceptado
Rechazado
```

En el workflow de gestión mediante Telegram, las acciones de RRHH permiten cambiar el estado a:

```text
Aceptado
```

o:

```text
Rechazado
```

---

# 20. Integraciones

## Google Sheets

Utilizado como almacenamiento de:

- Candidatos.
- Resultados de evaluación.
- Vacantes.
- Requisitos.

---

## Telegram

Utilizado como interfaz de comunicación para RRHH.

Permite:

- Consultar candidatos.
- Buscar candidatos.
- Solicitar cambios de estado.
- Recibir confirmaciones.

Bot:

https://t.me/Jerry_n8n_ai_bot

---

## Google Gemini

Utilizado para interpretar las solicitudes realizadas por RRHH y determinar el tipo de acción que debe ejecutar el workflow.

---

## Gmail

Utilizado para enviar automáticamente las notificaciones de aceptación o rechazo al correo del candidato.

---

## ngrok

Utilizado durante el desarrollo para exponer los endpoints de n8n y permitir que servicios externos puedan comunicarse con la instancia local.

---

# 21. Webhooks

El Dashboard utiliza un webhook de n8n para solicitar los candidatos.

Actualmente está configurado mediante:

```text
https://unworldly-unbalance-nautical.ngrok-free.dev/webhook-test/dashboard/candidatos
```

El frontend realiza una petición:

```text
GET /webhook-test/dashboard/candidatos
```

y espera recibir los candidatos desde n8n.

> La URL de ngrok es temporal y puede cambiar cuando se reinicia o modifica la configuración de ngrok.

---

# 22. Flujo de consulta

Cuando RRHH realiza una consulta:

```text
RRHH
  │
  ▼
Telegram
  │
  ▼
Telegram Trigger
  │
  ▼
AI Agent
  │
  ▼
Google Sheets
  │
  ▼
Información del candidato
  │
  ▼
AI Agent
  │
  ▼
Telegram
```

El sistema busca la información directamente en Google Sheets y genera una respuesta para RRHH.

---

# 23. Flujo de cambio de estado

Cuando RRHH solicita aceptar o rechazar un candidato:

```text
RRHH
  │
  ▼
Telegram
  │
  ▼
AI Agent
  │
  ▼
CAMBIO_ESTADO
  │
  ▼
Google Sheets
  │
  ▼
Actualizar Estado
  │
  ▼
Buscar candidato actualizado
  │
  ▼
¿Aceptado?
 ┌─┴──────────┐
 ▼            ▼
Sí            No
 │            │
 ▼            ▼
Gmail       Gmail
Aceptado    Rechazado
 │            │
 └─────┬──────┘
       ▼
    Telegram
       │
       ▼
Confirmación
```

---

# 24. Pruebas realizadas

Se realizaron pruebas sobre las principales funcionalidades del sistema.

## Prueba 1 — Consulta mediante Telegram

Se verificó que el bot pueda recibir una solicitud de consulta y utilizar Google Sheets como fuente de información.

**Resultado:** correcto.

---

## Prueba 2 — Identificación mediante ID

Se probó la identificación mediante IDs con formato:

```text
TF-20260814160502-7584
```

El workflow extrae el ID del mensaje y lo compara con el campo:

```text
ID_candidato
```

**Resultado:** correcto.

---

## Prueba 3 — Cambio de estado

Se probó la actualización del estado de un candidato mediante Telegram.

Ejemplo:

```text
Acepta el candidato TF-20260812184105-1038
```

El workflow actualiza:

```text
Estado = Aceptado
```

**Resultado:** correcto.

---

## Prueba 4 — Rechazo de candidato

Se probó el cambio:

```text
Estado = Rechazado
```

El workflow identifica el nuevo estado y ejecuta la rama correspondiente.

**Resultado:** correcto.

---

## Prueba 5 — Correo de aceptación

Al aceptar un candidato, se ejecuta el nodo de Gmail correspondiente.

**Resultado:** correcto.

---

## Prueba 6 — Correo de rechazo

Al rechazar un candidato, se ejecuta el nodo de Gmail correspondiente.

**Resultado:** correcto.

---

## Prueba 7 — Confirmación mediante Telegram

Después de realizar la modificación, el bot envía información sobre:

```text
Candidato
ID
Estado
Correo de notificación
```

**Resultado:** correcto.

---

## Prueba 8 — Dashboard

Se configuró el Dashboard para obtener los candidatos mediante una petición GET al webhook de n8n.

La información recibida se utiliza para:

- Actualizar KPIs.
- Generar la tabla.
- Mostrar candidatos.
- Calcular el score promedio.

---

# 25. Manejo de errores

El Dashboard cuenta con manejo básico de errores mediante `try/catch`.

Si n8n no responde correctamente:

```text
Error de conexión con n8n.
```

se muestra en la tabla.

También se valida que el AI Agent devuelva una acción válida:

```text
CONSULTA
```

o:

```text
CAMBIO_ESTADO
```

Si no se encuentra un candidato mediante su ID, el workflow genera un error indicando que el candidato no fue encontrado.

---

# 26. Flujo general del sistema

El funcionamiento completo de TalentFlow puede resumirse de la siguiente manera:

```text
                 TALENTFLOW
                     │
          ┌──────────┴──────────┐
          │                     │
      Candidatos             Vacantes
          │                     │
          └──────────┬──────────┘
                     ▼
                   n8n
                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
          Evaluación       Google Sheets
             │               │
             └───────┬───────┘
                     │
                     ▼
                Información
                del candidato
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
      Dashboard             Telegram
          │                     │
          │                     ▼
          │                  Gemini
          │                     │
          │                     ▼
          │              Gestión RRHH
          │                     │
          │              ┌──────┴──────┐
          │              ▼             ▼
          │          Aceptado       Rechazado
          │              │             │
          │              └──────┬──────┘
          │                     ▼
          │                   Gmail
          │                     │
          └─────────────────────┘
```

---

# 27. Objetivo del proyecto

El objetivo de TalentFlow es reducir el trabajo manual asociado a la gestión de candidatos mediante la integración de automatización, inteligencia artificial y herramientas de comunicación.

El sistema permite centralizar la información de los candidatos, automatizar parte del proceso de preselección y facilitar que RRHH pueda consultar y modificar candidatos sin necesidad de acceder directamente a las hojas de cálculo.

---

# 28. Recursos del proyecto

### Bot de Telegram

[**Jerry — TalentFlow Bot**](https://t.me/Jerry_n8n_ai_bot)

### Google Sheets — Candidatos

[**Proyecto n8n — Candidatos**](https://docs.google.com/spreadsheets/d/1Hcb8Jr-_EVz39PXNikhc7BjuE77nu0JXGg4MABr9euA/edit?gid=0#gid=0)

### Google Sheets — Vacantes

[**Vacantes n8n**](https://docs.google.com/spreadsheets/d/1KGVCOKPqZa60F6Zly4GtlfGlHzwBlzO_LXWsVuutmaE/edit?gid=0#gid=0)

---

# 29. Conclusión

**TalentFlow** integra automatización, inteligencia artificial y herramientas de gestión para construir un flujo de preselección de candidatos.

La arquitectura permite que los datos sean almacenados en Google Sheets, procesados mediante workflows de n8n, consultados mediante un agente de IA desde Telegram y visualizados desde un Dashboard web.

Además, las decisiones de RRHH pueden generar automáticamente notificaciones por correo electrónico, permitiendo mantener actualizado al candidato durante el proceso de selección.

El proyecto constituye una solución modular que puede ampliarse posteriormente con nuevas funcionalidades como autenticación para RRHH, filtros avanzados, historial de cambios, estadísticas, paginación, gestión completa de vacantes y una interfaz administrativa más avanzada.
