import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
const alanKey =
	"c0500951cda2189530ab6f12b94832292e956eca572e1d8b807a3e2338fdd0dc/stage";
function App() {
	const classes = useStyles();
	const [activeArticle, setActiveArticle] = useState(-1);
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === "newHeadlines") {
					//	alert("This code was executed");
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === "highlight") {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				} else if (command === "open") {
					const parsedNumber =
						number.length > 2
							? wordsToNumbers(number, { fuzzy: true })
							: number;
					const article = articles[parsedNumber - 1];

					if (parsedNumber > 20) {
						alanBtn().playText("Please try that again...");
					} else if (article) {
						window.open(article.url, "_blank");
						alanBtn().playText("Opening...");
					} else {
						alanBtn().playText("Please try that again...");
					}
				}
			},
		});
	}, []);

	return (
		<div className="App">
			<div className={classes.logoContainer}>
				<img
					src="https://alan.app/voice/images/previews/preview.jpg"
					className={classes.alanLogo}
					alt="alan logo"
				/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
		</div>
	);
}

export default App;
