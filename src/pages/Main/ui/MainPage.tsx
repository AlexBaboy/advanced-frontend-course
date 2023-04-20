import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {BugButton} from "app/providers/ErrorBoundary";
import Input from "shared/ui/Input/Input";

const MainPage = () => {

    const {t} = useTranslation('main')
    const [value, setValue] = useState('')

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <div>
            {t('Главная')}
            <div>
                <BugButton />
                <Input onChange={onChange} value={value} />
            </div>
        </div>
    );
};

export default MainPage;
