import {Component} from 'react'

import LoadingView from '../LoadingView'
import {
  TravelGuideContainer,
  HeadElement,
  LoadingViewContainer,
  UnorderList,
  ListItem,
  Image,
  Div,
} from './Css'

const apiStatus = {
  initial: 'initial',
  loading: 'loader',
  sucess: 'sucess',
  failed: 'failed',
}
class TravelGuide extends Component {
  state = {apiSTate: apiStatus.initial, statePackageList: ''}
  componentDidMount() {
    this.getTravelGuidList()
  }
  getTravelGuidList = async () => {
    this.setState({apiSTate: apiStatus.loading})
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const resposne = await fetch(travelGuidePackagesApiUrl, options)
    if (resposne.ok) {
      const jsonData = await resposne.json()
      const packagelist = jsonData.packages
      this.setState({apiSTate: apiStatus.sucess, statePackageList: packagelist})
    } else {
      this.setState({apiSTate: apiStatus.failed})
    }
  }

  renderLoadingView = () => (
    <LoadingViewContainer>
      <LoadingView />
    </LoadingViewContainer>
  )

  renderSuccessView = () => {
    const {statePackageList} = this.state
    console.log(statePackageList)
    return (
      <UnorderList>
        {statePackageList.map(each => (
          <ListItem key={each.id}>
            <Image alt={each.name} src={each.image_url} />
            <Div>
              <h1>{each.name}</h1>
              <p>{each.description}</p>
            </Div>
          </ListItem>
        ))}
      </UnorderList>
    )
  }

  renderView = () => {
    const {apiSTate} = this.state
    switch (apiSTate) {
      case apiStatus.loading:
        return this.renderLoadingView()
      case apiStatus.sucess:
        return this.renderSuccessView()
    }
  }
  render() {
    return (
      <TravelGuideContainer>
        <HeadElement>Travel Guide</HeadElement>
        {this.renderView()}
      </TravelGuideContainer>
    )
  }
}

export default TravelGuide
