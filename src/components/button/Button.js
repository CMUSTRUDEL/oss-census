import React from "react";
import { Button } from 'antd';

import "./Button.css";

export function LinkButton(props) {
  return (
    <Button type="text" className="link-button" href={props.href}>
      {props.children}
    </Button>
  );
}
