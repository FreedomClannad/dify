'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  RiHammerFill,
  RiHammerLine,
} from '@remixicon/react'
import classNames from '@/utils/classnames'
type ToolsNavProps = {
  className?: string
}

const DockingNav = ({
  className,
}: ToolsNavProps) => {
  const currentPath = usePathname()
  console.log(currentPath) // '/tools/docking'
  const segments = currentPath.split('/')
  const currentSegment = segments[segments.length - 1]
  const activated = currentSegment === 'docking'

  return (
    <Link href="/tools/docking" className={classNames(
      className, 'group',
      activated && 'bg-white shadow-md',
      activated ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-200',
    )}>
      {
        activated
          ? <RiHammerFill className='mr-2 w-4 h-4' />
          : <RiHammerLine className='mr-2 w-4 h-4' />
      }
      Tool/Molecular Docking
    </Link>
  )
}

export default DockingNav
