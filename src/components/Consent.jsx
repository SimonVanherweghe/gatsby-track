import React, { useState } from "react"
import style from "./Consent.module.css"

import Cookies from "universal-cookie"

const Consent = () => {
  const cookies = new Cookies()
  const [gaConsent, setGaConsent] = useState(
    cookies.get("gatsby-gdpr-google-analytics") || false
  )
  const [fbConsent, setFbConsent] = useState(
    cookies.get("gatsby-gdpr-facebook-pixel") || false
  )
  const [consent, setConsent] = useState(cookies.get("consent-setup") || false)
  if (consent) {
    return null
  }

  const handleChange = e => {
    const value = e.currentTarget.checked
    const type = e.currentTarget.name
    switch (type) {
      case "chkga":
        setGaConsent(value)
        break
      case "chkfb":
        setFbConsent(value)
        break
      default:
        break
    }
  }

  const handleButton = value => {
    setConsent(true)
    cookies.set("consent-setup", true)
    if (!value) {
      cookies.set("gatsby-gdpr-google-analytics", false)
      cookies.set("gatsby-gdpr-facebook-pixel", false)
    } else {
      cookies.set("gatsby-gdpr-google-analytics", gaConsent)
      cookies.set("gatsby-gdpr-facebook-pixel", fbConsent)
    }
  }
  return (
    <div className={style.container}>
      <span role="img" aria-label="Cookie" className={style.cookie}>
        🍪
      </span>
      <label htmlFor="chkga">
        <span className={style.label}>Google Analytics</span>
        <input
          type="checkbox"
          name="chkga"
          id="chkga"
          checked={gaConsent}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="chkfb">
        <span className={style.label}>Facebook</span>
        <input
          type="checkbox"
          name="chkfb"
          id="chkfb"
          checked={fbConsent}
          onChange={handleChange}
        />
      </label>
      <div>
        <button className={style.buttonNo} onClick={() => handleButton(false)}>
          No, thanks
        </button>{" "}
        <button className={style.buttonYes} onClick={() => handleButton(true)}>
          Go!
        </button>
      </div>
    </div>
  )
}

export default Consent
