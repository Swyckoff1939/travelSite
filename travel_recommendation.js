function search() {
    const keyword = document.getElementById('search-bar').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            let results = [];
            if (keyword === 'country' || keyword === 'countries') {
                data.countries.forEach(country => {
                    results.push({
                        type: 'Country',
                        name: country.name,
                        imageUrl: '' 
                    });
                    country.cities.forEach(city => {
                        results.push({
                            type: 'City',
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    });
                });
            } else if (keyword === 'beach' || keyword === 'beaches') {
                data.beaches.forEach(beach => {
                    results.push({
                        type: 'Beach',
                        name: beach.name,
                        description: beach.description,
                        imageUrl: beach.imageUrl
                    });
                });
            } else if (keyword === 'temple' || keyword === 'temples') {
                data.temples.forEach(temple => {
                    results.push({
                        type: 'Temple',
                        name: temple.name,
                        description: temple.description,
                        imageUrl: temple.imageUrl
                    });
                });
            } else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Country',
                            name: country.name,
                            imageUrl: '' // 国全体の画像URLがないため空文字
                        });
                    }
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(keyword)) {
                            results.push({
                                type: 'City',
                                name: city.name,
                                description: city.description,
                                imageUrl: city.imageUrl
                            });
                        }
                    });
                });
  
                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Temple',
                            name: temple.name,
                            description: temple.description,
                            imageUrl: temple.imageUrl
                        });
                    }
                });
                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(keyword)) {
                        results.push({
                            type: 'Beach',
                            name: beach.name,
                            description: beach.description,
                            imageUrl: beach.imageUrl
                        });
                    }
                });
            }

            console.log(results);

            displayResults(results);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

function displayResults(results) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // 前回の結果をクリア

    if (results.length === 0) {
        recommendationsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const resultTitle = document.createElement('h2');
            resultTitle.textContent = `${result.type}: ${result.name}`;
            resultItem.appendChild(resultTitle);

            if (result.description) {
                const resultDescription = document.createElement('p');
                resultDescription.textContent = result.description;
                resultItem.appendChild(resultDescription);
            }

            if (result.imageUrl) {
                const resultImage = document.createElement('img');
                resultImage.src = result.imageUrl;
                resultImage.alt = result.name;
                resultImage.className = 'result-image';
                resultItem.appendChild(resultImage);
            }

            recommendationsDiv.appendChild(resultItem);
        });
    }
}
function clearResults() {
    document.getElementById('search-bar').value = '';
    document.getElementById('recommendations').innerHTML = '';
}
