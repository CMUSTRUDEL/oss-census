import React, { useState } from "react";

import { Tabs } from "antd";

export default function TabContainer({
    labels,
    children
}) {
    const [activeTab, setActiveTab] = useState(0);
    const items = children.map((child, index) => {return {
        key: index,
        label: labels[index],
        children: child,
    }})
    return (
        <Tabs activeKey={activeTab} items={items} onChange={key => setActiveTab(key)} />
    );
}