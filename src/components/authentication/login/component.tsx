import { Card, CardContent, Typography } from '@material-ui/core';
import { FacebookLoginButton } from 'components/utils';
import * as React from 'react';
import { compose } from 'recompose';
import './style.scss';

function LoginContainer() {
  return (
    <div className="login-container">
      <Card>
        <CardContent className="login-content">
          <Typography variant="title">Login</Typography>

          <div className="button-group">
            <FacebookLoginButton>
              <Typography
                className="facebook-text login-text"
                align="center"
                variant="button"
              >
                Login to Facebook
              </Typography>
            </FacebookLoginButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default compose()(LoginContainer);
