import { useState } from "react";
interface Props{
    items :String[];
    heading:String;
    
}

function ListGroup({ items, heading }: Props) {
  const handleCLick = (index: number) => {
    setSelectedindex(index);
  };
  const [selectedIndex, setSelectedindex] = useState(-1);
  return (
    <>
      <h2>{heading}</h2>
      <ul className="list-group">
      {items.map((item, index) => (
        <li
          className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
          key={index}
          onClick={() => {
            handleCLick(index);
          }}
        >
          {item}
        </li>
      ))}
      </ul>
    </>
  );
}
export default ListGroup;
