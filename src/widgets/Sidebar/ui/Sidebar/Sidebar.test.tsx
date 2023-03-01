import {fireEvent, screen} from "@testing-library/react";
import {Sidebar} from "./Sidebar";
import {renderWithTranslation} from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe('Sidebar', () => {
    test('render', () => {
        renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId('sidebar'))
            .toBeInTheDocument()
        screen.debug()
    })
    test('button', () => {
        renderWithTranslation(<Sidebar/>)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar'))
            .toHaveClass('collapsed')
    })
})
