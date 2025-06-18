import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  Zap,
  TrendingUp,
  Calendar,
  Award,
  Activity,
  Wind,
  BookOpen
} from 'lucide-react-native';

const moodEmojis = [
  { emoji: '😢', mood: 'terrible', color: '#EF4444', icon: CloudRain },
  { emoji: '😔', mood: 'bad', color: '#F97316', icon: Cloud },
  { emoji: '😐', mood: 'okay', color: '#EAB308', icon: Sun },
  { emoji: '😊', mood: 'good', color: '#10B981', icon: Sun },
  { emoji: '😄', mood: 'amazing', color: '#6366F1', icon: Zap },
];

export default function HomeTab() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { label: 'Days logged', value: '12', icon: Calendar, color: '#6366F1' },
    { label: 'Streak', value: '5', icon: TrendingUp, color: '#10B981' },
    { label: 'Achievements', value: '3', icon: Award, color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.header}
        >
          <Text style={styles.greeting}>{greeting}!</Text>
          <Text style={styles.headerSubtitle}>How are you feeling today?</Text>
        </LinearGradient>

        {/* Daily Check-in */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Check-in</Text>
          <View style={styles.moodSelector}>
            {moodEmojis.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === index && { backgroundColor: item.color + '20', borderColor: item.color }
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.moodEmoji}>{item.emoji}</Text>
                <Text style={[styles.moodLabel, selectedMood === index && { color: item.color }]}>
                  {item.mood}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {selectedMood !== null && (
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Log Mood</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#10B981' + '20' }]}>
                <Wind size={24} color="#10B981" />
              </View>
              <Text style={styles.actionTitle}>Breathing Exercise</Text>
              <Text style={styles.actionSubtitle}>5 min guided session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#6366F1' + '20' }]}>
                <BookOpen size={24} color="#6366F1" />
              </View>
              <Text style={styles.actionTitle}>Journal Entry</Text>
              <Text style={styles.actionSubtitle}>Reflect on your day</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Tip */}
        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Activity size={20} color="#F59E0B" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Daily Wellness Tip</Text>
              <Text style={styles.tipText}>
                Take 3 deep breaths when you feel overwhelmed. This activates your body's relaxation response.
              </Text>
            </View>
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
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E0E7FF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    minWidth: 60,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 24,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F59E0B' + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
  },
});