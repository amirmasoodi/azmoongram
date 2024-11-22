import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Quiz() {
	// User Name
	const name = localStorage.getItem("name");

	// Navigate
	const navigate = useNavigate();

	// Questions
	const questions = {
		1: {
			image: "/public/img/q1.png"
		},
		2: {
			image: "/public/img/q2.png"
		},
		3: {
			image: "/public/img/q3.png"
		},
		4: {
			image: "/public/img/q4.png"
		},
		5: {
			image: "/public/img/q5.png"
		}
	};

	// Answers
	const [answers, setAnswers] = useState({
		1: null,
		2: null,
		3: null,
		4: null,
		5: null
	});

	// Current Question
	const [currentQuestion, setCurrentQuestion] = useState(1);

	// Handle Change Answer Value
	function handleAnswerChange(e) {
		setAnswers({ ...answers, [currentQuestion]: e.target.value });
	}

	// Handle Next Question
	function handleNextQuestion() {
		if (!answers[currentQuestion]) return toast.error("یک گزینه انتخاب کنید");
		if (currentQuestion < 5) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			handleSendResult();
		}
	}

	// Handle Previous Question
	function handlePreviousQuestion() {
		if (currentQuestion > 1) {
			setCurrentQuestion(currentQuestion - 1);
		}
	}

	// Handle Send Result
	function handleSendResult() {
		// Save Answers To Local Storage
		localStorage.setItem("answers", JSON.stringify(answers));

		// Show Success Message
		toast.success("آزمون با موفقیت پایان یافت");

		// Navigate To Result Page
		navigate("/result");
	}

	// Logout Function
	function logout() {
		// Clear Local Storage
		localStorage.clear();

		// Show Success
		toast.success("با موفقیت خارج شدید");

		// Navigate To Home Page
		navigate("/");
	}

	// Render View
	return (
		// Container
		<div className="container">
			{/* Card */}
			<div className="bg-white rounded-xl mt-14 p-5">
				{/* Header */}
				<header className="flex justify-between items-center">
					{/* Name & Welcome Message */}
					<div>
						<h2 className="font-black text-gray-800">{name} عزیز، خوش آمدید</h2>
						<h3 className="text-sm text-gray-700 mt-1.5">آزمون آنلاین زیست شناسی پایه دوازدهم</h3>
					</div>

					{/* Logout */}
					<button className="bg-red-600 text-white text-sm font-bold rounded-md px-2.5 py-1.5" onClick={logout}>
						خروج از سیستم
					</button>
				</header>

				{/* Question Image */}
				<img className="mt-5" src={questions[currentQuestion].image} alt="question image" />

				{/* Answer Fields & Navigation Buttons */}
				<div className="flex justify-center items-center mt-5">
					{/* Answer */}
					<fieldset className="flex justify-center items-center space-x-reverse space-x-5" onChange={handleAnswerChange}>
						{/* Answer 4 */}
						<div className="flex flex-col text-center">
							<input className="w-7 h-7 cursor-pointer" type="radio" name={`answer${currentQuestion}`} value="4" checked={answers[currentQuestion] === "4"} onChange={handleAnswerChange} />
							<strong className="text-gray-800 pt-1">4</strong>
						</div>

						{/* Answer 3 */}
						<div className="flex flex-col text-center">
							<input className="w-7 h-7 cursor-pointer" type="radio" name={`answer${currentQuestion}`} value="3" checked={answers[currentQuestion] === "3"} onChange={handleAnswerChange} />
							<strong className="text-gray-800 pt-1">3</strong>
						</div>

						{/* Answer 2 */}
						<div className="flex flex-col text-center">
							<input className="w-7 h-7 cursor-pointer" type="radio" name={`answer${currentQuestion}`} value="2" checked={answers[currentQuestion] === "2"} onChange={handleAnswerChange} />
							<strong className="text-gray-800 pt-1">2</strong>
						</div>

						{/* Answer 1 */}
						<div className="flex flex-col text-center">
							<input className="w-7 h-7 cursor-pointer" type="radio" name={`answer${currentQuestion}`} value="1" checked={answers[currentQuestion] === "1"} onChange={handleAnswerChange} />
							<strong className="text-gray-800 pt-1">1</strong>
						</div>

						{/* Answer 0 */}
						<div className="flex flex-col text-center">
							<input className="w-7 h-7 cursor-pointer" type="radio" name={`answer${currentQuestion}`} value="0" checked={answers[currentQuestion] === "0"} onChange={handleAnswerChange} />
							<strong className="text-gray-800 text-sm pt-1">سفید</strong>
						</div>
					</fieldset>

					{/* Next Question Button */}
					<button className={`font-bold rounded-md px-3 py-2 ${currentQuestion === 5 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-700 hover:bg-blue-800"} text-white mr-10`} onClick={handleNextQuestion}>
						{currentQuestion === 5 ? "پایان آزمون" : "سوال بعدی"}
					</button>

					{/* Previous Question Button */}
					{currentQuestion > 1 && (
						<button className="bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md px-3 py-2 mr-5" onClick={handlePreviousQuestion}>
							سوال قبلی
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
