import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/periods/all-periods");
  const periods = await response.json();

  return {
    props: {
      periods,
    },
  };
}

const addPeriod = async () => {
  await fetch("http://localhost:3001/periods/add-period", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 3, description: "Period four" }),
  });
};

const deletePeriod = async (id) => {
  await fetch("http://localhost:3001/periods/delete-period", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
};

const editPeriod = async (id) => {
  await fetch("http://localhost:3001/periods/edit-period", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      description: `Eddited period number ${id + 1}`,
    }),
  });
};

export default function PastPeriods({ periods }) {
  return (
    <div>
      <article className="prose lg:prose-xl">
        <h1 className="px-5 py-2">Poprzednie okresy</h1>
      </article>
      <button
        className="plus-button btn btn-circle btn-error z-10 fixed bottom-24 right-4"
        onClick={() => window.my_modal_1.showModal()}
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

      {periods.periods.map((period, index) => (
        <div className={`p-3 collapse z-1 ${index === periods.periods.length - 1 ? 'mb-20' : ''}`} key={period.id}>
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content peer-checked:p-4 flex justify-between">
            <p>{period.description}</p>
            <div className="flex">
              <button
                className="btn btn-accent mr-2"
                onClick={() => editPeriod(period.id)}
              >
                <svg
                  className="feather feather-edit"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                className="btn btn-square btn-outline"
                onClick={() => deletePeriod(period.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
        </div>
      ))}

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
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn btn-outline">Zamknij</button>
            <button className="btn btn-info" onClick={addPeriod}>Dodaj</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
