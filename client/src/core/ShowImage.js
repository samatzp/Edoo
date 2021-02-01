import React from "react";
import { Img } from "react-image";

const ShowImage = ({ item, url }) => {
  return (
    <div className="img-fluid rounded text-center">
      <Img
        alt={item.name}
        className="mb-3 img-fluid"
        style={{ maxHeight: "216px", minHeight: "216px"}}
        src={`/api/${url}/photo/${item._id}`}
        loader={
          <div className="ui placeholder">
            <div  style={{ maxHeight: "216px", minHeight: "216px"}} className="image"></div>
          </div>
        }
      />
    </div>
  );
};

export default ShowImage;
