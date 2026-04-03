// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker Registrado!', reg.scope))
      .catch(err => console.error('Erro ao registrar Service Worker:', err));
  });
}

function vibrarHardware() {
  // Integração recomendada: Hardware feature (Vibration API)
  if (navigator.vibrate) {
    // Vibra por 50ms (suave) em dispositivos mobile compativeis
    navigator.vibrate(50);
  }
}

async function CachorroAleatorio(breed = '') {
  vibrarHardware(); // Feedback tátil imediato

  const url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random`
    : 'https://dog.ceo/api/breeds/image/random';

  const img = document.getElementById('imgCachorro');
  const loader = document.getElementById('loader');
  const btnFetch = document.getElementById('btnFetch');
  const actions = document.getElementById('actions');

  // Loading state
  img.style.opacity = '0';
  img.style.display = 'none';
  loader.style.display = 'block';
  btnFetch.disabled = true;
  btnFetch.innerHTML = '<span class="icon">⏳</span> Buscando...';
  actions.style.display = 'none';

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // Aguarda o onload da imagem para remover loader
    img.onload = () => {
      loader.style.display = 'none';
      img.style.display = 'block';
      setTimeout(() => img.style.opacity = '1', 50);
      
      btnFetch.disabled = false;
      btnFetch.innerHTML = '<span class="icon">🐾</span> Buscar Novo Cão';
      actions.style.display = 'block';
    }

    // Dispara carregamento
    img.src = data.message;

  } catch (error) {
    console.error("Erro ao buscar cachorro", error);
    loader.style.display = 'none';
    btnFetch.disabled = false;
    btnFetch.innerHTML = '<span class="icon">⚠️</span> Tentar Novamente';
    alert("Infelizmente não conseguimos carregar um novo cãozinho. Verifique a conexão.");
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
      // Capitalize
      option.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
      select.appendChild(option);
    });
  } catch(e) {
    console.error("Erro ao listar raças", e);
  }
}

async function compartilhar() {
  const img = document.getElementById('imgCachorro');
  if (!img.src) return;

  // Integração 2: Web Share API (Comum em Mobile/PWA)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Olha que cachorro fofo!',
        text: 'Encontrei este cãozinho adorável no DogFinder App.',
        url: img.src
      });
      console.log('Compartilhado com sucesso!');
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  } else {
    // Fallback simples
    navigator.clipboard.writeText(img.src);
    alert('Link da imagem copiado para a área de transferência!');
  }
}

listarRacas();
// Inicia com um cãozinho automaticamente ao abrir a página
CachorroAleatorio();