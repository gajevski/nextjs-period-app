import Link from 'next/link';

export default function PastPeriods() {
    return (
      <div>
        <h1>Past periods</h1>
        <h2>Go to <Link href="/periods/current"> current period</Link></h2>
      </div>
    )
  }