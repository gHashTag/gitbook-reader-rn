// @flow

import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

type Props = {
  source: {},
  placeHolderSource: number, // 本地图片，require最后会变成资源id，数字类型
  style: { resizeMode?: string },
}

export default class ImageWithPlaceHolder extends React.PureComponent {
  props: Props

  state: {
    loading: boolean,
  }

  constructor() {
    super()

    this.state = {
      loading: true,
    }
  }

  onImageLoad = () => {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { source, placeHolderSource, style } = this.props

    const flattenStyle = StyleSheet.flatten(style)
    const { resizeMode, ...viewStyle } = StyleSheet.flatten(style)

    const {
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = flattenStyle

    const imageStyle = [
      styles.placeHolder,
      {
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
      },
    ]

    return (
      <View style={viewStyle}>
        <Image style={imageStyle} source={source} onLoad={this.onImageLoad} />
        {this.state.loading ? <Image style={[imageStyle]} source={placeHolderSource} /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  placeHolder: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: null,
    width: null,
  },
})
