// Função para alternar entre as seções do site de forma dinâmica
function switchSection(sectionId) {
    // Remove a classe 'active' de todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Adiciona a classe 'active' na seção escolhida
    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Atualiza o menu lateral ativo
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    menuItems.forEach(item => {
        if (item.getAttribute('data-target') === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Rola para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atalho ao clicar em uma plataforma na página inicial
function selectPlatformAndOrder(platformName) {
    const platformSelect = document.getElementById('order-platform');
    for (let i = 0; i < platformSelect.options.length; i++) {
        if (platformSelect.options[i].text.toLowerCase().includes(platformName.toLowerCase())) {
            platformSelect.selectedIndex = i;
            break;
        }
    }
    switchSection('novo-pedido');
    calculatePrice();
}

// Atualiza o cálculo do preço em tempo real
function calculatePrice() {
    const quantityInput = document.getElementById('order-quantity');
    const serviceSelect = document.getElementById('order-service');
    const platformSelect = document.getElementById('order-platform');

    const qty = parseInt(quantityInput.value) || 0;
    
    // Preço base fictício por unidade (R$ 0,015 por seguidor em média)
    const pricePerUnit = 0.015; 
    const total = (qty * pricePerUnit).toFixed(2).replace('.', ',');

    // Atualiza o resumo
    document.getElementById('sum-qty').innerText = qty.toLocaleString('pt-BR');
    document.getElementById('sum-total').innerText = 'R$ ' + total;
    document.getElementById('sum-platform').innerText = platformSelect.options[platformSelect.selectedIndex].text;
}

// Botão rápido da tabela de serviços
function quickBuy(serviceId) {
    switchSection('novo-pedido');
    calculatePrice();
}

// Abrir Modal de Checkout PIX
function checkoutModal() {
    const link = document.getElementById('order-link').value;
    const email = document.getElementById('order-email').value;

    if (!link || !email) {
        alert('Por favor, preencha o link do perfil e o seu e-mail para continuar.');
        switchSection('novo-pedido');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    modal.classList.add('active');
}

// Fechar Modal
function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('active');
}

// Copiar Código Pix
function copyPix() {
    const pixInput = document.getElementById('pix-code');
    pixInput.select();
    pixInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(pixInput.value);
    alert('Chave PIX copiada com sucesso!');
}

// Inicializa cálculos ao carregar
window.onload = function() {
    calculatePrice();
};

// Selecionar serviço nos cards visuais
function selectCustomService(element) {
    if (element.classList.contains('disabled')) return;

    // Remove destaque dos outros cards
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));

    // Destaca o card clicado
    element.classList.add('active');

    // Atualiza o valor oculto e calcula o preço final
    const price = element.getAttribute('data-price');
    document.getElementById('selected-service-price').value = price;
    
    // Atualiza o cálculo
    calculatePrice();
}

// Atualização da função de calcular preço
function calculatePrice() {
    const quantityInput = document.getElementById('order-quantity');
    const selectedPrice = parseFloat(document.getElementById('selected-service-price').value) || 0.015;
    const qty = parseInt(quantityInput.value) || 0;

    const total = (qty * selectedPrice).toFixed(2).replace('.', ',');

    document.getElementById('sum-qty').innerText = qty.toLocaleString('pt-BR');
    document.getElementById('sum-total').innerText = 'R$ ' + total;
}

// Abrir e fechar o menu dropdown customizado
function toggleDropdown() {
    const dropdown = document.getElementById('custom-dropdown');
    dropdown.classList.toggle('open');
}

// Selecionar um item do dropdown
function selectDropdownOption(element, platform, text) {
    // Atualiza o texto exibido na caixa principal
    document.getElementById('selected-service-text').innerHTML = element.innerHTML;

    // Atualiza classes ativas
    document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    // Atualiza o preço correspondente
    const price = element.getAttribute('data-price');
    document.getElementById('selected-service-price').value = price;

    // Fecha o dropdown
    document.getElementById('custom-dropdown').classList.remove('open');

    // Recalcula o valor total
    calculatePrice();
}

// Fechar o dropdown se clicar fora dele na tela
window.addEventListener('click', function(e) {
    const dropdown = document.getElementById('custom-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Abrir e fechar o menu dropdown de plataformas
function togglePlatformDropdown() {
    const dropdown = document.getElementById('platform-dropdown');
    dropdown.classList.toggle('open');
}

// Selecionar uma plataforma na lista customizada
function selectPlatformOption(element, platformName, iconClass, colorClass) {
    // Monta o HTML com o ícone colorido e pulse
    const fullIconHTML = `<i class="${iconClass} icon-app-pulse ${colorClass}"></i> ${platformName}`;
    document.getElementById('selected-platform-text').innerHTML = fullIconHTML;

    // Atualiza classes ativas
    document.querySelectorAll('#platform-dropdown-options .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    // Fecha o dropdown de plataformas
    document.getElementById('platform-dropdown').classList.remove('open');

    // Sincroniza com a função global do site se necessário
    selectPlatformAndOrder(platformName);
}

// Fechar o dropdown de plataformas ao clicar fora dele na tela
window.addEventListener('click', function(e) {
    const platformDropdown = document.getElementById('platform-dropdown');
    if (platformDropdown && !platformDropdown.contains(e.target)) {
        platformDropdown.classList.remove('open');
    }
});
