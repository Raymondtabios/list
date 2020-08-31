import React, { useState } from 'react';
import { 
  StyleSheet,  
  View,  
  Button,  
  FlatList 
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle } 
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler= goalid => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalid);
    });
  }
  
  const cancelGoal = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput 
        visible={isAddMode} 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoal}
      />
      <FlatList // for long list
        keyExtractor={(item, index) => item.id} //id and key same
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
 screen: {
  padding: 50 
 },
});
