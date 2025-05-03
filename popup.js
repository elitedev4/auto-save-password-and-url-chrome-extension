// Check if password is set
chrome.storage.local.get(['csvPassword'], (result) => {
  if (!result.csvPassword) {
    showMessage('Please set a password in settings first', 'error');
    document.getElementById('passwordSection').style.display = 'none';
    document.getElementById('downloadSection').style.display = 'none';
  }
});

// Handle password verification
document.getElementById('verify').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  
  chrome.storage.local.get(['csvPassword'], (result) => {
    if (password === result.csvPassword) {
      document.getElementById('passwordSection').style.display = 'none';
      document.getElementById('downloadSection').style.display = 'block';
      showMessage('Password verified', 'success');
    } else {
      showMessage('Incorrect password', 'error');
    }
  });
});

// Handle settings link
document.getElementById('openSettings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Handle CSV download
document.getElementById('download').addEventListener('click', () => {
  chrome.runtime.sendMessage({type: 'GET_CREDENTIALS'}, (credentials) => {
    if (!credentials || credentials.length === 0) {
      showMessage('No credentials saved.', 'error');
      return;
    }
    // Convert to CSV with proper escaping
    const escapeCSV = (field) => {
      if (field === null || field === undefined) return '""';
      const stringField = String(field);
      // If field contains comma, quote, or newline, wrap in quotes and escape quotes
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return '"' + stringField.replace(/"/g, '""') + '"';
      }
      return stringField;
    };

    // Format timestamp to local date and time
    const formatTimestamp = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleString();
    };

    const header = 'Username,Password,URL,Date and Time\n';
    const rows = credentials.map(c => 
      [c.username, c.password, c.url, formatTimestamp(c.timestamp)].map(escapeCSV).join(',')
    );
    const csv = header + rows.join('\n');
    
    // Download
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credentials.csv';
    a.click();
    URL.revokeObjectURL(url);
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