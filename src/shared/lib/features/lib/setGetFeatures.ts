import { FeatureFlags } from '@/shared/types/featureFlags';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    LOCAL_STORAGE_THEME_KEY,
} from '@/shared/const/localStorage';

let featureFlags: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
};

export const getFeatureFlags = (flag: keyof FeatureFlags) => {
    return featureFlags[flag];
};

export const getAllFeatureFlags = () => {
    return featureFlags;
};
