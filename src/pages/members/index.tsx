import { MembersTemplate } from '@/pageTemplates/MembersTemplate/index';
import { canSSRAuth } from '@/utils/canSSRAuth';

const Members = () => <MembersTemplate />;

export default Members;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
