// Function to calculate probabilities based on past weather
function predictWeather(dayBeforeYesterday, yesterday, today) {
    let rainCount = 0;
    let sunshineCount = 0;
    let snowCount = 0;

    // Analyze past weather to determine probabilities
    if (dayBeforeYesterday.toLowerCase() === 'rainy') {
        rainCount++;
    } else if (dayBeforeYesterday.toLowerCase() === 'sunny') {
        sunshineCount++;
    } else if (dayBeforeYesterday.toLowerCase() === 'snowy') {
        snowCount++;
    }

    if (yesterday.toLowerCase() === 'rainy') {
        rainCount++;
    } else if (yesterday.toLowerCase() === 'sunny') {
        sunshineCount++;
    } else if (yesterday.toLowerCase() === 'snowy') {
        snowCount++;
    }

    if (today.toLowerCase() === 'rainy') {
        rainCount++;
    } else if (today.toLowerCase() === 'sunny') {
        sunshineCount++;
    } else if (today.toLowerCase() === 'snowy') {
        snowCount++;
    }

    const totalDays = 3;
    const rainProbability = (rainCount / totalDays) * 100;
    const sunshineProbability = (sunshineCount / totalDays) * 100;
    const snowProbability = (snowCount / totalDays) * 100;

    // Return probabilities
    return {
        rain: rainProbability.toFixed(2),
        sunshine: sunshineProbability.toFixed(2),
        snow: snowProbability.toFixed(2)
    };
}

// Function to predict tomorrow's weather based on probabilities
function predictTomorrowWeather(probabilities) {
    let tomorrowWeather;

    // Use probabilities to predict tomorrow's weather
    if (probabilities.rain > 75) {
        tomorrowWeather = 'rainy';
    } else if (probabilities.rain >= 50 && probabilities.rain <= 75) {
        tomorrowWeather = 'lightrain';
    } else if (probabilities.rain >= 25 && probabilities.rain < 50) {
        tomorrowWeather = 'cloudy';
    } else {
        tomorrowWeather = 'sunshine';
    }

    // Redirect to weather website based on predicted weather
    redirectToWeatherWebsite(tomorrowWeather);
}

// Function to redirect to different websites based on weather
function redirectToWeatherWebsite(tomorrowWeather) {
    switch (tomorrowWeather) {
        case 'rainy':
            window.location.href = 'https://rainy.com';
            break;
        case 'lightrain':
            window.location.href = 'https://lightrain.com';
            break;
        case 'cloudy':
            window.location.href = 'https://cloudy.com';
            break;
        case 'sunshine':
            window.location.href = 'https://sunshine.com';
            break;
        default:
            break;
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get user inputs
    const dayBeforeYesterdayInput = document.getElementById('dayBeforeYesterdayInput');
    const yesterdayInput = document.getElementById('yesterdayInput');
    const todayInput = document.getElementById('todayInput');

    const dayBeforeYesterday = dayBeforeYesterdayInput.value.trim();
    const yesterday = yesterdayInput.value.trim();
    const today = todayInput.value.trim();

    // Calculate probabilities
    const probabilities = predictWeather(dayBeforeYesterday, yesterday, today);

    // Predict tomorrow's weather and redirect to corresponding website
    predictTomorrowWeather(probabilities);
}

// Add event listener for form submission
const weatherForm = document.getElementById('weatherForm');
weatherForm.addEventListener('submit', handleFormSubmit);
