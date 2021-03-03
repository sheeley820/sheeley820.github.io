import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import path from 'path'

const HTML_UNDER_TEST = path.resolve(__dirname, '../public/index.html')
const options = { 
    runScripts: 'dangerously', 
    resources: "usable", 
    includeNodeLocations: true
}

let dom
let body

describe('index.html', () => {
  beforeEach((done) => {
    JSDOM.fromFile(HTML_UNDER_TEST, options).then(domObject => {
        body = domObject.window.document.body
        dom = domObject
        dom.window.document.addEventListener('DOMContentLoaded', () => done())
    })
  })

  // it('renders a heading element', () => {
  //   expect(body.querySelector('h1')).not.toBeNull()
  //   expect(getByText(body, 'Pun Generator')).toBeInTheDocument()
  // })

  // it('renders a button element', () => {
  //   expect(body.querySelector('button')).not.toBeNull()
  //   expect(getByText(body, 'Click me for a terrible pun')).toBeInTheDocument()
  // })

  // it('renders a new paragraph via JavaScript when the button is clicked', () => {
  //   const button = getByText(body, 'Click me for a terrible pun')

  //   fireEvent.click(button)
  //   let generatedParagraphs = body.querySelectorAll('#pun-container p')
  //   expect(generatedParagraphs.length).toBe(1)

  //   fireEvent.click(button)
  //   generatedParagraphs = body.querySelectorAll('#pun-container p')
  //   expect(generatedParagraphs.length).toBe(2)

  //   fireEvent.click(button)
  //   generatedParagraphs = body.querySelectorAll('#pun-container p')
  //   expect(generatedParagraphs.length).toBe(3)
  // })

  // it('should create a new H2 element', () => {
  //     const hTwo = getByText(body, "Hi There")

  //     expect(hTwo).not.toBeNull();
  //     expect(hTwo).toBeInTheDocument()
  // })

  // it('should be able to test jQuery', () => {
  //     const hTwo = getByText(body, "Yo yo yo")
      
  //     expect(hTwo).not.toBeNull();
  //     expect(hTwo).toBeInTheDocument()
  // })
})
