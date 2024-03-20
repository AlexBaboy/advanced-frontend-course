import {fireEvent, screen} from "@testing-library/react";
import {Sidebar} from "./Sidebar";
import {componentRender} from "shared/lib/tests/componentRender/componentRender";

describe('Sidebar', () => {
    test('render', () => {
        componentRender(<Sidebar/>)
        expect(screen.getByTestId('sidebar'))
            .toBeInTheDocument()
        screen.debug()
    })
    test('test toggle', () => {
        componentRender(<Sidebar/>)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar'))
            .toHaveClass('collapsed')
    })
})
