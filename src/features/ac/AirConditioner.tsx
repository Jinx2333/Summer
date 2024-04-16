import React from 'react'
import { Box, Grid, Typography, Fade } from '@mui/material'
import { AcMode, selectTemperature } from './acSlice'

import * as pkg from '~/../package.json'

import './AirConditioner.scss'
import { useAppSelector } from '~/app/hooks'

// import { adsenseLink, jumpToAdsense } from "../adsense";

const acColor = {
  border: '#e0e0e0',
  display: '#cccccc',
  wind: '#bbbbbb',
}

const AcBorder: React.FC = (props) => {
  return (
    <Box
      bgcolor="background.paper"
      height={150}
      border={1}
      borderColor={acColor.border}
      borderRadius={10}
      boxShadow={3}
      position="relative"
      style={{
        borderRadius: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
      {...props}
    ></Box>
  )
}

/**
 * 空调温度
 * @returns
 */
function AcTemperature() {
  const temperature = useAppSelector(selectTemperature)
  return (
    <Typography variant="h4" align="center">
      <span className="font-digit ac-temperature">{temperature}</span>
      <small className="font-digit">°C</small>
    </Typography>
  )
}

/**
 * 显示屏（温度/图标）
 * @param props
 */
const AcDisplay = React.forwardRef((props: { mode: AcMode }, ref) => {
  return (
    <Box
      {...props}
      ref={ref}
      position="absolute"
      top={25}
      right={30}
      color={acColor.display}
    >
      <Typography align="left" variant="subtitle2">
        <span>{props.mode === 'cold' ? '❄' : '☀️'}</span>️️
      </Typography>
      <AcTemperature />
    </Box>
  )
})

/**
 * 空调 Logo
 * @param props
 */
const AcLogo: React.FC = () => {
  return (
    <div className="text-center mt-28">
      <a
       
        title={pkg.description}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          className="m-auto"
          style={{
            width: 12,
          }}
          src="/yun-logo.svg"
          alt="logo"
        />
      </a>
    </div>
  )
}

/**
 * 出风口线
 * @returns
 */
const AirOutlet: React.FC = () => {
  return <Box mt={1} border={1} borderColor={acColor.border}></Box>
}

/**
 * 空调状态
 * @param props
 */
const AcStatus: React.FC<{ status: boolean }> = (props) => {
  // 空调状态小灯
  const led = { backgroundColor: props.status ? '#38F709' : acColor.border }

  return (
    <Box
      style={{
        backgroundColor: led.backgroundColor || 'transparent',
      }}
      position="absolute"
      height={4}
      width={4}
      borderRadius="50%"
      top={130}
      right={10}
    ></Box>
  )
}

/**
 * 文本标签（黑色小点点）
 * @param num
 * @param color
 * @param size 宽高尺寸
 * @param mx
 * @param my
 */
function textLabel(
  num: number,
  color: string,
  size: number,
  mx: number,
  my = 0,
) {
  const titleLength = [...new Array(num).keys()]
  const titleLabel = titleLength.map(n => (
    <Box
      key={n}
      mx={mx}
      my={my}
      width={size}
      height={size}
      borderRadius="50%"
      bgcolor={color}
    ></Box>
  ))
  return (
    <Box display="flex" justifyContent="center">
      {titleLabel}
    </Box>
  )
}

/**
 * 功耗标签
 * @param props
 */
const EnergyLabel: React.FC<{ titleLength: number }> = () => {
  return (
    <Box
      position="absolute"
      top={10}
      left={10}
      height={70}
      width={50}
      borderRadius={1}
      p={0.5}
      style={{
        backgroundColor: '#4ea5f5',
      }}
    >
      {textLabel(6, 'white', 4, 0.25)}
      <Box
        my={0.5}
        px={1}
        py={0.25}
        height={28}
        width="100%"
        bgcolor="background.paper"
      >
        <Grid container>
          <Box bgcolor="green" height={3} width="40%"></Box>
          <Box
            height={3}
            marginLeft="40%"
            style={{
              borderTop: 1.5,
              borderRight: 2,
              borderBottom: 1.5,
              borderLeft: 0,
              borderTopColor: 'transparent',
              borderRightColor: 'green',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              borderStyle: 'solid',
            }}
          ></Box>
          <Box bgcolor="green" height={3} width="10%"></Box>
        </Grid>
        <Box mt={0.25} bgcolor="lightGreen" height={3} width="50%"></Box>
        <Box mt={0.25} bgcolor="#ffc107" height={3} width="60%"></Box>
        <Box mt={0.25} bgcolor="orange" height={3} width="70%"></Box>
        <Box mt={0.25} bgcolor="red" height={3} width="80%"></Box>
      </Box>
      <Box
        mb={0.25}
        pt={0.1}
        height={20}
        width="100%"
        bgcolor="background.paper"
      >
        {textLabel(11, 'black', 2, 0.1, 0.25)}
        <Box my={0.1} borderTop={1} height={0} width="100%"></Box>
        {textLabel(9, 'black', 1.5, 0.1, 0.25)}
        {textLabel(10, 'black', 1.2, 0.1, 0)}
      </Box>
      {textLabel(8, 'white', 2, 0.1)}
    </Box>
  )
}

/**
 * 节能产品惠民工程
 */
function EnergySavingLabel() {
  return (
    <a
      className="adsense-link"
      
      target="_blank" rel="noreferrer"
    >
    
    </a>
  )
}

/**
 * 风特效
 * @param props
 */
const WindEffect = React.forwardRef((props, ref) => {
  return (
    <Box {...props} ref={ref} mt={3} display="flex" justifyContent="center">
      <Box
        style={{ transform: 'rotate(10deg)' }}
        bgcolor={acColor.wind}
        width={5}
        height={40}
      ></Box>
      <Box mx={10} bgcolor={acColor.wind} width={5} height={40}></Box>
      <Box
        style={{ transform: 'rotate(-10deg)' }}
        bgcolor={acColor.wind}
        width={5}
        height={40}
      ></Box>
    </Box>
  )
})

/**
 * 空调
 */
export const AirConditioner: React.FC<{
  mode: AcMode
  status: boolean
  temperature: number
}> = (props) => {
  return (
    <Box>
      <AcBorder>
        <Fade in={props.status}>
          <AcDisplay mode={props.mode} />
        </Fade>
        {/* <AcLogo /> */}
        <AirOutlet />
        <AcStatus status={props.status} />
        <EnergyLabel titleLength={6} />
        {import.meta.env.VITE_DISABLE_ADSENSE ? null : <EnergySavingLabel />}
      </AcBorder>
      <Fade in={props.status} timeout={{ enter: 2500, exit: 1500 }}>
        <WindEffect />
      </Fade>
    </Box>
  )
}
