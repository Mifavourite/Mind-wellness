import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { CirclePlus as PlusCircle, BookOpen, Calendar, Clock, Star } from 'lucide-react-native';

const journalEntries = [
  {
    id: 1,
    date: '2024-01-15',
    time: '20:30',
    title: 'Reflection on Today',
    content: 'Today was a good day. I managed to complete all my tasks and spent quality time with family. Feeling grateful for the small moments.',
    mood: 'good',
    isFavorite: true,
  },
  {
    id: 2,
    date: '2024-01-14',
    time: '19:15',
    title: 'Weekend Plans',
    content: 'Looking forward to the weekend. Planning to go hiking and try that new restaurant downtown. Need to remember to take some time for self-care.',
    mood: 'excited',
    isFavorite: false,
  },
  {
    id: 3,
    date: '2024-01-13',
    time: '21:45',
    title: 'Work Stress',
    content: 'Had a challenging day at work. The project deadline is approaching and I felt overwhelmed. Taking deep breaths and remembering that this too shall pass.',
    mood: 'stressed',
    isFavorite: false,
  },
];

const journalPrompts = [
  "What am I most grateful for today?",
  "What challenged me today and how did I handle it?",
  "What would I like to improve about tomorrow?",
  "What made me smile today?",
  "How am I feeling right now and why?",
];

export default function JournalTab() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Journal</Text>
          <Text style={styles.subtitle}>Reflect on your thoughts and feelings</Text>
        </View>

        {!showNewEntry ? (
          <>
            {/* New Entry Button */}
            <View style={styles.section}>
              <TouchableOpacity 
                style={styles.newEntryButton}
                onPress={() => setShowNewEntry(true)}
              >
                <PlusCircle size={24} color="#FFFFFF" />
                <Text style={styles.newEntryButtonText}>New Entry</Text>
              </TouchableOpacity>
            </View>

            {/* Writing Prompts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Writing Prompts</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.promptsContainer}>
                  {journalPrompts.map((prompt, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.promptCard}
                      onPress={() => {
                        setSelectedPrompt(prompt);
                        setNewEntryContent(prompt + '\n\n');
                        setShowNewEntry(true);
                      }}
                    >
                      <Text style={styles.promptText}>{prompt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Recent Entries */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Entries</Text>
              {journalEntries.map((entry) => (
                <View key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryMeta}>
                      <View style={styles.entryDate}>
                        <Calendar size={16} color="#6B7280" />
                        <Text style={styles.entryDateText}>
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Text>
                      </View>
                      <View style={styles.entryTime}>
                        <Clock size={16} color="#6B7280" />
                        <Text style={styles.entryTimeText}>{entry.time}</Text>
                      </View>
                    </View>
                    {entry.isFavorite && (
                      <Star size={20} color="#F59E0B" fill="#F59E0B" />
                    )}
                  </View>
                  
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryContent} numberOfLines={3}>
                    {entry.content}
                  </Text>
                  
                  <TouchableOpacity style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read more</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          /* New Entry Form */
          <View style={styles.section}>
            <View style={styles.newEntryHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => {
                  setShowNewEntry(false);
                  setNewEntryContent('');
                  setSelectedPrompt(null);
                }}
              >
                <Text style={styles.backButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.newEntryTitle}>New Entry</Text>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.entryForm}>
              <Text style={styles.currentDate}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              
              <TextInput
                style={styles.entryInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#9CA3AF"
                multiline
                value={newEntryContent}
                onChangeText={setNewEntryContent}
                autoFocus
              />
            </View>
          </View>
        )}
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
  newEntryButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newEntryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  promptsContainer: {
    flexDirection: 'row',
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promptText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    lineHeight: 20,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  entryDateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  entryTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryTimeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  entryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  newEntryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  newEntryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  entryForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentDate: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  entryInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
    minHeight: 300,
    textAlignVertical: 'top',
  },
});