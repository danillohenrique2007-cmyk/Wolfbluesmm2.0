// Alternar seções do site
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    menuItems.forEach(item => {
        if (item.getAttribute('data-target') === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Abrir/Fechar dropdown de plataformas
function togglePlatformDropdown() {
    const dropdown = document.getElementById('platform-dropdown');
    dropdown.classList.toggle('open');
    document.getElementById('custom-dropdown').classList.remove('open');
}

// Selecionar plataforma
function selectPlatformOption(element, platformName, iconClass, colorClass) {
    document.getElementById('selected-platform-text').innerHTML = `<i class="${iconClass} icon-app-pulse ${colorClass}"></i> ${platformName}`;
    
    document.querySelectorAll('#platform-dropdown-options .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    document.getElementById('sum-platform').innerText = platformName;
    document.getElementById('platform-dropdown').classList.remove('open');
}

// Abrir/Fechar dropdown de serviços
function toggleServiceDropdown() {
    const dropdown = document.getElementById('custom-dropdown');
    dropdown.classList.toggle('open');
    document.getElementById('platform-dropdown').classList.remove('open');
}

// Selecionar serviço
function selectServiceOption(element) {
    document.getElementById('selected-service-text').innerHTML = element.innerHTML;

    document.querySelectorAll('#dropdown-options .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    const price = element.getAttribute('data-price');
    document.getElementById('selected-service-price').value = price;

    document.getElementById('custom-dropdown').classList.remove('open');
    calculatePrice();
}

// Calcular preço final
function calculatePrice() {
    const quantityInput = document.getElementById('order-quantity');
    const selectedPrice = parseFloat(document.getElementById('selected-service-price').value) || 0.035;
    const qty = parseInt(quantityInput.value) || 0;

    const total = (qty * selectedPrice).toFixed(2).replace('.', ',');

    document.getElementById('sum-qty').innerText = qty.toLocaleString('pt-BR');
    document.getElementById('sum-total').innerText = 'R$ ' + total;
}

// Botões da tabela de serviços para compra rápida
function quickBuy(platformName) {
    switchSection('novo-pedido');
}

// Pesquisa em tempo real na tabela de serviços
function filterServicesTable() {
    const input = document.getElementById('service-search-input').value.toLowerCase();
    const rows = document.querySelectorAll('#pro-services-table tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

// Filtro por botões de plataforma na tabela de serviços
function filterByPlatform(platform, btnElement) {
    document.querySelectorAll('.filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    const rows = document.querySelectorAll('#pro-services-table tbody tr');
    rows.forEach(row => {
        if (platform === 'all' || row.getAttribute('data-platform') === platform) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Fechar dropdowns ao clicar fora
window.addEventListener('click', function(e) {
    const pDropdown = document.getElementById('platform-dropdown');
    const sDropdown = document.getElementById('custom-dropdown');
    
    if (pDropdown && !pDropdown.contains(e.target)) pDropdown.classList.remove('open');
    if (sDropdown && !sDropdown.contains(e.target)) sDropdown.classList.remove('open');
});

// Modal Checkout
function checkoutModal() {
    const link = document.getElementById('order-link').value;
    const email = document.getElementById('order-email').value;

    if (!link || !email) {
        alert('Por favor, preencha o link do perfil e seu e-mail!');
        return;
    }

    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function copyPix() {
    const pixInput = document.getElementById('pix-code');
    pixInput.select();
    navigator.clipboard.writeText(pixInput.value);
    alert('Chave PIX copiada com sucesso!');
}

window.onload = function() {
    calculatePrice();
};
