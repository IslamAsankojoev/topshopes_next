import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import {arrayMoveImmutable} from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "src/components/DropGallery/Photo";
import { photos } from "photos";
import ImagesDragDrop from "src/components/DropGallery/ImagesDragDrop";

const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

function Test() {

  return (
    <div style={{
      width: "400px",
      maxWidth: "400px",
    }}>
      <ImagesDragDrop/>
    </div>
  );
}

export default Test;
