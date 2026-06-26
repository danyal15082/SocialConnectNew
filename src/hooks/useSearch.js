import {useState, useMemo} from 'react';

const useSearch = users => {
  const [searchText, setSearchText] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchText.trim()) {
      return users;
    }

    return users.filter(user =>
      user.user
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [searchText, users]);

  return {
    searchText,
    setSearchText,
    filteredUsers,
  };
};

export default useSearch;