import React from 'react'
import Item from './Item'

const Menuitems = ({textSize,icon,circleSize,perColumn= '8'}) => {
    const [Items, setItems] = React.useState([
        {
          "icon": "bxs-wallet",
          "name": "Fund Wallet",
          'iconType' : 'bx'
        },
        {
          "icon": "bx-transfer-alt",
          "name": "Transactions",
          'iconType' : 'bx'
        },
        {
          "icon": "bx-football",
          "name": "Betting",
          'iconType' : 'bx'
        },
        {
          "icon": "bxs-bolt",
          "name": "Electricity",
          'iconType' : 'bx'
        },
        {
          "icon": "bxs-tv",
          "name": "Cable TV",
          'iconType' : 'bx'
        },
        {
          "icon": "bxs-phone-call",
          "name": "Airtime",
          'iconType' : 'bx'
        },
        {
          "icon": "fa-solid fa-tower-broadcast",
          "name": "Data Bundle",
          'iconType' : 'awesome'
        },
        {
          "icon": "fa-solid fa-wifi",
          "name": "Internet",
          'iconType' : 'awesome'
        }
      ])
  return (
    <div className={`w-[95%] -translate-y-6 mx-auto bg-white shadow-lg rounded p-4 grid grid-cols-4 md:grid-cols-8 md:grid-cols-${perColumn} gap-2`}>
        {
            Items.map((item,index) => (
                <Item key={index} 
                title={item.name}
                icon={item.icon}
                iconType={item.iconType}
                textSize={textSize}
                iconSize={icon}
                circleSize={circleSize}
                 />
            ))
        }
        {/* <Item title='Fund Wallet' icon='bxs-wallet' /> */}
    </div>
  )
}

export default Menuitems
