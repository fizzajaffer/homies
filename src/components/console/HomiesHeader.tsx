import Link from 'next/link';
import HomiesLogo, {type HomiesLogoState} from './HomiesLogo';
export default function HomiesHeader({state,active}:{state:HomiesLogoState;active:'console'|'evals'}) {
 return <header className="desk-header"><Link href="/console" className="homies-brand" aria-label="Homies tenant deal desk"><HomiesLogo state={state}/></Link><span className="desk-header-title">{active==='console'?'Tenant Deal Desk':'Evaluation review'}</span><Link className="desk-link" href={active==='console'?'/evals':'/console'}>{active==='console'?'Evals ↗':'Deal desk ↗'}</Link></header>;
}
