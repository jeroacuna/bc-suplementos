// ✏️ CONTACTO Y MENSAJES: editá solo este archivo.
export const SITE = {
  name: 'BC Suplementos',
  city: 'Paraná, Entre Ríos',
  // TODO confirmar: número tomado de la web actual (343 446-5982), en formato wa.me (54 9 + característica + número).
  whatsappNumber: '5493434465982',
  whatsappDisplay: '343 446-5982',
  instagram: 'bcsuplementos1',
  // TODO: poné acá la ruta del logo real (ej. '/logo.svg', guardado en /public). Mientras sea null se muestra un wordmark provisorio.
  logoSrc: null as string | null,
}

export const messages = {
  general: `Hola ${SITE.name}! Quiero hacer una consulta.`,
  product: (p: { name: string; size?: string }) =>
    `Hola ${SITE.name}! Quiero consultar por: ${p.name}${p.size ? ` (${p.size})` : ''}. ¿Lo tienen disponible?`,
}

export const waLink = (text: string) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
