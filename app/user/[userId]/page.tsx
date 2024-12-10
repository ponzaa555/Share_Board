interface UserPageProps {
    params:{
        userId: string;
    };
};

const Page = ({params,}:UserPageProps) => {
    return(
        <div>
            User ID : {params.userId}
        </div>
    )
};

export default Page;