function validateLoginPayload(payload = {}) {
  const errors = {};

  if (!payload.email || !String(payload.email).trim()) {
    errors.email = 'El correo es obligatorio.';
  }

  if (!payload.pass || !String(payload.pass).trim()) {
    errors.pass = 'La contraseña es obligatoria.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateLoginPayload };
