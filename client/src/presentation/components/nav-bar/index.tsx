import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavigationLinks from "./components/navigation-links";
import UserActions from "./components/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { IRootState} from "../../../domain/usecases/store/rootState";
import { useEffect, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { fetchUserDirectly } from "../../../domain/store/actions/getUserOwn";
import { useForm } from "react-hook-form";
import { ISearchUserBody, searchUsers } from "../../../data/user/searchUsers";

export interface ISearchRequest{
  searchTerm:string;
}

const NavBar: React.FC = (): JSX.Element => {
  const location = useLocation();
  const protectedRoutes = ["/register", "/login"];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible); // Toggle function for the dropdown
  const { handleSubmit, control, formState } = useForm<ISearchRequest>();


  const isProtectedRoute = protectedRoutes.includes(location.pathname);
  const userData = useSelector((state: IRootState) => state.user);
  const [userSearchResults, setUserSearchResults] = useState([])
  const userOptions = [
    { id: 1, label: 'Profile', link: `/profile/${userData?._id}` }, // Updated link
    { id: 2, label: 'Settings', link: '/settings' },
  ];
const navigate = useNavigate();
  const dispatch = useDispatch();
  function logoutUser () {
    localStorage.removeItem('jwt');
    setIsDropdownVisible(false)
    fetchUserDirectly(dispatch);
    navigate('/login');
  }

  async function searchUsersInfo (searchTerm:ISearchUserBody) {
    const response = await searchUsers(searchTerm);
    setUserSearchResults(response.data)
    return response;
  }

  return (
    <div className={styles.navbar_wrapper}>
      <div className={`${styles.navbar_box} ${styles.navbar_logo_searchbar__wrapper}`}>
        <Link to="/">
          <img
            className={styles.top_navigation_logo}
            src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png"
            alt="Logo"
          />
        </Link>
        {/* <div className={styles.search_bar__wrapper}>
        {userData !== null && <form onSubmit={handleSubmit((formData) => {
          searchUsersInfo({searchTerm: formData.searchTerm})
        })}>
          <div className={styles.search_bar__box}>
  <TextField
                name="searchTerm"
                type="text"
                testId="searchTerm"
                control={control}
                placeholder="Search"
              />
              </div>
        </form>}
        <div className={styles.search_results__wrapper}>
  {userSearchResults.length !== 0 ? (
  <ul>
      {userSearchResults.map((user:IUserResponse) => (
        <li key={user.username}> <Link to="#" >{user.username} </Link></li> 
      ))}
    </ul>

  ) : (
    "No results to be shown"
  )}
  </div>
  </div>*/}
      </div> 
 
      <div>
 
</div>
      {!isProtectedRoute && (
        <div className={styles.navbar_box}>
          <div className={styles.nav_items_wrapper}>
            <NavigationLinks />
          </div>
          {userData === null ? (
            <div className={styles.nav_btns_wrapper}>
              <UserActions />
            </div>
          ) : (
            <div className={styles.profile_option__wrapper}>
              <button onClick={toggleDropdown} className={styles.username_displayed}>
              <GrUserManager /> {userData.username}
              </button> 
              {isDropdownVisible && (
                <div className={styles.dropdown_menu}>
                  {userOptions.map((option) => (
                    <Link onClick={() => setIsDropdownVisible(false)} key={option.id} to={option.link} className={styles.dropdownItem}>
                      {option.label}
                    </Link>
                  ))}
                   <button onClick={logoutUser}>Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;