import { SignUp } from "../components/SignUp";
import { User } from "../components/User";
import SettingsPage from "../pages/settings";

export default () => (
  <User>
    {({ data, loading, error }) => {
      if (error) return <p>Error</p>;
      if (loading) return <p>Loading</p>;
      return data && data.me ? <SettingsPage /> : <SignUp />;
    }}
  </User>
);
