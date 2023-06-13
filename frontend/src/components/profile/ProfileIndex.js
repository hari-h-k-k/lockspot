import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import BgImg from '../../assets/images/ProfileBg.jpg';
import OwnerProfile from "./owner/OwnerProfile.js";
import UserProfile from "./user/UserProfile.js";
import ProfileNav from "./ProfileNav";

function ProfileIndex() {
    const userDetails = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div style={
            {
                // backgroundImage: `url(${BgImg})`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${BgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'auto',
                maxHeight: '100vh',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2rem',
            }
        }>
            <ProfileNav/>
            {
                userDetails.userType === "owner" ? (<OwnerProfile/>) : (<UserProfile/>)
            }
        </div>
    );
}

export default ProfileIndex;