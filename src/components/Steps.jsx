import { useEffect, useState } from "react";

const Steps = () => {
  const [steps, setSteps] = useState([]);
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(0);

  const ChangeDate = (e) => {
    setDate((prev) => (prev = e.target.value));
  };

  const CangeDistance = (e) => {
    setDistance((prev) => (prev = e.target.value));
  };

  const sortSteps = () => {
    if (!steps) {
      return null
    }
    setSteps(prev => prev.sort((a, b) => {
      if (a.date.split("-")[2] === b.date.split("-")[2]) {
        if (a.date.split("-")[1] === b.date.split("-")[1]) {
          if (a.date.split("-")[0] > b.date.split("-")[0]) {
            return -1;
          }
        }
        if (a.date.split("-")[1] > b.date.split("-")[1]) {
          return -1;
        }
      }
      if (a.date.split("-")[2] > b.date.split("-")[2]) {
        return -1;
      }
    }));
  };



  const editStep = (id) => {
    setDate(
      (prev) =>
      (prev = steps
        .map((item) => (item.id === id ? item.date : ""))
        .join("-")
        .split("-")
        .reverse()
        .join("-"))
    );
  };

  const removeStep = (id) => {
    setSteps((prev) => (prev = steps.filter((item) => item.id !== id)));
  };

  const editDistance = () => {
    setSteps(
      (prev) =>
      (prev = steps.map((item) =>
        item.id === date
          ? { ...item, distance: item.distance + +distance }
          : { ...item }
      ))
    );
  };

  const addNewSteps = () => {
    if (date) {
      let dateRu = date.split("-").reverse().join("-");
      if (distance) {
        if (steps.find((item) => item.id === date) ? false : true) {
          setSteps(
            (prev) =>
            (prev = [
              ...steps,
              { id: date, date: dateRu, distance: +distance },
            ])
          );
        } else {
          editDistance();
        }
      }
    }
    setDate("");
    setDistance(0);
    sortSteps()
  };


  return (
    <main className="steps-wrapper">
      <div className="steps-container">
        <div className="steps-add">
          <section>
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              value={date}
              type="date"
              htmlFor="date"
              className="steps-add-date"
              onChange={(e) => {
                ChangeDate(e);
              }}
            />
          </section>
          <section>
            <label htmlFor="distance">Пройдено, км</label>
            <input
              value={distance}
              type="number"
              htmlFor="distance"
              className="steps-add-distance"
              onChange={(e) => {
                CangeDistance(e);
              }}
            />
          </section>
          <button onClick={addNewSteps} className="steps-add-button">
            OK
          </button>
        </div>
        <div className="steps-list">
          <div className="steps-list-title">
            <span className="steps-list-title-column">Дата (ДД.ММ.ГГ)</span>
            <span className="steps-list-title-column">Пройдено, км</span>
            <span className="steps-list-title-column">Действия</span>
          </div>
          <div className="steps-list-items">
            {steps.map((item) => {
              return (
                <div key={item.id} className="step-list-item">
                  <div className="step-list-item-date">{item.date}</div>
                  <div className="step-list-item-distance">
                    {item.distance} Км
                  </div>
                  <div className="step-list-edit-and-remove">
                    <div
                      onClick={() => editStep(item.id)}
                      className="step-list-edit"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => removeStep(item.id)}
                      className="step-list-remove"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Steps;
