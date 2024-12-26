"use client"
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_component/empty-org";
import { useSearchParams } from "next/navigation";
import { BoardList } from "./_component/board-list";


interface DashboardPageProps{
    searchParams : {
        search? : string,
        favorites? : string
    }
}

const DashboardPage = ({searchParams}: DashboardPageProps) => {
  const {organization} = useOrganization();
  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-6">
      {
        organization ? (<BoardList orgId={organization.id} query={searchParams}/>) : (<EmptyOrg/>)
      }
    </div>
  );
};

export default DashboardPage;
