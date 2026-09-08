const YoutubePlaceholder = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 402"
      width="600"
      height="402"
      className="absolute inset-0 size-full object-cover object-center"
      style={{
        pointerEvents: "none",
      }}
    >
      {/* Background rectangle */}
      <rect width="600" height="402" fill="#cccccc"></rect>
      {/* Play button circle */}
      <circle cx="300" cy="201" r="60" fill="rgba(0, 0, 0, 0.6)"></circle>
      {/* Play button triangle */}
      <polygon points="280,171 280,231 340,201" fill="white"></polygon>
    </svg>
  );
};

export default YoutubePlaceholder;
