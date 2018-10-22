import { ResetPassword } from "../components/ResetPassword";
import { SignedOutContainer } from "../styles/SignedOutContainer";

const ResetPage = (props: { resetToken: string }) => {
  console.log(props);
  return (
    <SignedOutContainer>
      <ResetPassword resetToken={props.resetToken} />
    </SignedOutContainer>
  );
};
ResetPage.getInitialProps = ({
  query: { resetToken }
}: {
  query: { resetToken: string };
}) => ({ resetToken });

export default ResetPage;
