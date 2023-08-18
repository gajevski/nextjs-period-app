import Link from "next/link";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/next-period");
  const nextPeriod = await response.json();

  return {
    props: {
      nextPeriod,
    },
  };
}

export default function CurrentPeriod({ nextPeriod }) {
  const lastStartDate = new Date(nextPeriod?.lastPeriod.startDate);
  const nextStartDate = new Date(nextPeriod?.nextPeriod.startDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const [selectedDate, setSelectedDate] = useState(nextStartDate);

  return (
    <div>
      <article className="prose lg:prose-xl">
        <h1 className="px-5 py-2">Najbliższy okres</h1>
        <h2 className="px-5">Ostatni okres wypadł:</h2>
        {lastStartDate && (
          <h2 className="px-5">{lastStartDate.toLocaleDateString(undefined, options)}</h2>
        )}
        <h2 className="px-5 mt-16">Następny okres wypada:</h2>
        {nextStartDate && (
          <h2 className="px-5">{nextStartDate.toLocaleDateString(undefined, options)}</h2>
        )}
        <DatePicker
          selected={nextStartDate}
          onChange={(date) => setSelectedDate(date)}
          highlightDates={[nextStartDate]}
        />
      </article>
      <div className="btm-nav">
        <button className="text-error active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <Link href="/periods/past">
          <button className="text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
