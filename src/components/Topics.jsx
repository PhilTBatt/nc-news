import { useState } from "react";
import { FancyBox } from "./FancyBox";

export function Topics({setSearchParams}) {
    const topics = ['Coding', 'Football', 'Cooking']

    return (
        <FancyBox>
            Topic:
            <select id="topics" onChange={event => setSearchParams({topic: event.target.value.toLowerCase()})}>
                <option value=''>
                    Select a Topic
                </option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                ))}
            </select>
        </FancyBox>
    )
}