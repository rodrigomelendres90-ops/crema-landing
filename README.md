# Crëma – Repostería Fina

Landing page premium para repostería artesanal con diseño elegante en blanco, negro, dorado y plata. Proyecto desarrollado con HTML5, CSS3 y JavaScript vanilla, optimizado para SEO, rendimiento y accesibilidad.

## 🎨 Características

- **Diseño Premium**: Paleta de colores elegante (blanco/negro/dorado/plata)
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags, Open Graph, estructura semántica
- **Accesibilidad AA**: Cumple estándares de accesibilidad web
- **Formulario Funcional**: Listo para conectar con webhook de n8n
- **Animaciones Sutiles**: Logo con efectos de halo y shimmer
- **Sin Frameworks**: Código limpio y optimizado

## 🚀 Instalación

### Opción 1: Abrir directamente
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador web

### Opción 2: Servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## ⚙️ Configuración

### 1. Configurar Webhook de n8n

Edita el archivo `script.js` y actualiza la URL del webhook:

```javascript
const WEBHOOK_URL = "https://tu-webhook-real-de-n8n.com/webhook";
```

**Pasos para crear webhook en n8n:**
1. Crea un nuevo workflow en n8n
2. Agrega un nodo "Webhook"
3. Configura el método POST
4. Copia la URL del webhook
5. Pega la URL en `script.js`

### 2. Personalizar Información de Contacto

Edita `index.html` y actualiza:
- Número de WhatsApp
- Email de contacto
- Horarios de atención
- Información de la empresa

### 3. Reemplazar Imágenes

Coloca tus imágenes en la carpeta `/imagenes`:
- `logo.png` - Logo principal (recomendado: 320x160px)
- `producto1.jpg` a `producto6.jpg` - Imágenes de productos
- `taller.jpg` - Imagen del taller
- `favicon.ico` - Icono del sitio

**Formatos recomendados:**
- Logo: PNG con transparencia
- Productos: JPG, 600x400px
- Favicon: ICO, 16x16px

## 🎨 Personalización

### Colores
Los colores están definidos como variables CSS en `styles.css`:

```css
:root {
  --color-bg: #FFFFFF;        /* Fondo principal */
  --color-text: #1A1A1A;      /* Texto principal */
  --color-black: #0A0A0A;     /* Negro principal */
  --gold: #D4AF37;            /* Dorado principal */
  --gold-700: #B5972B;        /* Dorado oscuro */
  --silver: #C0C0C0;          /* Plata principal */
  --silver-700: #9AA0A6;      /* Plata oscuro */
}
```

### Tipografías
El proyecto usa Google Fonts:
- **Títulos**: Playfair Display (serif elegante)
- **Texto**: Inter (sans legible)

Para cambiar las tipografías:
1. Actualiza los enlaces en `index.html`
2. Modifica las variables CSS en `styles.css`

### Animación del Logo
La animación del logo incluye:
- **Halo dorado**: Sombra que pulsa suavemente
- **Shimmer**: Efecto de brillo diagonal sutil

Para personalizar:
```css
/* Ajustar intensidad del halo */
filter: drop-shadow(0 6px 14px rgba(212,175,55,0.16));

/* Ajustar velocidad del shimmer */
animation: shimmerSweep 8s ease-in-out infinite;
```

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

**Breakpoints principales:**
- `@media (max-width: 768px)` - Navegación móvil
- `@media (max-width: 480px)` - Ajustes para móviles pequeños

## ♿ Accesibilidad

### Características implementadas:
- **Semántica HTML5**: `<header>`, `<nav>`, `<main>`, `<section>`
- **ARIA labels**: `aria-label`, `aria-describedby`, `aria-live`
- **Navegación por teclado**: Focus visible, Escape para cerrar menú
- **Contraste**: Cumple estándares WCAG AA
- **Reducción de movimiento**: Respeta preferencias del usuario

### Para mejorar aún más:
- Agregar `skip links` para navegación por teclado
- Implementar `prefers-color-scheme` para modo oscuro
- Agregar más `aria-live` regions

## 🔧 Estructura del Proyecto

```
crema-reposteria/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── imagenes/           # Carpeta de imágenes
    ├── logo.png        # Logo principal
    ├── producto1.jpg   # Imagen producto 1
    ├── producto2.jpg   # Imagen producto 2
    ├── producto3.jpg   # Imagen producto 3
    ├── producto4.jpg   # Imagen producto 4
    ├── producto5.jpg   # Imagen producto 5
    ├── producto6.jpg   # Imagen producto 6
    ├── taller.jpg      # Imagen del taller
    └── favicon.ico     # Icono del sitio
```

## 📊 SEO y Rendimiento

### Meta tags implementados:
- Descripción y palabras clave
- Open Graph para redes sociales
- Twitter Cards
- Viewport y charset

### Optimizaciones de rendimiento:
- Lazy loading de imágenes
- CSS y JS minificados (recomendado para producción)
- Fuentes web optimizadas
- Transiciones CSS eficientes

### Para mejorar SEO:
- Agregar `sitemap.xml`
- Implementar `robots.txt`
- Agregar datos estructurados (Schema.org)
- Optimizar imágenes con WebP

## 🚀 Despliegue

### Opciones de hosting:
1. **Netlify**: Drag & drop de la carpeta
2. **Vercel**: Conecta tu repositorio Git
3. **GitHub Pages**: Sube a un repositorio público
4. **Hosting tradicional**: Sube archivos via FTP

### Antes del despliegue:
1. Configura la URL del webhook de n8n
2. Reemplaza las imágenes placeholder
3. Personaliza la información de contacto
4. Verifica que el formulario funcione

## 🐛 Solución de Problemas

### El formulario no envía:
- Verifica que `WEBHOOK_URL` esté configurada correctamente
- Revisa la consola del navegador para errores
- Asegúrate de que n8n esté funcionando

### Las imágenes no se cargan:
- Verifica que existan en la carpeta `/imagenes`
- Comprueba que las rutas en `index.html` sean correctas
- Asegúrate de que los nombres de archivo coincidan

### Problemas de responsive:
- Verifica que el viewport meta tag esté presente
- Comprueba que los media queries estén correctos
- Usa las herramientas de desarrollador del navegador

## 📝 Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo libremente para proyectos comerciales y personales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:
1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Revisa este README
- Consulta la consola del navegador para errores
- Verifica que todos los archivos estén presentes

---

**Desarrollado con ❤️ para Crëma - Repostería Fina**

*Proyecto optimizado para rendimiento, accesibilidad y SEO*
