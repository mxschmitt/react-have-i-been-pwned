# react have i been pwned component

## Example

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
        appeared in {count} data breaches. You can still use it, but
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