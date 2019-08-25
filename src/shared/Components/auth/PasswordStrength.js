import React from 'react'
import { FadeIn } from '../../Elements'
import { Alert } from 'reactstrap'

export default function PasswordStrength(props) {
  const { weak, better, great } = props
  return (
    <div className="mb-3">
      <FadeIn show={weak || better || great}>
        <Alert
          color={great ? 'success' : better ? 'info' : 'warning'}
          style={{
            fontWeight: '500',
            fontSize: '1rem',
            padding: '0.1rem',
            marginBottom: '0',
            marginTop: '0'
          }}
          className="text-danger"
        >
          {weak && (
            <div>
              <span style={{ fontWeight: '700' }}>yeah, that's good enough..</span><br />
              you should think of choosing a better password <br />
              (add characters/number/symbols etc.) 
            </div>
          )}
          {better && (
            <div>
              <span style={{ fontWeight: '700' }}>That's much better!</span> <br />
              you can add special characters to make it even better
            </div>
          )}
          {great && (
            <div
              style={{
                fontWeight: '700'
              }}
              className="text-capitalize mt-2 p-1"
            >
              great password!
            </div>
          )}
        </Alert>
      </FadeIn>
    </div>
  )
}
