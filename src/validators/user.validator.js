const allowedRoles = ['user', 'coach', 'admin'];

function validateUserPayload(payload = {}, { partial = false, forceRole = null } = {}) {
  const errors = {};
  const data = {};

  if (!partial || payload.full_name !== undefined) {
    const fullName = String(payload.full_name || '').trim();
    if (!fullName) errors.full_name = 'El nombre completo es obligatorio.';
    else if (fullName.length < 3) errors.full_name = 'El nombre completo debe tener al menos 3 caracteres.';
    else data.full_name = fullName;
  }

  if (!partial || payload.email !== undefined) {
    const email = String(payload.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'El correo es obligatorio.';
    else if (!emailRegex.test(email)) errors.email = 'El correo no tiene un formato válido.';
    else data.email = email;
  }

  if (!partial || payload.pass !== undefined) {
    const pass = String(payload.pass || '');
    if (!partial || pass) {
      if (!pass) errors.pass = 'La contraseña es obligatoria.';
      else if (pass.length < 8) errors.pass = 'La contraseña debe tener mínimo 8 caracteres.';
      else data.pass = pass;
    }
  }

  if (!partial || payload.fecha_nacimiento !== undefined) {
    if (payload.fecha_nacimiento) data.fecha_nacimiento = payload.fecha_nacimiento;
    else if (!partial) data.fecha_nacimiento = null;
  }

  if (!partial || payload.refresh_pass !== undefined) {
    if (payload.refresh_pass !== undefined) data.refresh_pass = Boolean(payload.refresh_pass);
  }

  if (!partial || payload.role !== undefined || forceRole !== null) {
    const role = forceRole || payload.role || 'user';
    if (!allowedRoles.includes(role)) errors.role = 'El rol indicado no es válido.';
    else data.role = role;
  }

  if (!partial || payload.otros !== undefined) {
    if (payload.otros === undefined || payload.otros === null || payload.otros === '') {
      data.otros = {};
    } else if (typeof payload.otros !== 'object' || Array.isArray(payload.otros)) {
      errors.otros = 'El campo otros debe ser un objeto JSON válido.';
    } else {
      data.otros = payload.otros;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data
  };
}

module.exports = {
  validateUserPayload,
  allowedRoles
};
