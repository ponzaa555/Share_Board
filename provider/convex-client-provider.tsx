"use client"

import { ClerkProvider, RedirectToSignIn, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
    useConvexAuth,
} from "convex/react"
import { Loading } from "@/components/auth/loading";



interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk 
                useAuth={useAuth}
                client={convex}
            >
                <AuthCheck>
                    {children}
                </AuthCheck>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
        <AuthLoading>
            <Loading />
        </AuthLoading>
        );
    }

    if (!isAuthenticated) {
        return <RedirectToSignIn />;
    }

    return <>{children}</>;
}