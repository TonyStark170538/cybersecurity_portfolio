# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio or its codebase, please report it responsibly. **Do not** open a public GitHub issue for security vulnerabilities.

Instead, please email your findings to: `security@example.com`

Include the following information:

- **Description**: A clear description of the vulnerability
- **Location**: The specific file, line number, or component affected
- **Impact**: Potential impact of the vulnerability (e.g., data exposure, code execution)
- **Proof of Concept**: Steps to reproduce the vulnerability (if applicable)
- **Suggested Fix**: Any recommendations for fixing the issue (optional)

## Security Practices

This portfolio demonstrates several security best practices:

### 1. Input Validation & Sanitization

All user inputs are validated and sanitized to prevent injection attacks:

```typescript
// Example: Validating email input
const emailSchema = z.string().email();
const validEmail = emailSchema.parse(userInput);
```

### 2. Secrets Management

- No API keys, credentials, or secrets are committed to the repository
- Environment variables are used for sensitive configuration
- `.gitignore` excludes `.env`, `.env.local`, and other sensitive files

### 3. Dependency Security

- Dependencies are regularly audited using `npm audit`
- Vulnerable packages are updated promptly
- Lock files (`pnpm-lock.yaml`) ensure reproducible builds

### 4. Content Security Policy (CSP)

The site implements CSP headers to prevent:

- Cross-Site Scripting (XSS) attacks
- Clickjacking attacks
- MIME type sniffing
- Insecure resource loading

### 5. HTTPS & Transport Security

- All traffic is encrypted with TLS 1.3
- HSTS headers enforce HTTPS-only connections
- Certificate pinning (where applicable)

### 6. Authentication & Authorization

- No sensitive data is stored in localStorage
- Session tokens are HttpOnly and Secure
- CSRF tokens are used for state-changing operations

### 7. Code Review & Testing

- All code changes are reviewed for security implications
- Security-focused testing is performed before deployment
- Automated security scanning is integrated into the CI/CD pipeline

## Known Limitations

- This is a static portfolio with no backend database
- No user authentication is implemented (not required for this use case)
- Third-party dependencies may have vulnerabilities; see `npm audit` for details

## Security Headers

The portfolio includes the following security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Enables XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | Restrictive | Limits browser APIs |

## Compliance

This portfolio follows security standards and best practices:

- **OWASP Top 10**: Addresses common web vulnerabilities
- **CWE/SANS Top 25**: Follows recommendations for secure coding
- **WCAG 2.1**: Ensures accessibility alongside security

## Updates & Patches

- Security updates are applied promptly
- Critical vulnerabilities are patched immediately
- Regular dependency updates are performed
- Security advisories are monitored and acted upon

## Questions?

If you have questions about the security practices in this portfolio, please reach out to `security@example.com`.

---

**Last Updated**: 2026-01-18

**Version**: 1.0
