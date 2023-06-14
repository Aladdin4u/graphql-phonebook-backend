import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";

const NavBar = ({ addPhone, show }) => {
  const color = show ? "red" : "blue"
  return (
    <nav>
      <div className="nav-logo"></div>
      <h2 className="nav-title" >Phone</h2>
      <button className="nav-icon" onClick={addPhone} style={{backgroundColor : color}}>
        {show ? <HiOutlineX /> : <HiOutlinePlusSm />}
      </button>
    </nav>
  );
};

export default NavBar;
