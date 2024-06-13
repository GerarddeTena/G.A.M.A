import React, { useState, useEffect } from 'react';
import EditProfileForm from './EditProfileForm.jsx';
import '../../styles/views_Styles/StylesUserProfile.scss';

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
            <div className="user-profile__background" style={{backgroundImage: `url('https://i.imgur.com/zl1PmX8.jpg')`}}></div>
            <div className="user-profile__content">
                <img className="user-profile__avatar" src="https://i.imgur.com/0rX1WmD.png" alt="Avatar de prueba" />
                <h2 className="user-profile__username">{user.username}</h2>
                <p className="user-profile__email">{user.email}</p>
                <p className="user-profile__bio">{user.bio}</p>
                <div className="user-profile__stats">
                    <div className="user-profile__stat">
                        <span className="user-profile__stat-value">{user.level}</span>
                        <span className="user-profile__stat-label">Nivel</span>
                    </div>
                    <div className="user-profile__stat">
                        <span className="user-profile__stat-value">{user.points}</span>
                        <span className="user-profile__stat-label">Puntos</span>
                    </div>
                </div>
                <button className="user-profile__edit-button" onClick={handleEditClick}>Editar perfil</button>
            </div>
        </div>
    );
};

export default UserProfile;