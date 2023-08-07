interface blockInterface {
  children: string
  path: string
  onClickFN: Function
}

interface socialBlockInterface {
  img: string
  href: string
}

interface footMenuElementInterface {
  children: string
  img: string
  path: string
  onClickFN: Function
}


export type {
  blockInterface, socialBlockInterface, footMenuElementInterface
}