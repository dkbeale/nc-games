import React from 'react';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../context/Auth';

const AllUsers = () => {

    const { user } = useContext(UserContext);


    if (!user) {
        return (
          <section>
            <div class="box">Please Sign In</div>
          </section>
        );
    }

    return (
        <section>
            
        </section>
    );
};

export default AllUsers;