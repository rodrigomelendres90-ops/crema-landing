// ===== CONFIGURACIÓN DEL WEBHOOK =====
const WEBHOOK_URL = "http://localhost:5678/webhook-test/7474136f-170e-41b3-862d-610d2d159fe2"; // reemplazar por tu URL real de n8n

// ===== VARIABLES GLOBALES =====
const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const pedidoForm = document.getElementById('pedidoForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('form-message');
const productSelect = document.getElementById('producto');
const dateInput = document.getElementById('fecha_entrega');

// ===== ÍNDICE DE PRODUCTOS (desde las cards) =====
let PRODUCT_INDEX = {}; // { sku: { nombre, precio, label } }

function buildProductIndexFromCards() {
  PRODUCT_INDEX = {};
  document.querySelectorAll('.producto-card').forEach(card => {
    const sku = card.getAttribute('data-sku');
    const precio = Number(card.getAttribute('data-precio')) || 0;
    const nombre = card.querySelector('.producto-nombre')?.textContent?.trim() || sku;
    if (!sku) return;
    PRODUCT_INDEX[sku] = {
      sku,
      nombre,
      precio,
      label: precio > 0 ? `${nombre} - $${precio}` : `${nombre} - desde $${precio}`
    };
  });
}

function populateSelectFromIndex() {
  const select = document.getElementById('producto');
  if (!select) return;

  // Mantén el primer option "Selecciona un producto"
  select.innerHTML = '<option value="">Selecciona un producto</option>';

  // Ordenar por nombre para que se vea bonito
  const items = Object.values(PRODUCT_INDEX).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  for (const p of items) {
    const opt = document.createElement('option');
    opt.value = p.sku;
    // Si precio 0 (personalizados, "desde"), mostramos "desde ..."
    opt.textContent = p.precio > 0 ? `${p.nombre} - $${p.precio}` : `${p.nombre} - desde $${p.precio || '---'}`;
    select.appendChild(opt);
  }
}

function setupProductCardClicks() {
  document.querySelectorAll('.producto-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const sku = card.getAttribute('data-sku');
      const select = document.getElementById('producto');
      if (!sku || !select) return;

      select.value = sku;

      // Marca el select como success y limpia error
      clearFieldError({ target: select });
      select.classList.add('success');

      // ACTUALIZA el mínimo de fecha según el producto elegido
      updateDeliveryDateMin();

      // Scroll al formulario
      smoothScrollTo('#pedidos');
    });
  });
}

function setupProducts() {
  buildProductIndexFromCards();
  populateSelectFromIndex();
  setupProductCardClicks();
}

// === FECHAS: utilidades y regla de 4 días para personalizados ===
// Devuelve YYYY-MM-DD en hora local (evita desfases por zona horaria)
function isoDateTodayPlus(days) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    // Ajuste a local (tipo="date" trabaja en local)
    const tzOffsetMs = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - tzOffsetMs);
    return local.toISOString().split('T')[0];
  }
  

function isPersonalizadoSku(sku) {
    const info = getProductInfoBySku(sku);
    const text = `${String(sku || '')} ${String(info.nombre || '')}`.toLowerCase();
    // Detecta "personal" o "personalizado" en el sku o en el nombre (e.g., "pastel personalizado")
    return /\bpersonal(izado)?\b/.test(text);
  }
  

function updateDeliveryDateMin() {
  if (!dateInput || !productSelect) return;
  const sku = productSelect.value;
  const days = isPersonalizadoSku(sku) ? 4 : 0; // personalizado = +4 días
  dateInput.min = isoDateTodayPlus(days);

  // Si la fecha elegida ya no cumple el nuevo min, se limpia
  if (dateInput.value && dateInput.value < dateInput.min) {
    dateInput.value = '';
  }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupFormValidation();
  setupScrollEffects();
  setupMobileMenu();
  setupProducts();              // indexa cards y llena el select
  updateDeliveryDateMin();      // fija el min al cargar

  if (productSelect) {
    productSelect.addEventListener('change', updateDeliveryDateMin);
  }
}

// ===== NAVEGACIÓN SUAVE =====
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (nav.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });
  });
}

// ===== MENÚ MÓVIL =====
function setupMobileMenu() {
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
}

function toggleMobileMenu() {
  const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

  mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
  nav.classList.toggle('active');

  // Animar el botón hamburguesa
  const spans = mobileMenuToggle.querySelectorAll('span');
  if (nav.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// ===== EFECTOS DE SCROLL =====
function setupScrollEffects() {
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header con efecto de transparencia
    if (scrollTop > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }

    // Ocultar/mostrar header en scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

// ===== VALIDACIÓN DEL FORMULARIO =====
function setupFormValidation() {
  if (!pedidoForm) return;

  const inputs = pedidoForm.querySelectorAll('input, select, textarea');

  // Validación en tiempo real
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });

  // Envío del formulario
  pedidoForm.addEventListener('submit', handleFormSubmit);
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (!errorElement) return true;

  let isValid = true;
  let errorMessage = '';

  // Validar campo requerido
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo es obligatorio';
  }

  // Validaciones específicas por campo
  if (isValid && value) {
    switch (fieldName) {
      case 'nombre':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'telefono':
        if (!isValidPhoneMX(value)) {
          isValid = false;
          errorMessage = 'Ingresa un teléfono válido de México o internacional';
        }
        break;

      case 'cantidad': {
        const quantity = parseInt(value, 10);
        if (isNaN(quantity) || quantity < 1) {
          isValid = false;
          errorMessage = 'La cantidad debe ser mayor a 0';
        }
        break;
      }

      case 'fecha_entrega': {
        if (!value) {
          isValid = false;
          errorMessage = 'Selecciona una fecha de entrega';
          break;
        }

        // Calcula el mínimo según el producto seleccionado
        const skuSel = (pedidoForm.querySelector('#producto')?.value) || '';
        const minStr = isPersonalizadoSku(skuSel) ? isoDateTodayPlus(4) : isoDateTodayPlus(0);

        // Comparación de strings ISO (YYYY-MM-DD) funciona cronológicamente
        if (value < minStr) {
          isValid = false;
          errorMessage = isPersonalizadoSku(skuSel)
            ? 'Para pedidos personalizados, la fecha debe ser con al menos 4 días de anticipación'
            : 'La fecha no puede ser anterior a hoy';
        }
        break;
      }
    }
  }

  // Mostrar/ocultar error
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError({ target: field });
    return true;
  }
  return isValid;
}

function isValidPhoneMX(phone) {
  // Validación básica para teléfonos mexicanos
  const digits = String(phone).replace(/\D/g, ''); // deja solo dígitos
  // Acepta 10 dígitos (nacional) o 12 con prefijo 52 (internacional)
  if (digits.length === 10) return true;
  if (digits.length === 12 && digits.startsWith('52')) return true;

  return false;
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field.name}-error`);

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  field.classList.add('error');
  field.classList.remove('success');
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = document.getElementById(`${field.name}-error`);

  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  field.classList.remove('error');

  // Marcar como válido si tiene valor
  if (field.value.trim()) {
    field.classList.add('success');
  }
}

function validateForm() {
  const inputs = pedidoForm.querySelectorAll('input, select, textarea');
  let isValid = true;

  inputs.forEach(input => {
    const ok = validateField({ target: input });
    if (!ok) {
      console.warn('[VALIDACIÓN] Falló:', input.name, 'valor:', input.value);
      isValid = false;
    }
  });

  return isValid;
}

// ===== ENVÍO DEL FORMULARIO =====
function getProductInfoBySku(sku) {
  return PRODUCT_INDEX[sku] || { sku, nombre: sku, precio: 0 };
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    showFormMessage('Por favor, corrige los errores en el formulario', 'error');
    return;
  }

  // Preparar datos del formulario
  const formData = new FormData(pedidoForm);
  const sku = formData.get('producto'); // ahora el value del select es el sku
  const cantidad = Number(formData.get('cantidad')) || 1;
  const pInfo = getProductInfoBySku(sku);

  const orderData = {
    nombre: formData.get('nombre'),
    telefono: formData.get('telefono'),
    sku,                                  // ej. "alfajores"
    nombreProducto: pInfo.nombre,         // ej. "Alfajores"
    precioUnitario: pInfo.precio,         // ej. 250
    cantidad,                             // número
    total: pInfo.precio * cantidad,       // ej. 500
    fechaEntrega: formData.get('fecha_entrega'),
    mensaje: formData.get('mensaje'),
    fecha: new Date().toISOString(),
    timestamp: Date.now(),
    fuente: 'landing_crema'
  };

  try {
    // Mostrar estado de carga
    setLoadingState(true);

    console.log('[n8n] URL:', WEBHOOK_URL);
    console.log('[n8n] Payload:', orderData);

    // Enviar a webhook de n8n
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    // 👉 Log del status
    console.log('[n8n] Status:', response.status);

    if (response.ok) {
      showFormMessage('¡Pedido enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      pedidoForm.reset();
      clearAllFieldStates();
      updateDeliveryDateMin(); // re-calcula min tras reset
    } else {
      throw new Error(`Error del servidor: ${response.status}`);
    }

  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    showFormMessage('Error al enviar el pedido. Por favor, intenta nuevamente o contáctanos directamente.', 'error');
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(loading) {
  if (loading) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

function showFormMessage(message, type) {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);

  // Hacer scroll al mensaje
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearAllFieldStates() {
  const inputs = pedidoForm.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.classList.remove('error', 'success');
    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  });
}

// ===== UTILIDADES ADICIONALES =====

// Lazy loading para imágenes
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Smooth scroll para enlaces internos
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const headerHeight = header.offsetHeight;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function (e) {
  if (nav.classList.contains('active') &&
    !nav.contains(e.target) &&
    !mobileMenuToggle.contains(e.target)) {
    toggleMobileMenu();
  }
});

// Prevenir scroll cuando el menú móvil está abierto
function preventScrollOnMobileMenu() {
  if (nav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Agregar listener para el menú móvil
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function () {
    setTimeout(preventScrollOnMobileMenu, 100);
  });
}

// ===== MANEJO DE ERRORES GLOBAL =====
window.addEventListener('error', function (e) {
  console.error('Error global:', e.error);
});

// ===== PERFORMANCE Y ACCESIBILIDAD =====

// Reducir motion para usuarios que lo prefieren
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Focus management para navegación por teclado
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && nav.classList.contains('active')) {
    toggleMobileMenu();
    mobileMenuToggle.focus();
  }
});

// ===== INICIALIZACIÓN FINAL =====
// Asegurar que todo esté listo
window.addEventListener('load', function () {
  setupLazyLoading();

  // Verificar si el formulario existe
  if (!pedidoForm) {
    console.warn('Formulario de pedido no encontrado');
  }

  // Verificar webhook URL
  if (WEBHOOK_URL === "https://TU-WEBHOOK-DE-N8N.example") {
    console.warn('⚠️ IMPORTANTE: Configura la URL del webhook de n8n en script.js');
    showFormMessage('⚠️ Configuración pendiente: Actualiza la URL del webhook en script.js', 'error');
  }
});
