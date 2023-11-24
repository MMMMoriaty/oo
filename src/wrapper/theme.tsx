import { Outlet } from 'umi'
import { theme, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'

const { defaultSeed, defaultAlgorithm } = theme

export default () => {

  const [themeToken, setThemeToken] = useState(null)

  useEffect(() => {
    const themeColor = 'rgb(231, 76, 60)'
    const mapToken = defaultAlgorithm({
      ...defaultSeed,
      colorPrimary: themeColor
    })

    const theme = {
      colorPrimary: mapToken.colorPrimary,
      colorLink: mapToken.colorPrimary,
      colorLinkHover: mapToken.colorPrimaryHover,
      colorLinkActive: mapToken.colorPrimaryActive,
      borderRadius: 3,
      borderRadiusOuter: 3,
      borderRadiusLG: 3,
      borderRadiusSM: 3,
      borderRadiusXS: 3,
      colorBgContainerDisabled: "#dedede",
      colorTextDisabled: "rgba(0, 0, 0 , 0.65)",
      colorError: "#e0301e",
      colorSuccess: "#4eb523",
    }

    setThemeToken(theme)
    console.log('%c%s', 'color: green; font-size: 16px;', process.env.NODE_ENV)
  }, [])

  return <ConfigProvider
    theme={{
      token: themeToken,
      components: {
        Form: {
          itemMarginBottom: 0,
        }
      }
    }}>
    {
      themeToken && <Outlet/>
    }
  </ConfigProvider>
}