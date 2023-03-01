import {render, screen} from "@testing-library/react";
import {Button, ThemeButton} from "shared/ui/Button/Button";

describe('Button', () => {
    test('render', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST'))
            .toBeInTheDocument()
    })
    test('with class clear', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass('clear')
        screen.debug()
    })
})
