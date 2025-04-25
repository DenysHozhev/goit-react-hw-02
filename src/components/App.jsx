import Description from "./description/Description";
import Options from "./options/Options";
import "./App.css";
import Feedback from "./feedback/Feedback";
import { useState, useEffect } from "react";
import Notification from "./notification/Notification";

function App() {
  const [totals, setTotals] = useState(() => {
    const savedScore = localStorage.getItem("savedScoreKey");
    if (savedScore !== null) {
      return JSON.parse(savedScore);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(
    () => localStorage.setItem("savedScoreKey", JSON.stringify(totals)),
    [totals]
  );

  const totalFeedback = totals.good + totals.neutral + totals.bad;

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setTotals({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    } else {
      setTotals({
        ...totals,
        [feedbackType]: totals[feedbackType] + 1,
      });
    }
  };

  const positiveFeedback = Math.round((totals.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          totals={totals}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
