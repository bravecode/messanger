import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserAvatar } from '_components/user/UserAvatar';
import { IStore } from '_store';
import { getRelationshipsRequest } from '_store/ducks/relationship/actions';

const Friends: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRelationshipsRequest())
    }, []);

    const { friends, pending } = useSelector((store: IStore) => store.relationship);

    return (
        <div className="grid gap-4">
            {
                friends.map((friend) =>
                    <div className="flex items-center">
                        <UserAvatar />
                        <div className="px-4">
                            <div className="text-black text-sm text-bold mb-0.5">
                                Krzysztof Szymański
                            </div>
                            <div className="text-gray-500 text-xs">
                                { friend.userID }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export { Friends }