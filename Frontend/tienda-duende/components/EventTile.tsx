// @ts-nocheck
"use client";

function formatDate(dateString: string): string {
  const dateObj = new Date(dateString);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return dateObj.toLocaleDateString("es-ES", options);
}

const getHourFromUTCString = (utcString) => {
  const date = new Date(utcString);

  const amPm = date.getUTCHours() >= 12 ? "PM" : "AM";

  date.setUTCHours(date.getUTCHours() - 6);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = (hours % 12 === 0 ? 12 : hours % 12)
    .toString()
    .padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return formattedTime;
};

export default function EventTile({ item }) {
  const formattedDate = formatDate(item.date);

  return (
    <div>
      <div className="mt-5 overflow-hidden aspect-w-1 flex aspect-h-1 h-52">
        <p className="col-start-1 col-end-2 px-8 flex-grow underline text-2xl font-semibold">
          {item.eventType === "DELIVERY EVENT"
            ? // Si item.eventType es igual a 'ALGO', realiza esto
              `Entrega de pedido`
            : // Si item.eventType no es igual a 'ALGO', realiza esto
              `Cita: ${item.name}`}
        </p>
        <div
          className="flex items-end justify-end"
          style={{ paddingRight: "50px", paddingTop: "3px" }}
        >
          <span
            className="bg-red-200 px-8 py-2 rounded-md"
            style={{ backgroundColor: "#D9D9D9" }}
          >
            <span className="text-lg font-semibold">{`${item.eventType}`}</span>
          </span>
        </div>
      </div>
      <div className="mt-3 px-8 col-span-1 text-2xl ">
        <p className="text-lg">
          <i>
            {" "}
            <b>Fecha: </b>{" "}
          </i>
          {formattedDate}
        </p>
        <p className="text-lg">
          <i>
            {" "}
            <b>Hora de inicio: </b>{" "}
          </i>
          {getHourFromUTCString(item.startTime)}
        </p>
        <p className="text-lg">
          <i>
            {" "}
            <b>Hora de finalización: </b>{" "}
          </i>
          {getHourFromUTCString(item.endTime)}
        </p>
        <p className="text-lg">
          <i>
            {" "}
            <b>Cliente: </b>{" "}
          </i>{" "}
          {item.userId}
        </p>
        <p className="text-lg">
          <i>
            {" "}
            <b>Ubicación: </b>{" "}
          </i>{" "}
          {item.location}
        </p>
        <p className="text-lg mt-5 mb-5">
          <i>
            {" "}
            <b>Descripción: </b>{" "}
          </i>{" "}
          {item.description}
        </p>
      </div>
    </div>
  );
}
