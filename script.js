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

// Abrir/Fechar Menu "Mais" no Mobile
function toggleMoreMenu(event) {
    if (event) event.preventDefault();
    const popup = document.getElementById('mobile-more-popup');
    popup.classList.toggle('active');
}

// Dropdowns
function togglePlatformDropdown() {
    document.getElementById('platform-dropdown').classList.toggle('open');
    document.getElementById('custom-dropdown').classList.remove('open');
}

function selectPlatformOption(element, platformName, iconClass, colorClass) {
    document.getElementById('selected-platform-text').innerHTML = `<i class="${iconClass} icon-app-pulse ${colorClass}"></i> ${platformName}`;
    document.querySelectorAll('#platform-dropdown-options .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('sum-platform').innerText = platformName;
    document.getElementById('platform-dropdown').classList.remove('open');
    filterServicesByPlatform(platformName.toLowerCase());
}

function filterServicesByPlatform(platformKey) {
    const serviceOptions = document.querySelectorAll('#dropdown-options .dropdown-option');
    let firstMatch = null;

    serviceOptions.forEach(option => {
        const text = option.innerText.toLowerCase();
        if (text.includes(platformKey)) {
            option.style.display = 'flex';
            if (!firstMatch) firstMatch = option;
        } else {
            option.style.display = 'none';
        }
    });

    if (firstMatch) selectServiceOption(firstMatch);
}

function toggleServiceDropdown() {
    document.getElementById('custom-dropdown').classList.toggle('open');
    document.getElementById('platform-dropdown').classList.remove('open');
}

function selectServiceOption(element) {
    document.getElementById('selected-service-text').innerHTML = element.innerHTML;
    document.querySelectorAll('#dropdown-options .dropdown-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('selected-service-price').value = element.getAttribute('data-price');
    document.getElementById('custom-dropdown').classList.remove('open');
    calculatePrice();
}

function calculatePrice() {
    const quantityInput = document.getElementById('order-quantity');
    const selectedPrice = parseFloat(document.getElementById('selected-service-price').value) || 0.035;
    const qty = parseInt(quantityInput.value) || 0;
    const total = (qty * selectedPrice).toFixed(2).replace('.', ',');

    document.getElementById('sum-qty').innerText = qty.toLocaleString('pt-BR');
    document.getElementById('sum-total').innerText = 'R$ ' + total;
}

function quickBuy(platformName) {
    switchSection('novo-pedido');
    const targetOpt = document.querySelector(`#platform-dropdown-options .dropdown-option[data-platform="${platformName.toLowerCase()}"]`);
    if (targetOpt) targetOpt.click();
}

function filterServicesTable() {
    const input = document.getElementById('service-search-input').value.toLowerCase();
    const rows = document.querySelectorAll('#pro-services-table tbody tr');
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? '' : 'none';
    });
}

function filterByPlatform(platform, btnElement) {
    document.querySelectorAll('.filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    const rows = document.querySelectorAll('#pro-services-table tbody tr');
    rows.forEach(row => {
        row.style.display = (platform === 'all' || row.getAttribute('data-platform') === platform) ? '' : 'none';
    });
}

function checkoutModal() {
    const link = document.getElementById('order-link').value;
    const email = document.getElementById('order-email').value;
    if (!link || !email) {
        alert('Por favor, preencha o link e seu e-mail!');
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
    alert('Chave PIX copiada!');
}

window.onload = function() {
    filterServicesByPlatform('instagram');
    calculatePrice();
};
