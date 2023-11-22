// @ts-nocheck
const ImageLink = ({ imageUrl }) => {
  const openInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white p-2 border rounded-full hover:bg-red-400"
        onClick={openInNewTab}
      >
        Ver comprobante de pago
      </button>
    </div>
  );
};

export default ImageLink;
