

import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
    // Get the userId param from the URL.
    let { userId } = useParams();
    console.log(userId);
    // ...
}

function OrderProduct() {
    return (
        <Routes>
            <Route path="users">
                <Route path=":userId" element={<ProfilePage />} />
                {/* <Route path="me" element={...} /> */}
            </Route>
        </Routes>
    );
}

export default OrderProduct