"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // Assuming your firebase init is in lib/firebase.ts or similar
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    // Replace 'placeholder_user_id' with the actual authenticated user's ID
    const userId = 'placeholder_user_id'; 
    const notificationsCollection = collection(db, 'notifications');
    const q = query(
      notificationsCollection,
      // where('userId', '==', userId), // This will be needed when you have user auth
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notificationsData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [db]);

  const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return 'Just now';
    return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Notifications</h1>
        <p className="text-muted-foreground">Your recent account activity.</p>
      </div>
      <div className="grid gap-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Card key={notification.id} className="p-4">
              <p className="font-semibold">{notification.message}</p>
              <p className="text-sm text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">You have no new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
