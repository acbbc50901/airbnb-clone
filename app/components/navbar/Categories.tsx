'use client'

 
import Container from '../Container'

import { IoDiamond } from 'react-icons/io5'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiWindmill, GiIsland, GiBoatFishing, GiForestCamp, GiCastle, GiCaveEntrance, GiCactus, GiBarn } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
  {
    label: '海灘',
    icon: TbBeach,
    description: '這家旅館接近海灘喔！',
  },
  {
    label: '風車',
    icon: GiWindmill,
    description: '這附近有風車可以去觀賞',
  },
  {
    label: '現代化',
    icon: MdOutlineVilla,
    description: '裡面有現代化的佈置 齁齁看',
  },
  {
    label: '鄉村小徑',
    icon: TbMountain,
    description: '是個在鄉村裡面的小旅館',
  },
  {
    label: '游泳池',
    icon: TbPool,
    description: '裡面有附設游泳池',
  },
  {
    label: '小島',
    icon: GiIsland,
    description: '這旅館在小島上',
  },
  {
    label: '湖',
    icon: GiBoatFishing,
    description: '附近有些湖畔可以逛逛',
  },
  {
    label: '滑雪',
    icon: FaSkiing,
    description: '有滑雪設施可以使用',
  },
  {
    label: '城堡',
    icon: GiCastle,
    description: '體驗中古世記的感覺',
  },
  {
    label: '露營',
    icon: GiForestCamp,
    description: '開啟你的露營人生',
  },
  {
    label: '寒冷',
    icon: BsSnow,
    description: '冷冷的地方!',
  },
  {
    label: '洞穴',
    icon: GiCaveEntrance,
    description: '附近有洞穴可以做探險',
  },
  {
    label: '沙漠',
    icon: GiCactus,
    description: '炎熱的地帶',
  },
  {
    label: '穀倉',
    icon: GiBarn,
    description: '這附近有農場的存在',
  },
  {
    label: '奢華旅館',
    icon: IoDiamond,
    description: '十足得奢侈',
  },
]


const Categories = () => {

  const params = useSearchParams();
  const category = params?.get('category')
  const pathname = usePathname();

  const isMainPage  = pathname === '/';

  if (!isMainPage) {
    return null
  }


  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {
          categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default Categories