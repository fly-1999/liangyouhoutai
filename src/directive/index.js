import permission from './permission'
const install = Vue => {
  Vue.directive('has', permission)
}

export default install
