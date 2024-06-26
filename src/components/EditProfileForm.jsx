import { useState } from 'react';
import ProfileImage from "./ProfileImage.jsx";
import '../styles/components_Styles/EditProfileForm.scss';

const EditProfileForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleImageUpload = (imageUrl) => {
        setFormData({ ...formData, profilePic: imageUrl });
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form className='Profile' onSubmit={handleSubmit}>
            <label>Foto perfil:</label>
            <ProfileImage onImageUpload={handleImageUpload} />
            <label>
                Biografía:
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </label>
            <br />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default EditProfileForm;