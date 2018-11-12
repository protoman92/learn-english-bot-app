import { Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';
import { compose } from 'recompose';
import './style.scss';

function LoginContainer() {
  return (
    <div className="login-container">
      <Card>
        <CardContent>
          <Typography variant="title">Login</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default compose()(LoginContainer);
