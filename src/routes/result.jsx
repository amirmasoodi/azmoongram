import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Result() {
	// Retrieve user answers from localStorage
	const userAnswers = JSON.parse(localStorage.getItem("answers")) || {};

	// Define correct answers
	const correctAnswers = {
		1: "1",
		2: "2",
		3: "2",
		4: "1",
		5: "4"
	};

	// Number of correct answers state
	const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

	// Questions and options
	const questions = {
		1: { text: "سوال 1", options: ["4", "3", "2", "1", "0"] },
		2: { text: "سوال 2", options: ["4", "3", "2", "1", "0"] },
		3: { text: "سوال 3", options: ["4", "3", "2", "1", "0"] },
		4: { text: "سوال 4", options: ["4", "3", "2", "1", "0"] },
		5: { text: "سوال 5", options: ["4", "3", "2", "1", "0"] }
	};

	useEffect(() => {
		// Calculate the number of correct answers
		let correctCount = 0;
		for (const question in correctAnswers) {
			if (userAnswers[question] === correctAnswers[question]) {
				correctCount++;
			}
		}
		setNumberOfCorrectAnswers(correctCount);
	}, [userAnswers]);

	// Navigation
	const navigate = useNavigate();
	
	// Logout Function
	function logout() {
		// Clear Local Storage
		localStorage.clear();

		// Show Success
		toast.success("با موفقیت خارج شدید");

		// Navigate To Home Page
		navigate("/");
	}

	return (
		// Container
		<div className="container-small">
			{/* Card */}
			<div className="bg-white rounded-xl p-5 mt-14">
				<img className="w-1/3 mx-auto" src={numberOfCorrectAnswers > 2 ? "/public/img/success.svg" : "/public/img/failed.svg"} alt="result" />
				<h2 className="text-center text-2xl font-bold my-3">نتیجه آزمون : {numberOfCorrectAnswers > 2 ? <span className="font-black text-emerald-700">قبول شدید</span> : <span className="font-black text-red-600">رد شدید</span>}</h2>
				<p className="text-center text-lg mb-5">تعداد پاسخ‌های صحیح: {numberOfCorrectAnswers}</p>
				<div className="bg-gray-100 rounded-lg p-4">
					{Object.keys(questions).map((questionId) => (
						<div key={questionId} className="flex justify-between items-center mb-5">
							<div className="">
								<h3 className="text-lg font-bold mb-2">{questions[questionId].text}</h3>
								<p className="text-sm font-semibold mb-2">پاسخ صحیح: {correctAnswers[questionId]}</p>
							</div>
							<fieldset className="flex justify-center items-center space-x-reverse space-x-5">
								{questions[questionId].options.map((option) => {
									const isCorrect = correctAnswers[questionId] === option;
									const isSelected = userAnswers[questionId] === option;
									return (
										<div key={option} className={`flex flex-col text-center ${isSelected ? (isCorrect ? "text-green-600" : "text-red-600") : "text-gray-800"}`}>
											<input className={`w-7 h-7 cursor-pointer custom-radio ${isSelected ? (isCorrect ? "radio-correct" : "radio-incorrect") : ""}`} type="radio" name={`answer${questionId}`} value={option} checked={isSelected} readOnly />
											<strong className="pt-1">{option === "0" ? "سفید" : option}</strong>
										</div>
									);
								})}
							</fieldset>
						</div>
					))}
				</div>

				{/* Logout */}
				<div className="text-center mt-5">
					<button className="bg-red-600 text-white text-sm font-bold rounded-md px-2.5 py-1.5" onClick={logout}>
						خروج از سیستم
					</button>
				</div>
			</div>
		</div>
	);
}
