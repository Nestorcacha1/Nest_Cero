window.addEventListener('load', async function () {
  const listado = document.querySelector('#listado');
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('join', { user: 'room1', text: ' hola mundo' });
  });

  socket.on('msgToClient', (data) => {
    console.log(data);
    const name = Object.values(data);
    listado.innerHTML = '';
    name.forEach((name) => {
      const li = document.createElement('li');
      li.textContent = name;
      listado.appendChild(li);
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

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
    if (data.access_token) {
      socket.emit('msg', {
        user: username,
      });
    }
  });
});
