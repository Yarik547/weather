import "bootstrap-icons/font/bootstrap-icons.css";
import "./weather.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
	const [locationData, setLocationData] = useState(null);
	const [weatherData, setWeatherData] = useState(null);
	const [city, setCity] = useState("lviv");
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!city) return;

		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=cd764a982a81e6f46e311304d4072d5b`
			)
			.then((res) => {
				if (res.data.length > 0) {
					setLocationData(res.data[0]);
				} else {
					console.log("Error: City not found");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [city]);

	useEffect(() => {
		if (!locationData) return;

		const { lat, lon } = locationData;

		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cd764a982a81e6f46e311304d4072d5b&units=metric`
			)
			.then((res) => {
				setWeatherData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [locationData]);

	const handleSearch = () => {
		if (search.trim()) {
			setCity(search.trim());
		}
	};

	return (
		<>
			<div className="board">
				<span className="search">
					<input
						type="text"
						id="place"
						placeholder="Enter your city!"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button id="btn-search" onClick={handleSearch}>
						<i className="bi bi-search"></i>
					</button>
				</span>

				<p>Today</p>
				<img src="" alt="" />
				<h1 id="temp">
					{weatherData ? `${weatherData.main.temp}°C` : "Loading..."}
				</h1>
				<h2 id="city">{locationData ? locationData.name : ""}</h2>

				<div className="box">
					<span className="info wind">
						<p>
							{weatherData
								? `${weatherData.wind.speed} m/s`
								: "-"}
						</p>
						<i className="bi bi-wind"></i>
					</span>

					<span className="info moisture">
						<p>
							{weatherData
								? `${weatherData.main.humidity}%`
								: "-"}
						</p>
						<i className="bi bi-moisture"></i>
					</span>
				</div>
			</div>
		</>
	);
}

export default Weather;
