const MapComponent = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25003.04!2d-0.13!3d38.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd74072e5f5e0001%3A0x8075c20b0e4e3d00!2sLa%20Nuc%C3%ADa%2C%20Alicante!5e0!3m2!1ses!2ses!4v1"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.8)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de la promoción en La Nucía, Alicante"
      />
    </div>
  );
};

export default MapComponent;
