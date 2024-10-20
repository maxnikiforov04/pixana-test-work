import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import '../styles';
import {ReactNode} from "react";


export const metadata: Metadata = {
    title: 'ToDo App',
    description: 'nextjs zustand mui zod react-hook-form',
};

export function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <AppRouterCacheProvider>
                <body>{children}</body>
            </AppRouterCacheProvider>
        </html>
    );
}
