import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Calendar, TrendingUp, ChartBar as BarChart3, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const moodData = [
  { date: '2024-01-15', mood: 4, note: 'Great day at work!' },
  { date: '2024-01-14', mood: 3, note: 'Feeling okay' },
  { date: '2024-01-13', mood: 5, note: 'Amazing weekend' },
  { date: '2024-01-12', mood: 2, note: 'Stressful day' },
  { date: '2024-01-11', mood: 4, note: 'Good mood' },
  { date: '2024-01-10', mood: 3, note: 'Average day' },
  { date: '2024-01-09', mood: 5, note: 'Excellent day!' },
];

const moodColors = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#6366F1'];
const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Amazing'];

export default function MoodTab() {
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const averageMood = moodData.reduce((acc, item) => acc + item.mood, 0) / moodData.length;
  const moodTrend = moodData.slice(-3).reduce((acc, item) => acc + item.mood, 0) / 3;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mood Tracker</Text>
          <Text style={styles.subtitle}>Monitor your emotional wellbeing</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#6366F1' + '20' }]}>
                <Heart size={20} color="#6366F1" />
              </View>
              <Text style={styles.statValue}>{averageMood.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Average Mood</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#10B981' + '20' }]}>
                <TrendingUp size={20} color="#10B981" />
              </View>
              <Text style={styles.statValue}>{moodTrend.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Recent Trend</Text>
            </View>
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, selectedView === 'week' && styles.toggleButtonActive]}
              onPress={() => setSelectedView('week')}
            >
              <Text style={[styles.toggleText, selectedView === 'week' && styles.toggleTextActive]}>
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, selectedView === 'month' && styles.toggleButtonActive]}
              onPress={() => setSelectedView('month')}
            >
              <Text style={[styles.toggleText, selectedView === 'month' && styles.toggleTextActive]}>
                Month
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mood Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Chart</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartLabels}>
              {moodLabels.reverse().map((label, index) => (
                <Text key={index} style={styles.chartLabel}>{label}</Text>
              ))}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
              <View style={styles.chart}>
                {moodData.map((item, index) => (
                  <View key={index} style={styles.chartBar}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: (item.mood / 5) * 120,
                          backgroundColor: moodColors[item.mood - 1],
                        }
                      ]}
                    />
                    <Text style={styles.chartDate}>
                      {new Date(item.date).getDate()}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          {moodData.slice(0, 5).map((item, index) => (
            <View key={index} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.entryDate}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.entryDateText}>
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
                <View style={styles.moodIndicator}>
                  <View
                    style={[
                      styles.moodDot,
                      { backgroundColor: moodColors[item.mood - 1] }
                    ]}
                  />
                  <Text style={styles.moodText}>
                    {moodLabels[item.mood - 1]}
                  </Text>
                </View>
              </View>
              {item.note && (
                <Text style={styles.entryNote}>{item.note}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Add Mood Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Log Today's Mood</Text>
          </TouchableOpacity>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#1F2937',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartLabels: {
    position: 'absolute',
    left: 0,
    top: 20,
    height: 120,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    width: 60,
  },
  chartScroll: {
    marginLeft: 70,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
    paddingBottom: 20,
  },
  chartBar: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  chartDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  moodIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  moodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  entryNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});