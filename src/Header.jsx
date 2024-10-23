import React, { useEffect, useState } from 'react'



export default function Header() {

    function handlesubmit (e){
        e.preverntDefault()
    }


  return (
    <form className='header' onSubmit={handlesubmit}>

    </form>
  )
}
