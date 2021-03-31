import isFunctionComponent from './isFunctionComponent'

export default function mountComponent(virtualDOM, container) {
  if (isFunctionComponent(virtualDOM)) {
    // mount funciton component
    console.log('is function component')
  } else {
    // mount class component
  }
}
