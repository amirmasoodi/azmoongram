import { useState } from "react";
import Logo from "../components/logo";
import { FiUserCheck } from "react-icons/fi";
import { redirect, useNavigate } from "react-router-dom";

export default function Home() {
	// Name
	const [name, setName] = useState("");

	// Navigate
	const navigate = useNavigate();

	// Submit Function
	function startQuiz(e) {
		// Prevent Sending Form
		e.preventDefault();

		// Save Name To Local Storage
		localStorage.setItem("name", name);

		// Navigate To Quiz Page
		navigate("/quiz");
	}

	return (
		<div className="my-28 flex flex-col items-center bg-gray-200 pt-6 sm:justify-center sm:pt-0">
			<Logo />
			<div className="mt-5 w-10/12 rounded-2xl bg-white p-5 md:w-6/12 lg:w-4/12 xl:w-3/12">
				<form onSubmit={startQuiz}>
					{/* Name */}
					<div className="flex flex-col">
						{/* Name Label */}
						<label htmlFor="name" className="tracking-tight text-sm text-gray-700">
							نام و نام خانوادگی
						</label>

						{/* Form Group */}
						<div className="relative">
							{/* Input Icon */}
							<FiUserCheck className="absolute top-[18px] right-[10px] text-xl text-gray-500" />

							{/* Name Input */}
							<input className="w-full text-[15px] text-gray-700 border-gray-300 rounded-md mt-1.5 py-2.5 pr-9" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required />
						</div>
					</div>

					{/* Submit */}
					<button className="w-full bg-gray-800 hover:bg-gray-900 text-white text-center text-[15px] rounded-lg font-bold mt-2.5 py-2.5">شروع آزمون</button>
				</form>
			</div>
		</div>
	);
}
