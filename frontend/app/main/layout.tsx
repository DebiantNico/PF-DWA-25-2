import Header from "./_components/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white w-full h-full min-h-screen">
            <Header />
            <div className="w-full h-[90vh]">
                {children}
            </div>
        </div>
    );
}