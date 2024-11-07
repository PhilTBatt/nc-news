import { FancyBox } from "./FancyBox";

export function FilterBar({setSearchParams}) {
    const topics = ['Coding', 'Football', 'Cooking']

    return (
        <FancyBox id="filter-bar">
            Topic:
            <select id="topic" onChange={event => setSearchParams(params => {
                params.set('topic', event.target.value.toLowerCase())
                return params
                })}>
                <option value=''>
                    Select a Topic
                </option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                ))}
            </select>
            Sort By:
            <select id="aort-by" onChange={event => setSearchParams(params => {
                const newParams = new URLSearchParams(params)
                newParams.set('sort_by', event.target.value)
                return newParams
                })}>
                <option value='created_at'>
                    Date
                </option>
                <option value='votes'>
                    Likes
                </option>
                <option value='title'>
                    Title
                </option>
                <option value='author'>
                    Author
                </option>
                <option value='comment_count'>
                    Comments
                </option>
            </select>
            Order By:
            <select id="order" onChange={event => setSearchParams(params => {
                const newParams = new URLSearchParams(params)
                event.target.value === 'ASC' ? newParams.set('order', event.target.value) : newParams.delete('order')
                return newParams
                })}>
                <option value=''>
                    Descending
                </option>
                <option value='ASC'>{'Ascending'}</option>
            </select>
        </FancyBox>
    )
}