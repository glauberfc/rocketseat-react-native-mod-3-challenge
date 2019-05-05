import React, { Component } from 'react'
import { Dimensions, Modal as RNModal, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { Actions as ModalActions } from '#/store/ducks/modal'
import { Actions as UsersActions } from '#/store/ducks/users'

class Modal extends Component {
  state = {
    username: ''
  }

  handleChangeText = text => this.setState({ username: text })

  handleDimiss = () => {
    const { userClearError } = this.props

    userClearError()
    this.handleChangeText('')
  }

  render() {
    const { username } = this.state
    const {
      isVisible,
      closeModal,
      addUserRequest,
      latitude,
      longitude,
      newUserIsLoading,
      newUserRequestFailed
    } = this.props

    return (
      <RNModal
        animationType="fade"
        transparent="overFullScreen"
        visible={isVisible}
        onDismiss={this.handleDimiss}
      >
        <Overlay>
          <Container>
            <Header>Add new user</Header>
            <ErrorMessage>{newUserRequestFailed}</ErrorMessage>
            <UsernameInput
              value={username}
              placeholder="Github username"
              onChangeText={this.handleChangeText}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            <ButtonsContainer>
              <Button type="danger" onPress={closeModal}>
                <TextButton>Cancel</TextButton>
              </Button>
              <Button
                type="success"
                onPress={() =>
                  addUserRequest({ username, latitude, longitude })
                }
              >
                {newUserIsLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <TextButton>Save</TextButton>
                )}
              </Button>
            </ButtonsContainer>
          </Container>
        </Overlay>
      </RNModal>
    )
  }
}

const { width, height } = Dimensions.get('window')

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: ${height};
  background: rgba(0, 0, 0, 0.5);
`

const Container = styled.View`
  width: 300px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
`

const Header = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #333;
`

const ErrorMessage = styled.Text`
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
  color: #e74c3c;
`

const UsernameInput = styled.TextInput`
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  padding: 10px;
  border-width: 1px;
  border-radius: 4px;
  border-color: #ddd;
  font-size: 16px;
  background: #fff;
`

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.TouchableOpacity`
  width: 49%;
  padding: 10px;
  margin-top: 8px;
  border-radius: 4;
  background: ${props => (props.type === 'success' ? '#2ecc71' : '#e74c3c')};
`

const TextButton = styled.Text`
  font-size: 16;
  text-align: center;
  font-weight: bold;
  color: #fff;
`

const mapStateToProps = state => ({
  newUserIsLoading: state.users.loading,
  newUserRequestFailed: state.users.error,
  ...state.modal
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(ModalActions.closeModal()),
  addUserRequest: userData => dispatch(UsersActions.addUserRequest(userData)),
  userClearError: () => dispatch(UsersActions.userClearError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
