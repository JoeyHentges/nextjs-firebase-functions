import { useRef } from "react"

/*
  The purpose of this hook is to programically enable and disable scrolling on the page.
   
  Example:
  {
    const [blockScroll, allowScroll] = useScrollBlock();
    blockScroll(); // this disables scrolling for the page
    allowScroll(); // this re-enables scrolling for the page
  }
*/

export const useScrollBlock = () => {
  const scroll = useRef(false)

  const blockScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || scroll.current) return

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = "relative" /* [1] */
    body.style.position = "relative" /* [1] */
    html.style.overflow = "hidden" /* [2] */
    body.style.overflow = "hidden" /* [2] */

    scroll.current = true
  }

  const allowScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || !scroll.current) return

    html.style.position = ""
    html.style.overflow = ""
    body.style.position = ""
    body.style.overflow = ""

    scroll.current = false
  }

  return [blockScroll, allowScroll];
}
