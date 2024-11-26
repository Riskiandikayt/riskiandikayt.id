const API_URL = 'https://h2h.okeconnect.com/api/v1/products';
const API_KEY = '928863317125892041706015OKCT34A04DB8F8510C3C6BE37132D22C589E';

async function fetchPriceList(category, containerId) {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            }
        });
        const data = await response.json();
        displayPriceList(data, category, containerId);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById(containerId).innerHTML = 'Gagal mengambil data harga.';
    }
}

function displayPriceList(data, category, containerId) {
    const priceListContainer = document.getElementById(containerId);
    if (data && data.products) {
        let priceHTML = '<ul>';
        data.products.forEach(product => {
            if (product.category.toLowerCase() === category.toLowerCase()) {
                priceHTML += `<li><strong>${product.name}</strong>: Rp ${product.price}</li>`;
            }
        });
        priceHTML += '</ul>';
        priceListContainer.innerHTML = priceHTML;
    } else {
        priceListContainer.innerHTML = 'Tidak ada produk yang tersedia untuk kategori ini.';
    }
}
