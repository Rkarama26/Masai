import { Box, Button, Text, VStack, Input, HStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { NotificationContext } from './NotificationProvider ';

const NotificationList = () => {
  const { notifications, addNotification, markAllAsRead, stopNotifications } = useContext(NotificationContext);
  const [customMessage, setCustomMessage] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAddCustom = () => {
    if (customMessage.trim() === '') return;
    addNotification(customMessage.trim());
    setCustomMessage(''); // Clear input
  };

  return (
    <Box p="4" maxW="400px" mx="auto" mt="10">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Notifications ({unreadCount} unread)
      </Text>

      {/* Manual Add Notification */}
      <HStack mb="4">
        <Input
          placeholder="Type a notification"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
        />
        <Button onClick={handleAddCustom} colorScheme="blue">
          Add
        </Button>
      </HStack>

      <VStack align="start" spacing={2} maxH="300px" overflowY="auto">
        {notifications.map((n) => (
          <Text
            key={n.id}
            fontWeight={n.read ? 'normal' : 'bold'}
            bg={n.read ? 'transparent' : 'yellow.100'}
            p={2}
            borderRadius="md"
            w="100%"
          >
            {n.message}
          </Text>
        ))}
      </VStack>

      <Box mt="4">
        <Button size="sm" onClick={markAllAsRead} mr="2">
          Mark All as Read
        </Button>
        <Button size="sm" onClick={stopNotifications}>
          Stop Notifications
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationList;
