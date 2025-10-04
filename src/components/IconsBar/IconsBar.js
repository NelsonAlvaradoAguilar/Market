import "./IconsBar.scss";
function IconsBar({
  faceicon,
  emailicon,
  instgicon,
  phoneicon,
  facelink,
  emailink,
  instlink,
  phonelink,
}) {
  return (
    <div className="icons">
      {faceicon ? (
        <a href={facelink} target="_blank" rel="noopener noreferrer">
          <img src={faceicon} alt="Facebook" />
        </a>
      ) : null}
      {emailicon ? (
        <a href={emailink}>
          <img src={emailicon} alt="Email" />
        </a>
      ) : null}
      {instgicon ? (
        <a href={instlink} target="_blank" rel="noopener noreferrer">
          <img src={instgicon} alt="Instagram" />
        </a>
      ) : null}
      {phoneicon ? (
        <a href={phonelink}>
          <img src={phoneicon} alt="Call us" />
        </a>
      ) : null}
    </div>
  );
}
export default IconsBar;
