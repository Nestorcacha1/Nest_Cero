const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = form.querySelector('input[type="text"]').value;
  const password = form.querySelector('input[type="password"]').value;

  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success_token) {
    localStorage.setItem('token', data.success_token);
    window.location.href = '/dashboard';
  }
});
