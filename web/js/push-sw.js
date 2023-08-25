
self.addEventListener('push', function(event) {
    const nInfo = getNotificationInfo(event.data.json());
    const promise = self.registration.showNotification(nInfo.title, {
        body: nInfo.body,
        tag: "lsdsoftware",
    })
    event.waitUntil(promise);
})

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Android needs explicit close.
    const promise = clients.openWindow('https://www.lsdsoftware.com/');
    event.waitUntil(promise);
})


function getNotificationInfo(message) {
    if (message.type == "alert") {
        return {
            title: "Alert",
            body: message.data
        };
    }
    else {
        return {
            title: message.type || "Unknown",
            body: JSON.stringify(message.data || message)
        };
    }
}
