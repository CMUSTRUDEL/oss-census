import React from "react";

import {Row, Col, Typography, Divider } from "antd";

import "./ColumnComparison.css";

export default function ColumnComparison({
    title,
    metrics
}) {
    return (
    <>
        <Row className="comparison-title">
            <Col span={11}>
                <Typography.Title level={4}>{title[0]}</Typography.Title>
                <Divider style={{margin: "4px 0"}}/>
            </Col>
            <Col span={11} offset={2}>
                <Typography.Title level={4}>{title[1]}</Typography.Title>
                <Divider style={{margin: "4px 0"}}/>
            </Col>
        </Row>
        {
            metrics.map((metric, index) => 
            <>
            <Row className={`comparison-metric-${metric}`}>
                <Col span={11}>
                    <Typography.Title level={4}>
                        {metric.metric}
                    </Typography.Title>
                </Col>
            </Row>
            <Row className={`comparison-metric-${metric}-value`}>
            <Col span={11}>
                <Typography.Text>{metric.value[0]}</Typography.Text>
            </Col>
            <Col span={11} offset={2}>
                <Typography.Text>{metric.value[1]}</Typography.Text>
            </Col>
            </Row>
            </>
            )
        }
    </>
    )
}