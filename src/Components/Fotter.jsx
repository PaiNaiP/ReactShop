import React from 'react'
import '../styles/footer.css'
import vk from '../img/VK Circled.svg'
import gmail from '../img/gmail.svg'
import logomarkt from '../img/martk.svg'
import { Link, Route } from 'react-router-dom'

export const Fotter = () => {
  return (
    <div className="contfoter">
        <div className="leftfot">
            <div className="txtmarketfot">
            Маркетплейс (торговая площадка) — это онлайн-платформа для продажи и покупки товаров и услуг через интернет. Продавцы размещают на маркетплейсах свои товары, покупатели выбирают лучшие варианты по ценам, характеристикам и другим параметрам.
            </div>
        </div>
        <div className="rightfot">
            <div className="buttt">
              <a href="https://vk.com/painaipmustdie">
                <button className='vkbut'><img src={vk} alt="" /></button>
                </a>
                <a href='mailto:isip_e.i.batygina@mpt.ru'>
                <button className='gmailbut'><img src={gmail} alt="" /></button>
                </a>
                <img className='marketotolkt' src={logomarkt} alt="" />
            </div>
            <div className="quefot">Есть вопросы? Пишите на isip_e.i.batygina@mpt.ru</div>
        </div>
    </div>
  )
}
