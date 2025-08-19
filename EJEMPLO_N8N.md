# 🔗 CONFIGURACIÓN DE N8N PARA CRËMA REPOSTERÍA

## 📋 PASOS PARA CONFIGURAR N8N

### 1. Crear Nuevo Workflow
1. Abre n8n en tu navegador
2. Click en "New Workflow"
3. Dale un nombre como "Crëma Pedidos"

### 2. Agregar Nodo Webhook
1. Busca "Webhook" en la barra de búsqueda
2. Arrastra el nodo "Webhook" al canvas
3. Configura el nodo:
   - **HTTP Method**: POST
   - **Path**: `/crema-pedidos` (o el que prefieras)
   - **Response Mode**: Respond to Webhook
   - **Response Code**: 200

### 3. Configurar Respuesta
1. En el nodo Webhook, ve a "Respond to Webhook"
2. **Response Body**: 
```json
{
  "success": true,
  "message": "Pedido recibido correctamente",
  "timestamp": "{{ $now }}"
}
```

### 4. Agregar Nodos de Procesamiento (Opcional)
Después del Webhook, puedes agregar:

#### Nodo "Set" - Formatear Datos
```json
{
  "cliente": "{{ $json.nombre }}",
  "telefono": "{{ $json.telefono }}",
  "producto": "{{ $json.producto }}",
  "cantidad": "{{ $json.cantidad }}",
  "mensaje": "{{ $json.mensaje }}",
  "fecha_pedido": "{{ $json.fecha }}"
}
```

#### Nodo "Email" - Notificar al Equipo
- **To**: tu-email@crema-reposteria.com
- **Subject**: Nuevo Pedido - {{ $json.producto }}
- **Message**: 
```
Nuevo pedido recibido:

Cliente: {{ $json.nombre }}
Teléfono: {{ $json.telefono }}
Producto: {{ $json.producto }}
Cantidad: {{ $json.cantidad }}
Mensaje: {{ $json.mensaje }}
Fecha: {{ $json.fecha }}
```

#### Nodo "Google Sheets" - Guardar en Excel
- Conecta tu cuenta de Google
- Selecciona la hoja de cálculo
- Mapea los campos del pedido

#### Nodo "WhatsApp" - Notificar al Cliente
- Conecta tu cuenta de WhatsApp Business
- Envía confirmación automática

### 5. Activar el Workflow
1. Click en "Active" en la esquina superior derecha
2. Copia la URL del webhook que aparece
3. Pégala en `script.js` del proyecto

## 🔧 EJEMPLO DE WORKFLOW COMPLETO

```
[Webhook] → [Set] → [Email] → [Google Sheets] → [WhatsApp]
```

### Configuración del Nodo "Set":
```json
{
  "cliente": "{{ $json.nombre }}",
  "telefono": "{{ $json.telefono }}",
  "producto": "{{ $json.producto }}",
  "cantidad": "{{ $json.cantidad }}",
  "mensaje": "{{ $json.mensaje }}",
  "fecha_pedido": "{{ $json.fecha }}",
  "total_estimado": "{{ $json.cantidad * getProductPrice($json.producto) }}"
}
```

### Función Personalizada para Precios:
```javascript
function getProductPrice(producto) {
  const precios = {
    'chocolate-premium': 450,
    'vainilla-frutas': 380,
    'red-velvet': 520,
    'limon-fresco': 420,
    'cafe-especial': 480,
    'personalizado': 600
  };
  return precios[producto] || 0;
}
```

## 📱 NOTIFICACIONES AUTOMÁTICAS

### Email de Confirmación al Cliente:
```html
<h2>¡Gracias por tu pedido, {{ $json.nombre }}!</h2>

<p>Hemos recibido tu pedido de:</p>
<ul>
  <li><strong>Producto:</strong> {{ $json.producto }}</li>
  <li><strong>Cantidad:</strong> {{ $json.cantidad }}</li>
  <li><strong>Mensaje:</strong> {{ $json.mensaje }}</li>
</ul>

<p>Nos pondremos en contacto contigo pronto al teléfono {{ $json.telefono }} para confirmar detalles y fecha de entrega.</p>

<p>¡Gracias por elegir Crëma - Repostería Fina!</p>
```

### WhatsApp de Confirmación:
```
¡Hola {{ $json.nombre }}! 

Gracias por tu pedido en Crëma 🎂

Producto: {{ $json.producto }}
Cantidad: {{ $json.cantidad }}

Nos pondremos en contacto contigo pronto para confirmar detalles y fecha de entrega.

¡Que tengas un excelente día! ✨
```

## 🚨 MANEJO DE ERRORES

### Respuesta de Error en Webhook:
```json
{
  "success": false,
  "error": "{{ $json.error }}",
  "timestamp": "{{ $now }}"
}
```

### Validación de Datos:
```javascript
// En nodo "Code" antes del procesamiento
const requiredFields = ['nombre', 'telefono', 'producto', 'cantidad'];
const missingFields = requiredFields.filter(field => !$json[field]);

if (missingFields.length > 0) {
  throw new Error(`Campos faltantes: ${missingFields.join(', ')}`);
}

if ($json.cantidad < 1) {
  throw new Error('La cantidad debe ser mayor a 0');
}
```

## 📊 MONITOREO Y LOGS

### Agregar Nodo "Write Binary File" para Logs:
- **File Name**: `pedidos-{{ $now.format('YYYY-MM-DD') }}.log`
- **Data**: `{{ JSON.stringify($json, null, 2) }}`

### Agregar Nodo "Telegram" para Alertas:
- Envía notificaciones a tu equipo cuando lleguen pedidos
- Incluye resumen diario de pedidos

## 🔄 AUTOMATIZACIONES ADICIONALES

### Recordatorios Automáticos:
1. **Nodo "Cron"** - Ejecutar diariamente a las 9:00 AM
2. **Nodo "Google Sheets"** - Leer pedidos del día anterior
3. **Nodo "Email"** - Enviar resumen al equipo

### Seguimiento de Pedidos:
1. **Nodo "Webhook"** - Recibir actualizaciones de estado
2. **Nodo "WhatsApp"** - Notificar al cliente cambios de estado
3. **Nodo "Google Sheets"** - Actualizar estado del pedido

---

**¡Con esta configuración tendrás un sistema completo de gestión de pedidos automatizado!** 🎯
