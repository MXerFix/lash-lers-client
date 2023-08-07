import React from 'react'
import styles from './Portfolio.css'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import example_1 from '../../public/img/example1.jpeg'
import example_2 from '../../public/img/example2.jpeg'
import wet_effect_example from '../../public/img/wet_effect_example.jpeg'
import D2_example_1 from '../../public/img/2D_example.jpeg'
import D2_example_2 from '../../public/img/2D_example_2.jpeg'
import classic_example from '../../public/img/classic_example.jpeg'
import angles_example from '../../public/img/angles_example.jpeg'
import { PortfolioCard } from '../../components/PortfolioCard/PortfolioCard'
import { portfolioArrayUpToDownSort } from '../../helpers/sorthelper'
import { CLASSIC_LASHES, D25_LASHES, D2_LASHES, D15_LASHES, lashPrice, WET_EFFECT, ANGLE_LASHES } from '../../utils/consts'

const portfolios = [
  {
    id: 2,
    price: lashPrice(WET_EFFECT),
    image: wet_effect_example,
    bend: WET_EFFECT
  },
  {
    id: 5,
    price: lashPrice(D2_LASHES),
    image: D2_example_1,
    bend: D2_LASHES
  },
  {
    id: 4,
    price: lashPrice(ANGLE_LASHES),
    image: angles_example,
    bend: ANGLE_LASHES
  },
  {
    id: 3,
    price: lashPrice(CLASSIC_LASHES),
    image: classic_example,
    bend: CLASSIC_LASHES
  },
  {
    id: 6,
    price: lashPrice(D2_LASHES),
    image: example_2,
    bend: D2_LASHES
  },
  {
    id: 1,
    price: lashPrice(D2_LASHES),
    image: D2_example_2,
    bend: D2_LASHES,
  },
]


// portfolios.sort(portfolioArrayUpToDownSort)

const portfoliosJSX = portfolios.map((portfolio) => (
  <PortfolioCard key={portfolio.id} portfolio_bend_type={portfolio.bend} portfolio_image={portfolio.image} portfolio_price={portfolio.price} />
))

export const Portfolio = () => {
  return (
    <div>
      <h2 className='title my-8 mx-6 '> В этом разделе можно ознакомиться с моими работами </h2>
      <div className={styles.portfolio_box}>
        {portfoliosJSX}
      </div>
    </div>
  )
}
