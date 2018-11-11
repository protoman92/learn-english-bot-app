import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { TabProps } from '@material-ui/core/Tab';
import { TabsProps } from '@material-ui/core/Tabs';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ComponentType } from 'react';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';
import { onlyUpdateForKeys, shouldUpdate } from 'recompose';

// tslint:disable-next-line
const deepEqual = require('deep-equal');

export const MIN_TABLE_ROWS_PER_PAGE = 5;

export namespace TextFieldFont {
  export const body1 = '0.875rem';
}

export function onlyUpdateForPropKeys<P>(
  keys: Array<keyof P>
): (component: ComponentType<P>) => ComponentType<P> {
  return component => onlyUpdateForKeys(keys)(component) as ComponentType<P>;
}

export function onlyUpdateWhenDeepEqual<P>() {
  return shouldUpdate<P>((p1, p2) => {
    for (const key of Object.keys(p1)) {
      if (p1[key] instanceof Function || p2[key] instanceof Function) {
        continue;
      }

      if (!deepEqual(p1[key], p2[key])) {
        return true;
      }
    }

    return false;
  });
}

export function neverUpdate<P>() {
  return shouldUpdate<P>(() => false);
}

export const MinimalTextField = onlyUpdateForPropKeys<TextFieldProps>([
  'value'
])(TextField);

export const MinimalTabs = onlyUpdateForPropKeys<TabsProps>(['value'])(Tabs);
export const MinimalTab = onlyUpdateForPropKeys<TabProps>(['selected'])(Tab);

export const MinimalSwipeableViews = onlyUpdateForKeys<SwipeableViewsProps>([
  'index'
])(SwipeableViews);

export const StaticButton = neverUpdate()(Button);
export const StaticCircularProgress = neverUpdate()(CircularProgress);
export const StaticDivider = neverUpdate()(Divider);
export const StaticIconButton = neverUpdate()(IconButton);
export const StaticMenuItem = neverUpdate()(MenuItem);
export const StaticTypography = neverUpdate()(Typography);
