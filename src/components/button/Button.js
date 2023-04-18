import React from "react";
import { Button } from 'antd';

export default function Header(props) {
  return (
    <Button>{props.text}</Button>
  );
}
