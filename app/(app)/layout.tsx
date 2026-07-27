import { SiteHeader } from '@/components/SiteHeader'
import { requireSession } from '@/lib/auth-guard'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // The proxy redirects unauthenticated browsers, but pages verify for themselves too.
  const author = await requireSession()

  return (
    <>
      <SiteHeader author={author} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6">{children}</main>
    </>
  )
}
