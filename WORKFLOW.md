# AI Development Workflow Comparison

## Feature
Contact form for cybersecurity portfolio website.

## Round One

**Prompt:**
"Create a contact form for my website."

**Results:**
- Generated basic HTML form with email, name, and message fields
- Minimal styling with inline CSS
- No validation or error handling
- Form submission sent data without sanitization
- No accessibility attributes
- No loading states or user feedback
- Security vulnerability: XSS risk from unvalidated input display
- No test coverage

## Round Two

**Prompt:**
"Create a contact form for my cybersecurity portfolio website with:
- React Hook Form with Zod schema validation
- Email, name, message, and subject fields
- Real-time validation feedback
- Submit button with loading state and success/error messages
- ARIA labels and keyboard navigation support
- Rate limiting to prevent abuse
- Input sanitization and CSRF protection
- Unit tests for form submission and validation
- Mobile-responsive design
- Error boundary wrapper"

**Results:**
- Implemented with React Hook Form + Zod validation schema
- Real-time field validation with error messages
- Accessible form with proper ARIA labels and semantic HTML
- Keyboard navigation fully supported (Tab, Enter, Escape)
- Loading state with disabled submit button
- Success/error toast notifications
- Input sanitization using DOMPurify
- Rate limiting on submission (max 1 request per 30 seconds)
- CSRF token validation
- Comprehensive test suite (11 tests covering validation, submission, edge cases)
- Mobile-responsive grid layout
- Error boundary for graceful failure handling

## Differences

**Specific code differences:**
- **Validation:** Round One had none; Round Two uses Zod schema with real-time feedback
- **Security:** Round One vulnerable to XSS; Round Two sanitizes and validates all inputs
- **Accessibility:** Round One lacked ARIA labels; Round Two fully accessible with keyboard support
- **User Experience:** Round One no feedback; Round Two includes loading states and notifications
- **Testing:** Round One untested; Round Two includes comprehensive unit tests
- **Performance:** Round One sends data immediately; Round Two implements rate limiting
- **Error Handling:** Round One silent failures; Round Two displays user-friendly error messages

## AI Mistakes Found

During review I discovered:
- **Security Gap:** Initial implementation didn't sanitize user input before display, creating XSS vulnerability
- **Accessibility Oversight:** Missing `htmlFor` attribute on form labels, breaking screen reader association
- **Rate Limiting Logic:** First attempt used client-side only; needed backend validation
- **Error Messages:** Generic error text without actionable guidance for users
- **Mobile Testing:** Form fields didn't properly stack on small screens

## Lessons Learned

1. **Vague prompts produce incomplete solutions** — Detailed specifications dramatically improve output quality and security
2. **Security requires explicit specification** — Don't assume AI will implement sanitization without mentioning it
3. **Accessibility isn't automatic** — Must specify ARIA labels, keyboard navigation, and semantic HTML
4. **Testing should be required, not optional** — Include test expectations in the prompt
5. **UI/UX feedback matters** — Users need loading states, success messages, and validation feedback
6. **Review outputs critically** — Always audit for security, accessibility, and edge cases

---

# Project Rules

## Forms
- All forms must use React Hook Form for state management
- Implement Zod schema validation for runtime type safety
- Include real-time validation feedback with error messages
- Never submit unvalidated or unsanitized data
- Implement rate limiting on form submission (minimum 1 request per 30 seconds)

## Accessibility
- Every interactive element must have keyboard support (Tab navigation, Enter to submit, Escape to cancel)
- Use proper semantic HTML (`<button>`, `<input>`, `<label>`, `<form>`)
- Include ARIA labels (`aria-label`, `aria-describedby`) for all form inputs
- Ensure color contrast meets WCAG AA standards (4.5:1 for text)
- Test with screen readers (NVDA, JAWS, VoiceOver)

## Security
- Never display user input without validation or sanitization
- Use DOMPurify or equivalent library to sanitize HTML input
- Implement CSRF token validation on backend
- Hash sensitive data (passwords, tokens) using bcrypt or Argon2
- Use HTTPS for all form submissions
- Implement rate limiting to prevent abuse and spam
- Validate on both client and server side

## Testing
- Before completing a feature, verify normal cases and edge cases
- Write unit tests for validation logic (valid input, invalid input, edge cases)
- Test accessibility with keyboard navigation and screen readers
- Test form submission with network delays and failures
- Test security with XSS/injection attempts
- Achieve minimum 80% code coverage for form components
- Include tests for loading states, error states, and success states
