import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getRelationshipsRequest } from '_store/ducks/relationship/actions';

// Components
import { Profile } from './Profile/Profile';
import { Requests } from './Requests/Requests';
import { Search } from './Search/Search';
import { Friends } from './Friends/Friends';

export type TSideView = 'default' | 'requests' | 'search';

const Side: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRelationshipsRequest());
    }, [dispatch]);

    useEffect(() => {
        
    }, [dispatch]);

    // Side View Management
    const [view, setView] = useState<TSideView>('default');

    const handleRequestsViewSet = () => {
        if (view === 'requests') {
            setView('default');

            return;
        }

        setView('requests');
    }

    const handleSearchViewSet = (value: boolean) => {
        if (view === 'search' && !value) {
            setView('default');

            return;
        }

        setView('search');
    }

    // Helpers
    const renderSearch = () => {
        if (view === 'requests') {
            return null;
        }
    
        return <Search onSearchToggle={handleSearchViewSet} />
    }

    const renderFriends = () => {
        if (view === 'default') {
            return <Friends />;
        }

        return null;
    }

    const renderRequests = () => {
        if (view === 'default') {
            return <Requests onExpandToggle={handleRequestsViewSet} />;
        }

        if (view === 'requests') {
            return <Requests onExpandToggle={handleRequestsViewSet} expanded />;
        }

        return null;
    }

    return (
        <div className="w-64 h-full py-5 bg-custom-gray-lightest flex-shrink-0 relative border-r border-custom-gray-light">

            <Profile />

            { renderSearch() }
            
            { renderFriends() }

            { renderRequests() }

        </div>
    );
}

export { Side }