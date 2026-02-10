import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {

  return (


    <NativeTabs>
      <NativeTabs.Trigger name='index'>
        <Label>Task</Label>
        <Icon sf={"house.fill"} drawable='ic_menu_agenda' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='history'>
        <Label>Riwayat</Label>
        <Icon sf={"house.fill"} drawable='ic_menu_recent_history' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='profile'>
        <Label>Profile</Label>
        <Icon sf={"person.fill"} drawable='	ic_menu_view' />
      </NativeTabs.Trigger>
    </NativeTabs>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Task',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="history"
    //     options={{
    //       title: 'Riwayat',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.badge.checkmark" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: 'Profile',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name='person.fill' color={color} />,
    //     }}
    //   />
    // </Tabs>
  )
}
