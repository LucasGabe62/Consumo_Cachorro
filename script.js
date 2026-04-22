if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.error('sw fail:', err));
  });
}

function vibrarHardware() {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

async function CachorroAleatorio(breed = '') {
  vibrarHardware();

  const url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random`
    : 'https://dog.ceo/api/breeds/image/random';

  const img = document.getElementById('imgCachorro');
  const loader = document.getElementById('loader');
  const btnFetch = document.getElementById('btnFetch');
  const actions = document.getElementById('actions');

  img.style.opacity = '0';
  img.style.display = 'none';
  loader.style.display = 'block';
  btnFetch.disabled = true;
  btnFetch.innerHTML = '<span class="icon">⏳</span> Buscando...';
  actions.style.display = 'none';

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    img.onload = () => {
      loader.style.display = 'none';
      img.style.display = 'block';
      setTimeout(() => img.style.opacity = '1', 50);

      
      btnFetch.disabled = false;
      btnFetch.innerHTML = '<span class="icon">🐾</span> Buscar Novo Cão';
      actions.style.display = 'flex';
    }

    img.src = data.message;

  } catch (error) {
    console.error(error);
    loader.style.display = 'none';
    btnFetch.disabled = false;
    btnFetch.innerHTML = '<span class="icon">⚠️</span> Tentar Novamente';
    alert("Sem conexão.");
  }
}

async function listarRacas() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();

    const select = document.getElementById('selectRaca');

    Object.keys(data.message).forEach(raca => {
      const option = document.createElement('option');
      option.value = raca;
      option.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
      select.appendChild(option);
    });
  } catch(e) {
    console.error(e);
  }
}

// ... existing functions ...
function compartilhar() {
  const img = document.getElementById('imgCachorro');
  if (!img.src) return;

  if (navigator.share) {
    try {
      navigator.share({
        title: 'Olha que cachorro fofo!',
        text: 'Encontrei este cãozinho adorável',
        url: img.src
      });
    } catch (error) {
    }
  } else {
    navigator.clipboard.writeText(img.src);
    alert('Link copiado!');
  }
}

function pegarLocalizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude.toFixed(4);
      const lon = position.coords.longitude.toFixed(4);
      alert(`O hardware de GPS detectou sua localização (Lat: ${lat}, Lon: ${lon}). Buscando cães virtuais próximos à você!`);
      CachorroAleatorio();
    }, () => {
      alert("Acesso ao hardware de GPS negado.");
    });
  } else {
    alert("Geolocalização não suportada.");
  }
}

listarRacas();
CachorroAleatorio();