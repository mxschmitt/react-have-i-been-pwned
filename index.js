import sha1 from 'sha1'

import React, { Component } from 'react'
import { pwnedPasswordRange } from 'hibp'

// https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
const HASH_PREFIX_LENGTH = 5

export default class HIBPPasswordChecker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true,
      loading: false,
      pwned: false,
      count: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.password) {
      this.setState({
        initial: true
      })
    } else if (nextProps.password !== this.props.password) {
      this.checkPassword(nextProps.password)
    }
  }
  checkPassword(password) {
    console.log(password)
    const hash = sha1(password).toUpperCase()

    const prefix = hash.substr(0, HASH_PREFIX_LENGTH)
    const suffix = hash.substr(HASH_PREFIX_LENGTH)

    this.setState({
      initial: false,
      loading: true,
      pwned: false,
      error: null
    })
    pwnedPasswordRange(prefix)
      .then(results => {
        const result = results.find(result => result.suffix === suffix)
        this.setState({
          pwned: !!result,
          count: result ? result.count : 0,
          loading: false,
          error: null
        })
      })
      .catch(e => {
        this.setState({
          loading: false,
          error: e
        })
      })
  }
  render() {
    const { initial, loading, error, pwned, count } = this.state
    return this.props.children({
      initial,
      loading,
      error,
      pwned,
      count
    })
  }
}