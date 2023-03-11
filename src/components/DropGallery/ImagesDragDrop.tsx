import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import {arrayMoveImmutable} from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "src/components/DropGallery/Photo";
import { photos } from "photos";

const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

function ImagesDragDrop({images}) {
  const [items, setItems] = useState(images);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "100%",
    }}>
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
    </div>
  );
}

export default ImagesDragDrop;
