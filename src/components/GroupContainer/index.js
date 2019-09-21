import React, { useState, useEffect }from 'react';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { GroupCard } from '../GroupCard';


export const GroupContainer = () => {
  const [groups, setGroups ] = useState({groups: []});
  useEffect(() => {
    const groupsQuery = gql.getGroups();
    const fetchGroups = async () => {
      const { getGroups: groups } = await fetchData(groupsQuery);
      setGroups(groups);
    }
    fetchGroups();
  }, []);
  
    return (
      <div className='GroupContainer'>
        {groups.length && groups.map(group => <GroupCard key={group.id} {...group} />)}
        {!groups.length && (
          <div>
            Create some Groups!
          </div>
        )}
      </div>
    )
};

export default GroupContainer;
