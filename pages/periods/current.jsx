import BottomNavigation from "../../components/BottomNagivation";
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

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

      <BottomNavigation redirectTo="/periods/past" />

    </div>
  );
}
