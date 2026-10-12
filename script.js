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