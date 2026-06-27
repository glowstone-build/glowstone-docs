"use client";

import {
  Shader,
  FilmGrain,
  Glass,
  StudioBackground,
  Swirl,
} from 'shaders/react'

export default function ShaderEffect() {
  return (
    <Shader className='w-[1024px] h-[1024px]'>
      <StudioBackground
        ambientIntensity={65}
        backIntensity={25}
        brightness={85}
        center={{
          x: 0.5,
          y: 0.88
        }}
        color="#d3e4f0"
        fillAngle={53}
        fillIntensity={6}
        fillSoftness={94}
        keyIntensity={11}
        keySoftness={100}
        wallCurvature={19} />
      <Glass
        aberration={1}
        blur={20}
        cutout={true}
        fresnel={0.02}
        fresnelSoftness={0.31}
        scale={.65}
        highlight={0.3}
        refraction={1.57}
        shapeSdfUrl="https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_3E9oOrwiqo8UEYMwcaDhF5D7Ors/w8_Ao1edGZoA_sdf.bin"
        thickness={1}>
        
        <Swirl
          blend={18}
          colorA="#212121"
          colorB="#ffffff"
          colorSpace="hsl"
          detail={4.2}
          speed={0.5} />
      </Glass>
      <FilmGrain
        strength={0.1} />
    </Shader>
  )
}