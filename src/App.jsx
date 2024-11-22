import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./routes/home";
import Quiz from "./routes/quiz";
import Result from "./routes/result";
import { Toaster } from "react-hot-toast";

function App() {
	const loadingBarRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		loadingBarRef.current.complete();
	}, [location]);

	const handleStartLoading = () => {
		loadingBarRef.current.continuousStart();
	};

	return (
		<div>
			{/* Loading Bar */}
			<LoadingBar color="#1e40af" ref={loadingBarRef} height={4} />

			{/* Toaster Provider */}
			<Toaster position="bottom-center" containerClassName="font-bold text-[15px]" />

			{/* Router */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/result" element={<Result />} />
			</Routes>

			{/* Copyright */}
			<div className="text-center mt-5">
				<p className="text-center text-sm inline bg-gray-300 text-gray-800 rounded-md px-2 py-0.5">این پروژه جهت ارائه درسی توسط امیرحسین مسعودی ساخته شده است</p>
			</div>
		</div>
	);
}

export default function WrappedApp() {
	return (
		<Router>
			<App />
		</Router>
	);
}
