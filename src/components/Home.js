import React from 'react'
import Basket from '../images/discgolf-basket.jpg'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Home(props) {
  return (
    <div>
      <img style={{height:'calc(100vh - 68px)', width:'100%'}} src={Basket} alt='Discgolf Basket'></img>
      <div style={{position:'absolute', left:'60px', top:'110px', background:'transparent', height:'600px', width:'300px', display:'flex', alignItems:'center', flexDirection:'column'}}>
        <p style={{fontWeight:'bold', fontSize:'2.5rem', marginBottom:'0px'}}>Welcome to</p>
        <p style={{fontWeight:'bold', fontSize:'2.5rem', fontFamily:'Kotta One, serif', marginBottom:'0px'}}>MYDISCGOLFPBS!</p>
        <div style={{fontSize:'2rem', marginTop:'30px', marginBottom:'30px', display:'flex', textAlign:'center'}}>Start with adding scores to your selected course</div>
        <Button component={Link} color='secondary' variant='contained'
				to="/addscore" onClick={() => {
					props.setNavTabValue('two');
				}}>GO!</Button>
      </div>
    </div>
  )
}
