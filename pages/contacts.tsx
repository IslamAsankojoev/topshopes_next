import Icon from "components/icons/FaIcon/Icon";
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
