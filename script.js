async function CachorroAleatorio(breed = '') {
  const url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random`
    : 'https://dog.ceo/api/breeds/image/random';

  const res = await fetch(url);
  const data = await res.json();

  document.querySelector('img').src = data.message;
}



async function listarRacas() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();

  const select = document.getElementById('selectRaca');

  Object.keys(data.message).forEach(raca => {
    const option = document.createElement('option');
    option.value = raca;
    option.textContent = raca;
    select.appendChild(option);
  });
}

async function CachorroAleatorio(breed = '') {
  const url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random`
    : 'https://dog.ceo/api/breeds/image/random';

  const res = await fetch(url);
  const data = await res.json();

  const img = document.getElementById('imgCachorro');
  img.src = data.message;
  img.style.display = 'inline-block'; // corrigido aqui
}

listarRacas();