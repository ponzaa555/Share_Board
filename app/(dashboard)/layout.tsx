import { Navbar } from "./_component/navbar";
import { OrgSidBar } from "./_component/org-sidebar";
import { Sidebar } from "./_component/sidebar";


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidBar />
                    {/* Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size */}
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;