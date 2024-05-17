import Loader from 'react-loader-spinner'

const LoadingView = () => (
  <div data-testid="loader">
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  </div>
)

export default LoadingView
