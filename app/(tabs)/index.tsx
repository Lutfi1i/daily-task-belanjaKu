import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, FAB, IconButton, Portal, Searchbar, Text, TextInput } from 'react-native-paper';
import { addTask, getTasks, toggleTaskStatus, updateTask } from '../../services/taskService';
import { getUser } from '../../services/userService';
import { Task } from '../../types/task';
import { User } from '../../types/user';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    const currentUser = getUser();
    if (!currentUser) {
      router.replace('/onboarding');
      return;
    }
    setUser(currentUser);
    const allTasks = getTasks(true);
    setTasks(allTasks);
    setFilteredTasks(allTasks);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setTaskTitle('');
    setTaskDescription('');
    setEditingTaskId(null);
  };

  const handleSaveTask = () => {
    if (editingTaskId) {
      updateTask(editingTaskId, taskTitle, taskDescription);
    } else {
      addTask(taskTitle, taskDescription);
    }
    loadData();
    hideDialog();
    setSearchQuery('');
  };

  const handleEditTask = (task: Task) => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setEditingTaskId(task.id);
    showDialog();
  };

  const handleCheckTask = (task: Task) => {
    toggleTaskStatus(task.id, true);
    loadData();
    setSearchQuery('');
  }


  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => handleCheckTask(item)}>
          <IconButton icon={item.isFinished ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"} size={24} iconColor={item.isFinished ? "green" : "grey"} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDesc}>{item.description}</Text>
        </View>
        <IconButton icon="pencil" size={20} onPress={() => handleEditTask(item)} />
      </View>
    </View>
  );

  const getInitials = (n: string) =>
    n.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.greetingSmall}>Selamat datang 👋</Text>
            <Text variant="headlineSmall" style={styles.greetingName}>{user?.name}</Text>
          </View>
          {user?.image ? (
            <Image source={{ uri: user.image }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarInitials}>
                {user?.name ? getInitials(user.name) : '?'}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Searchbar
        placeholder="Search tasks..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No active tasks found.</Text>}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: 'white' }}>
          <Dialog.Title>{editingTaskId ? 'Edit Task' : 'Add New Task'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={taskTitle}
              onChangeText={setTaskTitle}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={taskDescription}
              onChangeText={setTaskDescription}
              mode="outlined"
              style={styles.input}
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleSaveTask}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  greetingSmall: {
    fontSize: 13,
    color: '#aaa',
  },
  greetingName: {
    fontWeight: 'bold',
    color: '#111',
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0aafff',
    marginLeft: 12,
  },
  headerAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0aafff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerAvatarInitials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0'
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#eee'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDesc: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0aafff',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#aaa',
    fontSize: 16
  }
});
