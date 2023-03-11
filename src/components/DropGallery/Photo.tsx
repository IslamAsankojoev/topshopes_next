const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {

  const imgStyle:{
    [key: string]: any
  } = { 
    margin: margin,
    border: "1px solid #fff",
    display: "block",
    position: "relative",
    objectFit: "cover",
    cursor: "pointer"
   };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { photo, index });
  };

  return (
    <img
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
      {...photo}
      src={photo.image}
      onClick={onClick ? handleClick : null}
      alt="img"
      width='150px'
      height='150px'
      objectFit='cover'
    />
  );
};

export default Photo;
