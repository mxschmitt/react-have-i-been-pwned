# React Have I Been Pwned

[![npm](https://img.shields.io/npm/v/react-have-i-been-pwned.svg)](https://www.npmjs.com/package/react-have-i-been-pwned)

> React component which validates a password on the client side by the [Have I Been Pwned API](https://haveibeenpwned.com) by Troy Hunt.

## Example

There is also an interactive example available on [codesandbox](https://codesandbox.io/s/myo149oxw8).

```jsx
<HIBPPasswordChecker password={this.state.password}>
{({ initial, loading, error, pwned, count }) => {
    if (initial) return null;
    if (loading) return 'Checking the security of this password...';
    if (error) return `error: ${error}`;
    if (!pwned)
    return (
        <>
        This password is safe to use and appeared in no data
        breaches.{' '}
        <a
            href="https://haveibeenpwned.com/FAQs#DataSource"
            rel="noopener noreferrer"
            target="_blank"
        >
            Learn more
        </a>
        </>
    );
    if (pwned)
    return (
        <>
        <strong>This password isn't safe to use</strong> and
        appeared in {count.toLocaleString()} data breaches. You can still use it, but
        you probably shouldn't.{' '}
        <a
            href="https://haveibeenpwned.com/FAQs#DataSource"
            rel="noopener noreferrer"
            target="_blank"
        >
            Learn more
        </a>
        .
        </>
    );
}}
</HIBPPasswordChecker>
````
