let products = [];
const productsList = document.querySelector('[data-products-list]');
const loadingCard = document.querySelector('[data-loading]');

function showLoading() {
    loadingCard.style.display = 'flex';
}

function noneLoading() {
    loadingCard.style.display = 'none';
}

function createCardElement(product) {
    const template = document.querySelector('[data-card-template]');
    const cardClone = document.importNode(template.content, true);

    const cardTitle = cardClone.querySelector('[data-card-title]');
    const cardImage = cardClone.querySelector('[data-card-img]');

  

    const cardCategory = cardClone.querySelector('[data-card-category]');

    const cardPrice = cardClone.querySelector('[data-card-price]');

    cardTitle.textContent = product.title;
    cardImage.src = product.image;

     cardImage.addEventListener('error', function handleError() {
       cardImage.src = 'https://placehold.co/600x400'; 
     });

     const cardDescription = cardClone.querySelector('[data-card-description]');
     const cardReadMore = cardClone.querySelector('[data-card-read]');

     cardDescription.textContent = product.description;

     const maxDescriptionLength = 30;
     if (product.description.length > maxDescriptionLength) {
        cardDescription.innerText = `${product.description.slice(0, maxDescriptionLength)}...`;
        cardDescription.style.cursor = 'pointer';
 
         let DescriptionVisible = false;
         cardDescription.addEventListener('click', () => {
             if (DescriptionVisible) {
                cardDescription.innerText = `${product.description.slice(0, maxDescriptionLength)}...${cardReadMore}`;

             } else {
                cardDescription.innerText = product.description;
                
             }
 
             DescriptionVisible = !DescriptionVisible;
         });
     } else {
        cardDescription.innerText = product.description;
        cardReadMore.style.display = 'none'; 
     }

     cardCategory.textContent = product.category.name;
     cardPrice.textContent = product.price;

    return cardClone;
}

function renderCards(container, productsCards) {
    container.innerText = '';
    const fragment = document.createDocumentFragment();

    productsCards.forEach((product) => {
        const cardElement = createCardElement(product);
        fragment.appendChild(cardElement);
    });

    container.appendChild(fragment);
}

async function fetchCards() {
    try {
        const apiUrl = 'https://api.escuelajs.co/api/v1/products';
        showLoading();

        const option = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        };

        const response = await fetch(apiUrl, option);
        products = await response.json();
        renderCards(productsList, products);
        
    } catch (err) {
        console.error(err, 'Get error:');
    } finally {
        noneLoading();
    }
}

document.addEventListener('DOMContentLoaded', fetchCards);

function init() {

    renderCards(productsList, products);
}

init();