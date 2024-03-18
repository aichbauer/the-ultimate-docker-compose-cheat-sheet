(async () => {
  const res = await fetch('http://localhost:3000');
  const data = await res.json();

  const app = document.getElementById('app');

  const ul = document.createElement('ul');
  app.appendChild(ul);
  data.messages.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = item.message;
    ul.appendChild(li);
  });

  const button = document.createElement('button');
  button.innerHTML = 'Create New Message';
  app.appendChild(button);
  button.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000', {
      method: 'POST',
    });
    const data = await res.json();

    data.messages.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = item.message;
      ul.appendChild(li);
    });
  });
})();
