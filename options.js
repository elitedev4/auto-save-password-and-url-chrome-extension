document.getElementById('save').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('message');

  if (!password) {
    showMessage('Please enter a password', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }

  // Store the password
  chrome.storage.local.set({ csvPassword: password }, () => {
    showMessage('Password saved successfully', 'success');
    // Clear the input fields
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  });
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = 'message ' + type;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 3000);
}

// Check if password is already set
chrome.storage.local.get(['csvPassword'], (result) => {
  if (result.csvPassword) {
    document.getElementById('password').placeholder = 'Enter new password (optional)';
    document.getElementById('confirmPassword').placeholder = 'Confirm new password (optional)';
  }
}); 