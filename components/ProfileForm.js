import { useState } from "react";
import Button from "./Button";

export default function ProfileForm() {
    const [form, setForm] = useState({ name: "", email: "", notifications: true });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile saved!");
    };

    const handleLogout = () => {
        alert("Logged out!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label className="label" htmlFor="name">Name</label>
                <input id="name" name="name" className="input" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label className="label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label className="label" htmlFor="notifications">
                    <input id="notifications" name="notifications" type="checkbox" checked={form.notifications} onChange={handleChange} />
                    Enable notifications
                </label>
            </div>
            <Button type="submit" variant="primary">Save</Button>
            <Button type="button" variant="danger" onClick={handleLogout}>Log Out</Button>
        </form>
    );
}
