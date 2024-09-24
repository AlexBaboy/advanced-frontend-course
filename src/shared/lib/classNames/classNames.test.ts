import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass'))
            .toBe('someClass');
    });
    test('with additional class', () => {
        const expected = 'someClass class1 class2';
        expect(classNames(
            'someClass',
            {},
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
    test('with mods', () => {
        const expected = 'someClass hovered scrollable'
                            + ' class1 class2';
        expect(classNames(
            'someClass',
            { hovered: true, scrollable: true },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
    test('with mods false', () => {
        const expected = 'someClass class1 class2';
        expect(classNames(
            'someClass',
            { hovered: false, scrollable: false },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
    test('with one mod false', () => {
        const expected = 'someClass hovered'
            + ' class1 class2';
        expect(classNames(
            'someClass',
            { hovered: true, scrollable: false },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
    test('with one mod undefined', () => {
        const expected = 'someClass scrollable'
            + ' class1 class2';
        expect(classNames(
            'someClass',
            { hovered: undefined, scrollable: true },
            ['class1', 'class2'],
        ))
            .toBe(expected);
    });
});
