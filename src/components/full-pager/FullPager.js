import React from "react";

import { Button, Col, Layout, Row, Typography } from "antd";

import { DownOutlined } from "@ant-design/icons";

import "./FullPager.css";

export default function FullPager(props) {
    return (
        <Layout className="full-pager">
            <Row className="full-paper-text-container" >
                <Col span={12} offset={1}>
                    <Typography.Title level={1}>{props.title}</Typography.Title>
                    <Typography.Title level={2}>{props.subtitle}</Typography.Title>
                    <Typography.Text>{props.description}</Typography.Text>
                    <br />
                    <Button type="primary" shape="round">
                        {props.button}
                    </Button>
                </Col>
            </Row>
            <Button type="text" onClick={() => {window.scrollTo(0, document.documentElement.clientHeight - 65)}}>
                <DownOutlined />
            </Button>
        </Layout>   
    )
}