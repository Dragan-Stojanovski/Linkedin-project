import styles from "../../NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdArticle, MdWork } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { SiSololearn } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../domain/usecases/store/rootState";
import { IoMdNotifications } from "react-icons/io";

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

const authenticatedNavLinks:INavItemsProps[] = [
  { path: "/feed", icon: <FaHome />, label: "Home" },
  { path: "/jobs", icon: <MdWork />, label: "Jobs" },
  { path: "/messaging", icon: <AiFillMessage />, label: "Messaging" },
  { path: "/notifications", icon: <IoMdNotifications />, label: "Notifications" },
]

const NavigationLinks: React.FC = (): JSX.Element => {
  const userData = useSelector((state: IRootState) => state.user?.username);
  const linksToRender = userData ? authenticatedNavLinks : navItems;

return(
 <ul>
    {linksToRender.map((item) => (
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
)
};

export default NavigationLinks;
