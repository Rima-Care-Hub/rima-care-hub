import Navbar from "../../components/Navbar";
import ProfileForm from "../../components/ProfileForm";
import Card from "../../components/Card";

export default function SettingsPage() {
    return (
        <>
            <Navbar />
            <main className="page container">
                <Card title="Settings & Profile">
                    <ProfileForm />
                </Card>
            </main>
        </>
    );
}
