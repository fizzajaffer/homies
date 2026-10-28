import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mia · Tenant Console',description:'Synthetic, local-only tenant advocacy foundation'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" data-skin="studio"><body>{children}</body></html>}
