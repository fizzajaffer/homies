export type HomiesLogoState = 'idle' | 'checking' | 'locked';

/** Decorative mark and wordmark; the containing link supplies its accessible name. */
export default function HomiesLogo({state}: {state: HomiesLogoState}) {
  return <>
    <svg viewBox="0 0 70 64" width="54" height="50" aria-hidden="true" className={'homies-mark '+state}><path d="M8 26 35 6 62 26" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round"/><circle cx="27" cy="39" r="17" fill="#A8DCC2"/><circle cx="44" cy="39" r="17" fill="#F2AA96"/><path d="M35 48c-15-9-12-17-6-17 3 0 5 2 6 4 2-2 4-4 7-4 6 0 8 8-7 17" fill="#1E293B"/></svg><span>homies</span>
  </>;
}
