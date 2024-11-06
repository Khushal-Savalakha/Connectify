import React from "react";
import "../css/widget.css";
import InfoIcon from "@mui/icons-material/Info";

export default function Widget() {
  return (
    <div className="widget">
      <div className="widget__top">
        <div className="widget__header">
          <h4>Connectify News</h4>
          <InfoIcon className="widget__infoIcon" />
        </div>
        <div className="widget__body">
          <ul className="widget__options">
            <li>
              <h4>Slaying Job Search Fees</h4>
              <p>6d ago • 4,550 readers</p>
            </li>
            <li>
              <h4>A Two Pizza Rule for Meetings</h4>
              <p>2d ago • 6,120 readers</p>
            </li>
            <li>
              <h4>How to Ask for a Raise</h4>
              <p>1d ago • 3,200 readers</p>
            </li>
            <li>
              <h4>Is Remote Work Here to Stay?</h4>
              <p>3d ago • 8,200 readers</p>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
