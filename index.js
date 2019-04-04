import sha1 from 'sha1'
import React, { Component } from 'react'

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
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setTimeout(() => {
        this.checkPassword(nextProps.password)
      }, 200)
    }
  }
  checkPassword(password) {
    const hash = sha1(password).toUpperCase()

    const prefix = hash.substr(0, HASH_PREFIX_LENGTH)
    const suffix = hash.substr(HASH_PREFIX_LENGTH)

    this.setState({
      initial: false,
      loading: true,
      pwned: false,
      error: null
    })

    fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        Accept: "application/vnd.haveibeenpwned.v2+json"
      }
    })
      .then(resp => resp.ok ? resp.text() : Promise.reject(resp.text()))
      .then(resp => resp.split('\n')
        .map(entry => {
          const [suffix, count] = entry.split(":")
          return {
            suffix,
            count: parseInt(count, 10)
          }
        }))
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