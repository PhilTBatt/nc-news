import { FancyBox } from "./FancyBox";
import { Navigation } from "./Navigation";

export function Header() {
    return (
        <FancyBox id="header-box">
            <header>
                <h1>
                    NC News
                </h1>
                <Navigation/>
            </header>
        </FancyBox>
    )
}