import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
import { collection, getDocs, query } from "firebase/firestore";

import { database } from "../../firebase/FirebaseConfig";

function SearchWithBengali({ getSearchedData, isSearched }) {
	async function getBanglaData(text) {
		const url = `
                    https://inputtools.google.com/request?text=${text}&itc=bn-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();

			const point = json[1][0][1];

			return point;
		} catch (error) {
			console.error(error.message);
		}
	}
	const [inputValue, setInputValue] = useState("");
	const [suggestionBoxShown, setSuggestionBoxShown] = useState(false);
	const [suggestedWords, setSuggestedWords] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [splitWordsArray, setSplitWordsArray] = useState([]);

	const inputRef = useRef();
	const suggestionRef = useRef();

	function inputChangeHandler(e) {
		setInputValue(e.target.value);
		setSuggestionBoxShown(true);

		if (e.target.value == "") {
			isSearched(false);
		} else {
			searchItem(e.target.value);
			searchSubmit();
		}
	}

	function searchSubmit(e) {
		e && e.preventDefault();
		isSearched(true);
	}

	async function searchItem(searchVal) {
		// GETTING DATA FORM FIREBASE
		const q = query(collection(database, "companies/sk-hardwares/products"));
		const querySnapshot = await getDocs(q);
		let data = [];
		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		// FILTERING DATA BASED OF THE SEARCH
		let sharched = data.filter((item) => {
			const regex = new RegExp(searchVal, "gi");
			return item.name.match(regex);
		});

		// SENDING SEARCHED ITEMS
		getSearchedData(sharched);
	}

	function convertToBangla(e) {
		let splitArray = inputValue.split(" ");
		splitArray = splitArray.filter((f) => f != false);
		let lastWord = splitArray[splitArray.length - 1];
		setSplitWordsArray(splitArray);

		if (e.code == "Space" || e.key == "Enter") {
			if (suggestedWords.length > 0) {
				setWord(activeIndex);
			}
		} else if (
			lastWord == "" ||
			e.key == "CapsLock" ||
			e.key == "Tab" ||
			inputValue == "" ||
			e.key == "Backspace"
		) {
			setSuggestionBoxShown(false);
			return;
		} else if (e.key == "ArrowDown") {
			arrowDown();
		} else if (e.key == "ArrowUp") {
			arrowUp();
		} else {
			getBanglaData(lastWord).then((words) => {
				let engWord = inputValue.split(" ");
				engWord = engWord[engWord.length - 1];
				const withEng = [...words, engWord];

				setSuggestedWords(withEng);
			});
		}
	}

	function arrowDown() {
		if (activeIndex == suggestedWords.length - 1) {
			setActiveIndex(0);
			suggestionRef.current.scrollTop = 0;
		} else {
			setActiveIndex((previousIndex) => previousIndex + 1);
			document
				.getElementById(activeIndex + 1)
				.scrollIntoView({ block: "end", inline: "nearest" });
		}
	}
	function arrowUp() {
		if (activeIndex == 0) {
			setActiveIndex(suggestedWords.length - 1);
			const suggestionDiv = suggestionRef.current;
			suggestionDiv.scrollTop = suggestionDiv.scrollHeight;
		} else {
			setActiveIndex((previousIndex) => previousIndex - 1);
			document
				.getElementById(activeIndex - 1)
				.scrollIntoView({ block: "end", inline: "nearest" });
		}
	}

	// main function to set word english to bengali
	function setWord(activeIndex) {
		if (suggestedWords.length > 0) {
			let lastIndex = splitWordsArray.length - 1;

			splitWordsArray[lastIndex] = suggestedWords[activeIndex];
			let mainValue = [...splitWordsArray];
			mainValue = mainValue.join(" ");
			setInputValue(mainValue);

			searchItem(mainValue);
			searchSubmit();

			setSuggestionBoxShown(false);
			setActiveIndex(0);
			setSuggestedWords([]);
		}
	}
	return (
		<div className='input-wrap'>
			<input
				ref={inputRef}
				type='text'
				className='form-control py-3'
				placeholder='Start writing.......'
				value={inputValue}
				onChange={inputChangeHandler}
				onKeyUp={convertToBangla}
			/>
			<div
				className={`list-group mt-1 ${
					suggestionBoxShown ? "d-block" : "d-none"
				}`}
				id='suggestions'
				ref={suggestionRef}
			>
				{suggestedWords &&
					suggestedWords.map((item, index) => (
						<div
							onClick={() => {
								setActiveIndex(index);
								setWord(index);
								inputRef.current.focus();
							}}
							id={index}
							key={item}
							className={`list-group-item list-group-item-action ${
								index == activeIndex && "active"
							}`}
						>
							{item}
						</div>
					))}
			</div>
		</div>
	);
}

export default SearchWithBengali;
