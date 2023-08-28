import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Link from "next/link";

const SkeletonPeriod = () => (
  <div className="flex items-center justify-center m-4 h-32 card bg-base-300 rounded-box animate-pulse">
    <article className="prose lg:prose-xl">
      <span className="loading loading-ring loading-sm"></span>
    </article>
  </div>
);

export default function CurrentPeriod() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    fetch('/api/periods/next-period')
      .then(response => response.json())
      .then(data => {
        setPeriods(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching periods:', error);
        setLoading(false);
      });
  }, []);

  const lastPeriod = periods.lastPeriod;
  const nextPeriod = periods.nextPeriod;

  const lastStartDate = lastPeriod ? new Date(lastPeriod.startDate) : null;
  const nextStartDate = nextPeriod ? new Date(nextPeriod.startDate) : null;

  return (
    <div>
      <article className="prose lg:prose-xl">
        <h1 className="px-5 py-2">Najbliższy okres</h1>
      </article>
      <div className="flex flex-col w-full lg:flex-row">
        {loading ? (
          <>
            <SkeletonPeriod />
            <div className="divider lg:divider-horizontal">🩸</div>
            <SkeletonPeriod />
          </>
        ) : (
          <>
            <div className="grid m-4 flex-grow h-32 card bg-base-300 rounded-box place-items-center">
              <article className="prose lg:prose-xl">
                <h3 className="px-5">Ostatni okres wypadł:</h3>
                <p className="px-5">
                  {lastStartDate && lastStartDate.toLocaleDateString(undefined, options)}
                </p>
              </article>
            </div>
            <div className="divider lg:divider-horizontal">🩸</div>
            <div className="grid m-4 flex-grow h-32 card bg-base-300 rounded-box place-items-center">
              <article className="prose lg:prose-xl">
                <h3 className="px-5">Następny okres wypada:</h3>
                <p className="px-5">
                  {nextStartDate && nextStartDate.toLocaleDateString(undefined, options)}
                </p>
              </article>
            </div>
          </>
        )}
      </div>

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
