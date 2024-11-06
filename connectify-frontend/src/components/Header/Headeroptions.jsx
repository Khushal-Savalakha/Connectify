// import React from 'react';
// import { Avatar } from "@mui/material";

// export default function Headeroptions({ Icon, title, avatar }) {
//   return (
//     <div className='header__options'>
//       {Icon && <Icon />}  {/* Render the Icon if it's passed */}
//       {avatar && <Avatar />}  {/* Render the Avatar if it's passed */}
//       <span>{title}</span>
//     </div>
//   );
// }

import React from 'react';
import "../css/header.css";

export default function Headeroptions({ Icon, title, avatar, active, onClick }) {
  return (
    <div className={`header__options ${active ? 'header__options--active' : ''}`} onClick={onClick}>
      {Icon && <Icon className="header__optionIcon" />}
      {avatar && avatar}
      <h3 >{title}</h3>
    </div>
  );
}
