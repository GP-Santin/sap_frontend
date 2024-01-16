import { useState } from "react";

interface IMainUsageProps {
  setMainUsage: React.Dispatch<React.SetStateAction<string>>;
}

function MainUsage({setMainUsage}: IMainUsageProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };



  return <div></div>;
}

export default MainUsage;
