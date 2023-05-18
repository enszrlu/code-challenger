'use client';
import Link from 'next/link';

function ClientSideRoute({ children, route }) {
    return <Link href={route}>{children}</Link>;
}

export default ClientSideRoute;
