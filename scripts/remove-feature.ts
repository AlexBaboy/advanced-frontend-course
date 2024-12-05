import { Node, Project, SyntaxKind } from 'ts-morph';

const TOGGLE_FUNCTION_NAME = 'toggleFeatures';
const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
    throw new Error(`Could not remove feature without name!`);
}

if (!featureState) {
    throw new Error(`Could not remove feature without state (on / off)!`);
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error(`Unknown state of feature flag! Should be (on / off)!`);
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === TOGGLE_FUNCTION_NAME
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
};

files.forEach((file) => {
    file.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            );

            if (!objectOptions) return;

            const onFunctionProperty = objectOptions.getProperty('on');
            const offFunctionProperty = objectOptions.getProperty('off');
            const featureNameProperty = objectOptions.getProperty('name');

            const onFunction = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );

            const offFunction = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.ArrowFunction,
            );

            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                ?.slice(1, -1);

            if (featureName !== removedFeatureName) return;

            if (featureState === 'on') {
                node.replaceWithText(onFunction?.getBody()?.getText() ?? '');
            }

            if (featureState === 'off') {
                node.replaceWithText(offFunction?.getBody()?.getText() ?? '');
            }
        }
    });
});

project.save();