import React from 'react'
import Header from '../fund_wallet/components/Header'
import CardCan from './components/cards/CardCan'
import Recet from '../Dashboard/components/Recet/Recet'
import Overlay from '../../layout/components/sidebar/Overlay'

const VirtualCard = () => {
    return (
        <div className='relative'>
            <Overlay />
            <div className='p-4'>
                <Header Subheading='current Balance' amount={'0.00'} />
                <CardCan />
                <Recet />
            </div>
        </div>
    )
}

export default VirtualCard
