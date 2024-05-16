import styles from "../../NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdArticle, MdWork } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { SiSololearn } from "react-icons/si";

export interface INavItemsProps {
  path: string;
  icon: JSX.Element;
  label: string;
}

const navItems: INavItemsProps[] = [
  { path: "/trending", icon: <FaArrowTrendUp />, label: "Trending" },
  { path: "/articles", icon: <MdArticle />, label: "Articles" },
  { path: "/people", icon: <IoPeople />, label: "People" },
  { path: "/learning", icon: <SiSololearn />, label: "Learning" },
  { path: "/jobs", icon: <MdWork />, label: "Jobs" },
];

const NavigationLinks: React.FC = (): JSX.Element => (
  <ul>
    {navItems.map((item) => (
      <li key={item.label}>
        <NavLink
          to={item.path}
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          {item.icon}
          <div>{item.label}</div>
        </NavLink>
      </li>
    ))}
  </ul>
);

export default NavigationLinks;
