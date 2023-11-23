// @ts-nocheck
"use client";

function formatDate(dateString: string): string {
  const dateObj = new Date(dateString);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return dateObj.toLocaleDateString("es-ES", options);
}

export default function EventTile({ item }) {
  const formattedDate = formatDate(item.date);

  return (
    <div>
      <div className="overflow-hidden aspect-w-1 grid grid-cols-2 aspect-h-1 h-52">
        <p className="mt-4 px-8 col-span-1 underline text-2xl font-semibold">
          {" "}
          {`Cita: ${item.name} `}{" "}
        </p>
        <div
          className="col-span-1 flex justify-end items-end"
          style={{ paddingRight: "50px", paddingTop: "14px" }}
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
        <p className="text-lg">{`Fecha: ${formattedDate}`}</p>
        <p className="text-lg">{`Cliente: ${item.userId}`}</p>
        <p className="text-lg mb-4">{`Ubicación: ${item.location}`}</p>
        <p className="text-lg">{`Descripción: ${item.description}`}</p>
      </div>
    </div>
  );
}
