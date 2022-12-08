<<<<<<< HEAD
=======
import Icon from "components/icons/FaIcon/Icon";
>>>>>>> parent of 0b7575f6 (fix order)
import ShopLayout1 from "components/layouts/ShopLayout1";
import React from "react";

const ContactsPage = ({ data }) => {
  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <ShopLayout1>
      <div
        style={{
          padding: "100px",
        }}
      ></div>
    </ShopLayout1>
  );
};

export default ContactsPage;
