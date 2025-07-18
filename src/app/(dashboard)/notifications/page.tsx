import React from 'react';

const NotificationsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <p>This is where your notifications will be displayed.</p>
      {/* Placeholder for notification list */}
      {/* <div className="grid gap-4">
        {/* Example notification item }
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold">New Order</h2>
          <p className="text-gray-600">You have a new order from John Doe.</p>
          <p className="text-sm text-gray-500">2 minutes ago</p>
        </div>
        {/* Add more placeholder notifications here }
      </div> */}
    </div>
  );
};

export default NotificationsPage;