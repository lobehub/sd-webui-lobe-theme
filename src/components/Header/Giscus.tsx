import React, { useEffect } from 'react'

interface GiscusProps {
  themeMode: 'light' | 'dark'
}
const Giscus: React.FC<GiscusProps> = ({ themeMode }) => {
  useEffect(() => {
    // giscus
    const giscus: HTMLScriptElement = document.createElement('script')
    giscus.src = 'https://giscus.app/client.js'
    giscus.setAttribute('data-repo', 'canisminor1990/sd-webui-kitchen-theme')
    giscus.setAttribute('data-repo-id', 'R_kgDOJCPcNg')
    giscus.setAttribute('data-mapping', 'number')
    giscus.setAttribute('data-term', '53')
    giscus.setAttribute('data-reactions-enabled', '1')
    giscus.setAttribute('data-emit-metadata', '0')
    giscus.setAttribute('data-input-position', 'bottom')
    giscus.setAttribute('data-theme', themeMode)
    giscus.setAttribute('data-lang', 'en')
    giscus.crossOrigin = 'anonymous'
    giscus.async = true
    document.getElementsByTagName('head')[0].appendChild(giscus)
  }, [])

  return <div id="giscus" className="giscus" />
}

export default React.memo(Giscus)
