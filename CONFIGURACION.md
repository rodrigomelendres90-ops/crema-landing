# 🚀 CONFIGURACIÓN RÁPIDA - CRËMA REPOSTERÍA

## ⚡ PASOS INMEDIATOS (5 minutos)

### 1. Configurar Webhook de n8n
Edita `script.js` línea 2:
```javascript
const WEBHOOK_URL = "https://tu-webhook-real-de-n8n.com/webhook";
```

### 2. Personalizar Información de Contacto
Edita `index.html`:
- **WhatsApp**: Línea ~280, busca `+52 55 1234 5678`
- **Email**: Línea ~290, busca `pedidos@crema-reposteria.com`
- **Horarios**: Líneas ~300-301

### 3. Agregar Imágenes
Coloca en la carpeta `/imagenes`:
- `logo.png` (320x160px)
- `producto1.jpg` a `producto6.jpg` (600x400px)
- `taller.jpg` (800x600px)
- `favicon.ico` (16x16px)

## 🎨 PERSONALIZACIÓN AVANZADA

### Cambiar Colores
Edita `styles.css` líneas 2-11:
```css
:root {
  --color-bg: #FFFFFF;        /* Fondo */
  --color-text: #1A1A1A;      /* Texto */
  --color-black: #0A0A0A;     /* Negro */
  --gold: #D4AF37;            /* Dorado */
  --gold-700: #B5972B;        /* Dorado oscuro */
  --silver: #C0C0C0;          /* Plata */
  --silver-700: #9AA0A6;      /* Plata oscuro */
}
```

### Cambiar Tipografías
Edita `index.html` líneas 35-37:
```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Ajustar Animación del Logo
Edita `styles.css` líneas 180-200:
```css
/* Velocidad del halo */
animation: haloPulse 7s ease-in-out infinite;

/* Velocidad del shimmer */
animation: shimmerSweep 8s ease-in-out infinite;
```

## 🔧 CONFIGURACIÓN DE N8N

### Crear Webhook en n8n:
1. Abre n8n
2. Nuevo workflow
3. Agrega nodo "Webhook"
4. Configura método POST
5. Copia la URL generada
6. Pégala en `script.js`

### Estructura de datos que envía el formulario:
```json
{
  "nombre": "Nombre del cliente",
  "telefono": "55 1234 5678",
  "producto": "chocolate-premium",
  "cantidad": "1",
  "mensaje": "Mensaje adicional",
  "fecha": "2025-01-13T18:30:00.000Z",
  "timestamp": 1705165800000
}
```

## 📱 TESTING RÁPIDO

### Verificar que funciona:
1. Abre `index.html` en navegador
2. Haz scroll por todas las secciones
3. Prueba el menú móvil (redimensiona ventana)
4. Llena el formulario (sin enviar)
5. Verifica navegación suave

### Errores comunes:
- **Imágenes no cargan**: Verifica rutas en `/imagenes`
- **Formulario no valida**: Revisa consola del navegador
- **No responsive**: Verifica viewport meta tag

## 🚀 DESPLIEGUE

### Opción 1: Netlify (Gratis)
1. Ve a netlify.com
2. Drag & drop la carpeta del proyecto
3. ¡Listo!

### Opción 2: GitHub Pages
1. Sube a repositorio público
2. Activa GitHub Pages
3. ¡Listo!

### Opción 3: Hosting tradicional
1. Sube archivos via FTP
2. Configura dominio
3. ¡Listo!

## 📞 SOPORTE

### Si algo no funciona:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos estén presentes
3. Comprueba que las rutas sean correctas
4. Asegúrate de que n8n esté funcionando

### Archivos obligatorios:
- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ carpeta /imagenes con imágenes

---

**¡Tu landing page estará funcionando en menos de 10 minutos!** 🎉
