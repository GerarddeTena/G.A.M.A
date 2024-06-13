import { useState } from 'react';
import '../../styles/views_Styles/StylesEditProfileForm.scss';

const EditProfileForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Correo electrónico:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
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
