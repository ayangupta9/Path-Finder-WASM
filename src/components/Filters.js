import React from 'react'
import { RadioButtonGroup } from 'react-rainbow-components'
import { NodeContext } from '../contexts/NodeContext'

const options = [
  { value: 'start', label: 'Start' },
  { value: 'finish', label: 'Finish' },
  { value: 'wall', label: 'Wall' }
]

class Filters extends React.Component {
  static contextType = NodeContext

  constructor (props) {
    super(props)
    this.state = {
      value: 'start'
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (event) {
    const val = event.target.value
    this.setState({ value: val }, () => {
      if (this.state.value === 'start') {
        this.props.setChoosingOptions('start')
      } else if (this.state.value === 'finish') {
        this.props.setChoosingOptions('finish')
      } else if (this.state.value === 'wall') {
        this.props.setChoosingOptions('wall')
      }
    })
  }

  render () {
    return (
      <RadioButtonGroup
        label={'Select node'}
        id='radio-button-group-component-1'
        options={options}
        value={this.state.value}
        onChange={this.handleOnChange}
      />
    )
  }
}
export default Filters
