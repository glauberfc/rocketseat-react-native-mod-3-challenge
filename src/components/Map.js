import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components/native'

import { Actions as ModalActions } from '#/store/ducks/modal'

const Map = ({ openModal, users }) => (
  <Container>
    <MainMap
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      loadingEnabled
      onLongPress={openModal}
    >
      {users.data &&
        users.data.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude
            }}
          >
            <Image source={{ uri: user.avatar }} />
            <TooltipContainer>
              <UserName>{user.name}</UserName>
              <UserBio>{user.bio}</UserBio>
            </TooltipContainer>
          </Marker>
        ))}
    </MainMap>
  </Container>
)

const Container = styled.View`
  flex: 1;
`

const MainMap = styled(MapView)`
  flex: 1;
`

const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 4px;
  border-color: #fff;
`

const TooltipContainer = styled(Callout)`
  flex-wrap: wrap;
  width: 200px;
  padding: 8px;
`

const UserName = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #333;
`

const UserBio = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  color: #555;
`

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
