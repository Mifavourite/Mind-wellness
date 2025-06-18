import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, Heart, Calendar, TrendingUp, Award, Target, ChevronRight } from 'lucide-react-native';

const achievements = [
  { id: 1, name: 'First Entry', description: 'Logged your first mood', earned: true, color: '#10B981' },
  { id: 2, name: '7-Day Streak', description: 'Consistent tracking for a week', earned: true, color: '#6366F1' },
  { id: 3, name: 'Mindful Moment', description: 'Completed first meditation', earned: true, color: '#8B5CF6' },
  { id: 4, name: '30-Day Journey', description: 'One month of wellness tracking', earned: false, color: '#F59E0B' },
  { id: 5, name: 'Reflection Master', description: 'Written 10 journal entries', earned: false, color: '#EF4444' },
];

const menuItems = [
  { icon: Settings, label: 'Settings', description: 'App preferences' },
  { icon: Bell, label: 'Notifications', description: 'Reminder settings' },
  { icon: Shield, label: 'Privacy', description: 'Data & security' },
  { icon: Target, label: 'Goals', description: 'Set wellness targets' },
  { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
];

export default function ProfileTab() {
  const userStats = {
    totalEntries: 24,
    currentStreak: 5,
    longestStreak: 12,
    meditationMinutes: 180,
    journalEntries: 8,
    averageMood: 3.8,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Track your wellness journey</Text>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <User size={32} color="#6366F1" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Welcome back!</Text>
              <Text style={styles.userSubtitle}>You've been taking care of yourself for {userStats.currentStreak} days</Text>
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Wellness Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#6366F1' + '20' }]}>
                <Heart size={20} color="#6366F1" />
              </View>
              <Text style={styles.statValue}>{userStats.totalEntries}</Text>
              <Text style={styles.statLabel}>Total Entries</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#10B981' + '20' }]}>
                <TrendingUp size={20} color="#10B981" />
              </View>
              <Text style={styles.statValue}>{userStats.currentStreak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
                <Calendar size={20} color="#8B5CF6" />
              </View>
              <Text style={styles.statValue}>{userStats.meditationMinutes}</Text>
              <Text style={styles.statLabel}>Minutes Meditated</Text>
            </View>
          </View>

          <View style={styles.additionalStats}>
            <View style={styles.additionalStat}>
              <Text style={styles.additionalStatLabel}>Longest Streak</Text>
              <Text style={styles.additionalStatValue}>{userStats.longestStreak} days</Text>
            </View>
            <View style={styles.additionalStat}>
              <Text style={styles.additionalStatLabel}>Journal Entries</Text>
              <Text style={styles.additionalStatValue}>{userStats.journalEntries}</Text>
            </View>
            <View style={styles.additionalStat}>
              <Text style={styles.additionalStatLabel}>Average Mood</Text>
              <Text style={styles.additionalStatValue}>{userStats.averageMood}/5</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  !achievement.earned && styles.achievementCardLocked
                ]}
              >
                <View 
                  style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.earned ? achievement.color + '20' : '#F3F4F6' }
                  ]}
                >
                  <Award 
                    size={20} 
                    color={achievement.earned ? achievement.color : '#9CA3AF'} 
                  />
                </View>
                <Text 
                  style={[
                    styles.achievementName,
                    !achievement.earned && styles.achievementNameLocked
                  ]}
                >
                  {achievement.name}
                </Text>
                <Text 
                  style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.achievementDescriptionLocked
                  ]}
                >
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <item.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View style={styles.section}>
          <View style={styles.versionCard}>
            <Text style={styles.versionText}>MindSpace v1.0.0</Text>
            <Text style={styles.versionSubtext}>Your wellness companion</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366F1' + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  additionalStats: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  additionalStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  additionalStatLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  additionalStatValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: '#D1D5DB',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  versionCard: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
  },
});