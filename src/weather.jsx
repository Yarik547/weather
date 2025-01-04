import "bootstrap-icons/font/bootstrap-icons.css";
import "./weather.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
	const [city, setCity] = useState([]);
	useEffect(() => {
		axios
			.get(
				"http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=cd764a982a81e6f46e311304d4072d5b"
			)
			.then((response) => {
				console.log(response.data.city);
				// console.log(response.status);
				// console.log(response.statusText);
				// console.log(response.headers);
				// console.log(response.config);
			});
	});

	return (
		<>
			<div className="board">
				<span className="search">
					<input
						type="text"
						id="place"
						placeholder="Enter your city!"
					/>
					<button id="btn-search">
						<i className="bi bi-search"></i>
					</button>
				</span>
				<p>Today</p>
				<img src="" alt="" />
				<h1 id="temp">11C</h1>
				<h2 id="city">Lviv</h2>

				<div className="box">
					<span className="info wind">
						<p>1</p>
						<i className="bi bi-wind"></i>
					</span>

					<span className="info moisture">
						<p>1</p>
						<i className="bi bi-moisture"></i>
					</span>
				</div>
			</div>
		</>
	);
}

export default Weather;
