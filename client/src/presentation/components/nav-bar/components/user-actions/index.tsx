import { Link } from "react-router-dom";

export interface INavItemsProps {
  path: string;
  label: string;
}

const navButtons: INavItemsProps[] = [
  { path: "/register", label: "Join Now" },
  { path: "/login", label: "Sign In" },
];
const UserActions: React.FC = (): JSX.Element => {
  return (
    <ul>
      {navButtons.map((item) => (
        <li key={item.label}>
          <Link to={item.path}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default UserActions;
