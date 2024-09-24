import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const isAbsolute = (value: string) => {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
};

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);
const componentDirs = sharedUiDirectory?.getDirectories();

componentDirs?.forEach((dir) => {
    const indexFilePath = `${dir.getPath()}./index.ts`;
    const indexFile = dir.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from ./${dir.getBaseName()}`;
        const file = dir.createSourceFile(indexFilePath, sourceCode, { overwrite: true });
        file.save();
    }
});

/* files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
}); */

project.save();
