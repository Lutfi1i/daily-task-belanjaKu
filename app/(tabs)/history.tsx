import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { deleteTask, getTasks, recoverTask } from '../../services/taskService';
import { Task } from '../../types/task';

export default function HistoryScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = () => {
    setTasks(getTasks(false)); 
  };

  const handleRecover = (id: number) => {
    recoverTask(id);
    loadData();
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task permanently?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", onPress: () => {
            deleteTask(id);
            loadData();
          }, style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={[styles.taskTitle, { textDecorationLine: 'line-through' }]}>{item.title}</Text>
          <Text style={styles.taskDesc}>{item.description}</Text>
        </View>
        <IconButton icon="restore" size={24} onPress={() => handleRecover(item.id)} />
        <IconButton icon="delete" size={24} iconColor="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>History</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No finished tasks yet.</Text>}
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
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    color: '#888',
  },
  taskDesc: {
    fontSize: 14,
    color: '#aaa',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#aaa',
    fontSize: 16
  }
});
