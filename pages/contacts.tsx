import Icon from "components/icons/Icon";
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
      >
        <Icon iconName={"FaYoutube"} />
      </div>
    </ShopLayout1>
  );
};

export default ContactsPage;
