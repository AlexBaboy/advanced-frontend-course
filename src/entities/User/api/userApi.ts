import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/entities/User';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

interface SetJsonSettingsProps {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsProps>({
            query: ({ userId, jsonSettings }) => ({
                url: '/users' + userId,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;
