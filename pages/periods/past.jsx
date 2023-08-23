import Link from "next/link";
import { useEffect, useState } from "react";

const SkeletonPeriod = () => (
  <div className="flex items-center justify-center m-4 h-32 card bg-base-300 rounded-box animate-pulse">
    <article className="prose lg:prose-xl">
    <span className="loading loading-ring loading-sm"></span>
    </article>
  </div>
);

export default function PastPeriods() {
  const [periods, setPeriods] = useState([]);
  const [modalPeriodId, setModalPeriodId] = useState(null);
  const [modalStartDate, setModalStartDate] = useState("");
  const [loading, setLoading] = useState(true);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    fetch('/api/periods/all-periods')
      .then(response => response.json())
      .then(data => {
        setPeriods(data.periods)
        setLoading(false);
      })
            .catch(error => {
        console.error('Error fetching periods:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <article className="prose lg:prose-xl">
        <h1 className="px-5 py-2">Poprzednie okresy</h1>
      </article>
      <button
        className="plus-button btn btn-circle btn-neutral z-10 fixed bottom-24 right-4"
        onClick={() => window.add_modal.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>

      {loading ? (
        <SkeletonPeriod />
      ) : (
        periods.reverse().map((period, index) => (
          <div className="flex flex-col w-full lg:flex-row mb-4" key={period.id}>
            <div className="grid m-4 p-2 flex-grow h-32 card bg-base-300 rounded-box">
              <article className="prose lg:prose-xl">
                <h3 className="px-5">Początek okresu:</h3>
                <p className="px-5">
                  {new Date(period.startDate).toLocaleDateString(undefined, options)}
                </p>
              </article>
              <div className="card-actions justify-end">
              <button
                className="btn btn-xs btn-neutral mr-2"
                onClick={() => {
                  setModalPeriodId(period.id);
                  setModalStartDate(period.startDate);
                  window.edit_modal.showModal();
                }}
              >
                <svg
                  className="feather feather-edit"
                  fill="none"
                  height="16"
                  width="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                className="btn btn-xs btn-square btn-outline"
                onClick={async () => {
                  if (window.confirm("Na pewno chcesz usunąć ten okres?")) {
                    try {
                      const response = await fetch('/api/periods/remove-period', {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          id: period.id
                        })
                      });

                      if (response.ok) {
                        const dataResponse = await fetch('/api/periods/all-periods');
                        const data = await dataResponse.json();
                        setPeriods(data.periods);
                      } else {
                        console.error(response.error)
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              </div>
            </div>
            <div className="divider lg:divider-horizontal">🩸</div>
          </div>
        ))
      )}

      <div className="btm-nav">
        <Link href="/periods/current">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
        </Link>
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <dialog id="add_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-6">Dodaj okres</h3>
          <div className="mb-4">
            <span className="label-text">Data rozpoczęcia</span>
            <input
              type="date"
              name="startDate"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={() => window.add_modal.close()}>
              Zamknij
            </button>
            <button
              type="button"
              className="btn btn-neutral"
              onClick={async () => {
                const startDate = document.querySelector('#add_modal [name="startDate"]').value;

                try {
                  const response = await fetch('/api/periods/add-period', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      startDate,
                    })
                  });

                  if (response.ok) {
                    window.add_modal.close();
                    const dataResponse = await fetch('/api/periods/all-periods');
                    const data = await dataResponse.json();
                    setPeriods(data.periods);
                  } else {
                    console.error(response.error)
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Dodaj
            </button>
          </div>
        </form>
      </dialog>

      <dialog id="edit_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-6">Edytuj okres</h3>
          <div className="mb-4">
            <span className="label-text">Data rozpoczęcia</span>
            <input
              type="date"
              name="startDate"
              className="input input-bordered w-full max-w-xs"
              defaultValue={modalStartDate}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={() => window.edit_modal.close()}>
              Zamknij
            </button>
            <button
              type="button"
              className="btn btn-neutral"
              onClick={async () => {
                const startDate = document.querySelector('#edit_modal [name="startDate"]').value;

                try {
                  const response = await fetch('/api/periods/edit-period', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      id: modalPeriodId,
                      startDate,
                    })
                  });

                  if (response.ok) {
                    window.edit_modal.close();
                    const dataResponse = await fetch('/api/periods/all-periods');
                    const data = await dataResponse.json();
                    setPeriods(data.periods);
                  } else {
                    console.error(response.error)
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Edytuj
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}