import ShopLayout1 from 'components/layouts/ShopLayout1';
import { GetStaticProps } from 'next';
import React from 'react';
import { toast } from 'react-toastify';
import { PostsService } from 'api/services/posts/posts.service';
import { useLocales } from 'utils/Translate/useTranslate';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

const ContactsPage = () => {
  const auth = useTypedSelector((state) => state.userStore.user);
  const { profile } = useActions();

  React.useEffect(() => {}, []);

  return (
    <ShopLayout1>
      <div
        style={{
          padding: '100px',
        }}>
        {auth}
      </div>
    </ShopLayout1>
  );
};

export default ContactsPage;
