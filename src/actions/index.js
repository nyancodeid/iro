const actions = store => ({
  setColorContrast (state, contrast) {
    store.setState({ contrast })
  }
})

export default actions