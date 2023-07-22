import React from 'react'
import './Banner.css'
import BannerEnglist from '../../../Assets/banner_english.avif'
function Banner() {
  return (
    <>
      <div className='banner'>
        <div className='bannerEnglish'>
          <img src={BannerEnglist} />
        </div>
      </div>
    </>
  )
}

export default Banner
