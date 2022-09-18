// import React from "react";
import { useState } from "react";
//компоненти
import { Section } from "./Section";
import { Statistics } from "./Statistics";
import { FeedbackOptions } from "./FeedbackOptions";
import { Notification } from "./Notification";
//
import s from './App.module.css';

//Перероблюємо на хуки

export const App = () => {
  //значення для початкового стану замість стейт (у класах)
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0); 

//перероблюємо значення стану
  const updateStateCount = item => {
    switch (item) {
      case 'good':
        setGood(state => state + 1);
        break;
      
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      
      case 'bad':
        setBad(state => state + 1);
        break;
    
      default:
        break;
    }
  }
  
// % фібеків
const positivePercentage = () => {
    return good !== 0 ? Math.round((good / total) * 100) : 0;
};
  
  // загальну кількість фідбеків рахуємо
const total = good + neutral + bad;
const optionsArr = { good, neutral, bad };
const options = Object.entries(optionsArr);


  //рендер вже не пишемо, просто ретьорнимо

  return (
    <div className={s.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={updateStateCount}
        />
      </Section>
      <Section title="Statistic">
        {total > 0 ? (
          <Statistics
            options={options}
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );

}

