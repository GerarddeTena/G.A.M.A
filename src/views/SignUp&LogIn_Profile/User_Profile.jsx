import { useState, useEffect } from 'react';
import EditProfileForm from './EditProfileForm.jsx';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchedUser = {
            username: "MauroSatangelo",
            email: "Mauro@gmail.com",
            bio: "Gamer apasionado.",
            level: 10,
            points: 1500,
        };
        setUser(fetchedUser);
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    if (isEditing) {
        return <EditProfileForm user={user} onSave={handleSave} />;
    }

    return (
        <div className="user-profile">
            <div className="background-image" style={{backgroundImage: `url('https://i.imgur.com/zl1PmX8.jpg')`}}></div>
            <img className="profile-pic" src="https://i.imgur.com/0rX1WmD.png" alt="Avatar de prueba" />
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.bio}</p>
            <div className="stats">
                <p>Nivel: {user.level}</p>
                <p>Puntos: {user.points}</p>
            </div>
            <button onClick={handleEditClick}>Edit profile</button>
        </div>
    );
};

export default UserProfile;