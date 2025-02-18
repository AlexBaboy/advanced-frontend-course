import {rtkApi} from '@/shared/api/rtkApi';
import {User} from '@/entities/User';
import {JsonSettings} from '@/entities/User/model/types/jsonSettings';
import {FeatureFlags} from "@/shared/types/featureFlags";

interface UpdateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<User, UpdateFeatureFlagsOptions>({
            query: ({userId, features}) => ({
                url: '/users/' + userId,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutation =
    featureFlagsApi.endpoints.updateFeatureFlags.initiate;

