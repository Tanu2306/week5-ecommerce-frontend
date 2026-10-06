const luhn = (num) => {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
};

export const validators = {
  fullName: (v) => (v.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address.'),
  phone: (v) => (/^\d{10}$/.test(v.replace(/\s|-/g, '')) ? '' : 'Enter a 10-digit phone number.'),
  address: (v) => (v.trim().length >= 5 ? '' : 'Enter your street address.'),
  city: (v) => (v.trim().length >= 2 ? '' : 'Enter your city.'),
  postal: (v) => (/^[A-Za-z0-9 -]{4,10}$/.test(v.trim()) ? '' : 'Enter a valid postal code.'),
  cardNumber: (v) => {
    const digits = v.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(digits)) return 'Enter a valid card number.';
    return luhn(digits) ? '' : 'That card number is not valid.';
  },
  expiry: (v, now = new Date()) => {
    const m = /^(\d{2})\/(\d{2})$/.exec(v);
    if (!m) return 'Use MM/YY.';
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) return 'Month must be 01-12.';
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);
    return endOfMonth >= now ? '' : 'This card has expired.';
  },
  cvv: (v) => (/^\d{3,4}$/.test(v) ? '' : 'Enter the 3 or 4 digit code.'),
};

export function validateAll(values) {
  const errors = {};
  Object.keys(validators).forEach((k) => {
    const msg = validators[k](values[k] ?? '');
    if (msg) errors[k] = msg;
  });
  return errors;
}
