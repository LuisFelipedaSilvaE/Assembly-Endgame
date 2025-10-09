import { useEffect, useRef, useState } from "react";
import "./AEApp.css";
import { languages } from "./languages";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function AEApp() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const { width } = useWindowSize();
  const buttonsContainer = useRef(null);

  const numGuessesLeft = languages.length - 1;

  const wrongGuessCount = guessedLetters.filter((letter) => {
    return !currentWord.includes(letter);
  }).length;

  const isGameWon = [...currentWord].every((letter) => {
    return guessedLetters.includes(letter);
  });

  const isGameLost = wrongGuessCount >= numGuessesLeft;

  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const alphabet = "qwertyuiopasdfghjklzxcvbnm";

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toLowerCase();

      const buttons = [...buttonsContainer.current.querySelectorAll("button")];

      if ([...alphabet].includes(key) && !isGameOver) {
        buttons.find((b) => b.innerText.toLowerCase() === key).focus();
        !guessedLetters.includes(key) ? addGuessedLetter(key) : undefined;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessedLetters, isGameOver]);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevGuessedLetters) => {
      return prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter];
    });
  }

  function startNewGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  const languageElements = languages.map((lang, index) => {
    const isLost = index < wrongGuessCount;
    return (
      <span
        className={clsx(
          "rounded-[3px] p-[4.5px] relative languages overflow-hidden",
          {
            lost: isLost,
          }
        )}
        key={lang.name}
        style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
      >
        {lang.name}
      </span>
    );
  });

  const wordElements = [...currentWord].map((letter, index) => {
    return !isGameOver ? (
      <span
        key={index}
        className="border-b border-b-[rgb(250,245,220)] text-[length:1.125rem] flex justify-center items-center h-10 w-10 bg-[rgb(50,50,50)]"
      >
        {guessedLetters.includes(letter) ? letter.toUpperCase() : undefined}
      </span>
    ) : isGameWon ? (
      <span
        key={index}
        className="border-b border-b-[rgb(250,245,220)] text-[length:1.125rem] flex justify-center items-center h-10 w-10 bg-[rgb(50,50,50)] text-green-500"
      >
        {letter.toUpperCase()}
      </span>
    ) : isGameLost ? (
      <span
        key={index}
        className={clsx(
          "border-b border-b-[rgb(250,245,220)] text-[length:1.125rem] flex justify-center items-center h-10 w-10 bg-[rgb(50,50,50)]",
          !guessedLetters.includes(letter)
            ? "text-[rgb(235,95,75)]"
            : "text-[rgb(15,170,90)]"
        )}
      >
        {letter.toUpperCase()}
      </span>
    ) : undefined;
  });

  const keybordLetters = [...alphabet].map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    return (
      <button
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        className={clsx(
          "border border-[rgb(215,215,215)] text-black rounded-[3px] text-[length:1.125rem] flex justify-center items-center h-8.75 w-8.75 bg-[rgb(250,185,40)] shadow-[2.5px_2.5px_0px_1px_rgba(250,185,40,0.5),5px_5px_0px_1px_rgba(250,185,40,0.5)] key",
          {
            "!bg-[rgb(15,170,90)] !shadow-[2.5px_2.5px_0px_1px_rgba(15,170,90,0.5),5px_5px_0px_1px_rgba(15,170,90,0.5)]":
              isCorrect,
            "!bg-[rgb(235,95,75)] !shadow-[2.5px_2.5px_0px_1px_rgba(235,95,75,0.5),5px_5px_0px_1px_rgba(235,95,75,0.5)]":
              isWrong,
            "!cursor-not-allowed opacity-[0.5]": isGameOver,
          }
        )}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      {isGameWon ? <Confetti width={width} /> : undefined}
      <main className="flex flex-col justify-center items-center gap-7.5 h-full w-full">
        <header className="text-center flex flex-col justify-center items-center gap-4">
          <h1 className="text-[length:1.25rem] font-[500] text-[rgb(250,245,220)]">
            Assembly: Endgame
          </h1>
          <p className="text-sm max-w-87.5 text-[rgb(140,140,140)]">
            Guess the word within 8 attempts to keep the programming world safe
            from Assembly!
          </p>
        </header>
        <section
          aria-live="polite"
          role="status"
          className={clsx(
            "rounded-sm text-[rgb(250,245,220)] flex flex-col justify-center items-center min-h-15 w-full max-w-87.5 bg-[rgb(50,50,50)] shadow-[2.5px_2.5px_0px_2.5px_rgba(75,75,75,0.75)] text-center border-b border-r border-[rgba(255,255,255,0.1)] status",
            isGameOver
              ? isGameWon
                ? "!bg-[rgb(15,170,90)] !shadow-[2.5px_2.5px_0px_2.5px_rgba(40,195,115,0.75)]"
                : "!bg-[rgb(185,40,40)] !shadow-[2.5px_2.5px_0px_2.5px_rgba(210,65,65,0.75)]"
              : isLastGuessIncorrect
              ? "bg-[rgb(120,95,165)] !shadow-[2.5px_2.5px_0px_2.5px_rgba(145,120,190,0.75)]"
              : undefined
          )}
        >
          {isGameOver ? (
            isGameWon ? (
              <>
                <h2 className="m-1.25">You win!</h2>
                <p className="m-0">Well done! 🎉</p>
              </>
            ) : (
              <>
                <h2 className="m-1.25">Game over!</h2>
                <p className="m-0">
                  You lose! Better start learning Assembly 😂
                </p>
              </>
            )
          ) : isLastGuessIncorrect ? (
            <p className="italic font-[400]">
              {getFarewellText(languages[wrongGuessCount - 1].name)}
            </p>
          ) : undefined}
        </section>
        <section className="w-full flex flex-wrap justify-center items-center max-w-87.5 gap-1.25 self-center">
          {languageElements}
        </section>
        <section className="flex justify-center items-center gap-0.5">
          {wordElements}
        </section>
        <section
          aria-live="polite"
          role="status"
          className="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0 sr-only"
        >
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct! the letter ${lastGuessedLetter} is in the word`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word`}{" "}
            You have {numGuessesLeft - wrongGuessCount} attempts left
          </p>
          <p>
            Current word:{" "}
            {[...currentWord]
              .map((letter) => {
                return guessedLetters.includes(letter)
                  ? letter + "."
                  : "blank.";
              })
              .join(" ")}
          </p>
        </section>
        <section
          ref={buttonsContainer}
          className="flex flex-wrap justify-center items-center gap-2.25 max-w-112.5 bg-[rgb(50,50,50)] keybord-container"
        >
          {keybordLetters}
        </section>
        {isGameOver ? (
          <button
            id="ngbutton"
            onClick={startNewGame}
            className="text-black bg-[rgb(15,180,230)] border border-[rgb(215,215,215)] rounded-sm w-56.25 h-10 p-[6px_12px] block"
          >
            New Game
          </button>
        ) : undefined}
      </main>
    </>
  );
}
