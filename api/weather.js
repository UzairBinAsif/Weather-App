export default async function handler(req, res) {
    const city = req.query.city;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);

    const data = await response.json();
    res.status(200).json(data);
}
