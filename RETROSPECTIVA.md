# Acta de Retrospectiva y Plan de Mejora Continua

**Proyecto:** Landing Page y CMS Centro de Negocios Santiago.

**Fecha de la sesión:** 31 de Mayo de 2026.

**Participantes (Equipo de Desarrollo):** 
* Mixiu Perez
* Andrea Carreño
* Sofia Benavente

---

## 1. Objetivo de la Sesión
Evaluar nuestro ciclo de desarrollo durante la iteración actual (Landing Page + CMS), identificar en conjunto los cuellos de botella técnicos en la adopción del framework (Nuxt 4 / Vue 3) e instaurar un plan de acción proactivo para optimizar el rendimiento de nuestro próximo sprint.


## 2. ¿Qué funcionó bien?
Como equipo, logramos hitos técnicos importantes que hemos decidido estandarizar como pilares de nuestra metodología de trabajo:

**Integración del CMS:** La arquitectura de endpoints modulares en `/server/api` nos permitió escalar el panel de administración sin sobrecargar el lado del cliente.

**Seguridad y Rendimiento:** Blindamos los formularios con `Zod` y un "Honeypot" sin afectar la UX. Además, la implementación exitosa de `@nuxt/image` forzando el formato WebP redujo drásticamente el peso de nuestros recursos visuales.

**Responsividad y Accesibilidad:** El uso conjunto de Tailwind y etiquetas ARIA en componentes complejos (como el carrusel) nos garantizó el cumplimiento de los estándares WCAG 2.1.


## 3. Oportunidades de Mejora
A través de una discusión abierta, identificamos las siguientes áreas críticas que requieren nuestra atención en el próximo ciclo:

**Posicionamiento y SEO Dinámico:** Actualmente, la Landing Page no genera etiquetas meta dinámicas (Open Graph) para cada servicio, lo que limita su alcance al ser compartidos en redes sociales.

**Reutilización de Lógica (Composables):** Detectamos código repetitivo en nuestro panel de administración al manejar los estados de carga y las peticiones a la API en los diferentes formularios.

**Flujo de Ramas (Git Flow):** Aunque utilizamos ramas, notamos que algunos *merges* a la rama principal carecían de una revisión exhaustiva por parte de otro miembro del equipo.

**Feedback Visual y Usabilidad (UX):** El uso de ventanas emergentes nativas del navegador (`alert`) para confirmar envíos interrumpe el flujo del usuario. Adicionalmente, detectamos fricción en el login al no contar con un mecanismo para visualizar la contraseña ingresada.

**Gestión Completa de Entidades (CRUD):** Actualmente el panel de administración permite la creación, lectura y eliminación de registros, pero carece de la funcionalidad de edición (Update) para modificar categorías, servicios o preguntas existentes sin tener que borrarlos y crearlos de nuevo.


## 4. Plan de Acción Estratégico
Para resolver los puntos anteriores, hemos acordado implementar las siguientes estrategias:

**Marketing / SEO** 
Implementar el composable `useSeoMeta()` de Nuxt para inyectar títulos y descripciones dinámicas basados en la base de datos de servicios.
Lograr una mejora de puntuación SEO en auditorías de Lighthouse.

**Experiencia de Usuario (UX)**
Reemplazar los `alert()` nativos por el sistema de Notificaciones (Toasts) de `@nuxt/ui`. 
Implementar un *toggle* de "Mostrar/Ocultar" en el input de contraseña del login.
Eliminar alertas bloqueantes del navegador y reducir errores de tipeo.

**Arquitectura**
Refactorizar la lógica de peticiones asíncronas del CMS extrayéndola hacia un *Composable* global (ej. `useAdminFetch()`) que maneje los estados automáticamente.
Reducir el volumen de código en el componente Admin.vue.

**Funcionalidad (CMS)**
Implementar los métodos `PUT/PATCH` en nuestros endpoints de `/server/api` y habilitar formularios de edición para todas las entidades del panel.
Completar el 100% de las operaciones CRUD funcionales en la interfaz de administración.

**Control de Versiones**
* Establecer revisiones cruzadas obligatorias: ningún miembro fusionará su propio *Pull Request* hacia la rama `main` sin la revisión previa de un compañero.
* Evitar integraciones inestables y asegurar la calidad del código mediante *Code Review*.

