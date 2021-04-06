const API_KEY = 'vbfnj3usq2s5w448yfmjs2yv';
      const ETSY_URL = `https://openapi.etsy.com/v2/shops/TheBlackFactory/listings/active.js?callback=getData&includes=MainImage&api_key=${API_KEY}`;

      

      //https://openapi.etsy.com/v2/shops/TheBlackFactory/listings/active?includes=MainImage&api_key=${API_KEY}
      // Elements
      const template = document.querySelector('template');
      const main = document.querySelector('main');

      // 2. Because is requesting a data from another server, which is in our responsability, we don't know how long it would take, for that reson we need to WAIT.
      // We are prefixing the function with the keyword async to tell the browser that this operation is asynchronus
      const fetchData = async () => {
        // Fetching data from etsy and waiting for the result
        const response = await fetch(`${ETSY_URL}`);
        // Because the result is in binary we need to serialise it as JSON
        const data = await response.json();

        console.log(data.results);

        // Once is serialased we call a function to handle the rendering
        renderEtsyItems(data.results);
      };

      // 3 We are handling an array of Etsy items, so we need to iterate in the array using the array forEach method
      // For each item in the array we are calling the renderItem function
      function renderEtsyItems(results) {
        results.forEach(renderItem);
      }

      // 4 We set a HTML template (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) to help us to set a framework to inject the content
      //
      function renderItem(result) {
        // cloning the template for every instance of Etsyresult (remember that this function is been called for every result on the results array)
        clone = template.content.cloneNode(true);

        // Title
        const title = clone.querySelector('.title');
        title.innerText = result.title;

        // description
         // const descriptionElement = clone.querySelector('.description');
        // descriptionElement.innerText = result.description;

        // Link
        const etsyLinkElement = clone.querySelector('.etsy-link');
        etsyLinkElement.setAttribute('href', result.url);

        // Price
        const priceElement = clone.querySelector('.price');
        priceElement.innerText = `$${result.price}`;

        // Tags
        // const tagsElement = clone.querySelector('.tags');
        // tagsElement.innerText = result.tags.join(', ');

        // Image
        const imageElement = clone.querySelector('.main-image');
        imageElement.setAttribute('src', result.MainImage.url_570xN);

        main.appendChild(clone);
      }

      // 1. When all HTML is loaded in the page it will trigger the function fetchData
      document.addEventListener('DOMContentLoaded', fetchData);

 