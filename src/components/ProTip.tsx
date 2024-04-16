import React from 'react'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined'
import { jumpToAdsense, adsenseLink } from '../features/adsense'

/**
 * 喜马拉雅链接
 * @param props
 * @returns
 */
const AdsenseLink: React.FC<{ text: string }> = (props) => {
  return (
    <a
      className="adsense-text-link"
     
      target="_blank"
      onClick={() => {
        jumpToAdsense()
      }} rel="noreferrer"
    >
      {props.text || '喜马拉雅'}
    </a>
  )
}

export const ProTip: React.FC = () => {
  return (
    <p
      className="text-center"
      style={{
        margin: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EmojiObjectsOutlinedIcon />
      Tip: 为你的夏日带去
      {import.meta.env.VITE_DISABLE_ADSENSE
        ? (
          '清凉'
        )
        : (
          <a  >清凉</a>
        )}
      ！
    </p>
  )
}
