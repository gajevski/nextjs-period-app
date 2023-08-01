import Link from 'next/link';

export default function CurrentPeriod() {
    return (
      <div>
        <h1>Current period</h1>
        <h2>Go to <Link href="/periods/past"> past periods</Link></h2>
      </div>
    )
  }