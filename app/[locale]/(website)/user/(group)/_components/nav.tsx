import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { usePathname } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

type Props = {}

const ProfileNav = (props: Props) => {
  const t = useTranslations('profile.nav')
  const pathname = usePathname()

  const navItems = [
    {
      href: '/user/profile',
      label: 'profile',
    },
    {
      href: '/user/orders',
      label: 'orders',
    },
    {
      href: '/user/security',
      label: 'security',
    },
    {
      href: '/user/size',
      label: 'size',
    },
    {
      href: '/user/address',
      label: 'address',
    },
  ]

  return (
    <Card className="border-[0.5px] shadow-lg max-md:p-0 md:border-[#1A1A1A]">
      <CardContent className="p-0">
        <nav className="divide-border flex items-center space-y-0 px-2 md:block md:divide-y">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:bg-muted block px-3 py-3 text-[10px] font-semibold transition-colors md:px-6 md:py-4 md:text-base',
                  isActive && 'bg-muted font-bold'
                )}
              >
                {t(item.label)}
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}

export default ProfileNav
