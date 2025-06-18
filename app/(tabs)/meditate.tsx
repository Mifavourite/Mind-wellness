import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Wind, Play, Pause, RotateCcw, Clock, Heart } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const breathingExercises = [
  {
    id: 1,
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    duration: '5 min',
    type: 'breathing',
    color: '#10B981',
  },
  {
    id: 2,
    name: 'Box Breathing',
    description: 'Equal counts for inhale, hold, exhale, hold',
    duration: '10 min',
    type: 'breathing',
    color: '#6366F1',
  },
  {
    id: 3,
    name: 'Calm Meditation',
    description: 'Guided mindfulness session',
    duration: '15 min',
    type: 'meditation',
    color: '#8B5CF6',
  },
  {
    id: 4,
    name: 'Body Scan',
    description: 'Progressive relaxation technique',
    duration: '20 min',
    type: 'meditation',
    color: '#F59E0B',
  },
];

export default function MeditateTab() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startBreathing = () => {
    setIsActive(true);
    setTimer(0);
    startBreathingAnimation();
  };

  const stopBreathing = () => {
    setIsActive(false);
    scale.value = withTiming(1);
    opacity.value = withTiming(0.3);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setTimer(0);
    setCurrentPhase('inhale');
    scale.value = withTiming(1);
    opacity.value = withTiming(0.3);
  };

  const startBreathingAnimation = () => {
    // Inhale
    scale.value = withTiming(1.5, {
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(0.8, {
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
    });

    setTimeout(() => {
      setCurrentPhase('hold');
      // Hold - maintain scale
      setTimeout(() => {
        setCurrentPhase('exhale');
        // Exhale
        scale.value = withTiming(1, {
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(0.3, {
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
        });

        setTimeout(() => {
          if (isActive) {
            setCurrentPhase('inhale');
            startBreathingAnimation();
          }
        }, 8000);
      }, 7000);
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meditate</Text>
          <Text style={styles.subtitle}>Find your inner peace</Text>
        </View>

        {/* Breathing Exercise */}
        <View style={styles.section}>
          <View style={styles.breathingContainer}>
            <Text style={styles.exerciseTitle}>{selectedExercise.name}</Text>
            <Text style={styles.exerciseDescription}>{selectedExercise.description}</Text>
            
            <View style={styles.breathingCircle}>
              <Animated.View style={[styles.breathingBall, animatedStyle, { backgroundColor: selectedExercise.color }]} />
              <View style={styles.breathingCenter}>
                <Text style={styles.phaseText}>{getPhaseText()}</Text>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            </View>

            <View style={styles.controls}>
              {!isActive ? (
                <TouchableOpacity style={[styles.controlButton, styles.playButton]} onPress={startBreathing}>
                  <Play size={24} color="#FFFFFF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.controlButton, styles.pauseButton]} onPress={stopBreathing}>
                  <Pause size={24} color="#FFFFFF" />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetBreathing}>
                <RotateCcw size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Exercise Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Practice</Text>
          {breathingExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseCard,
                selectedExercise.id === exercise.id && styles.exerciseCardSelected
              ]}
              onPress={() => {
                setSelectedExercise(exercise);
                resetBreathing();
              }}
            >
              <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                {exercise.type === 'breathing' ? (
                  <Wind size={24} color={exercise.color} />
                ) : (
                  <Heart size={24} color={exercise.color} />
                )}
              </View>
              
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDesc}>{exercise.description}</Text>
              </View>
              
              <View style={styles.exerciseDuration}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.durationText}>{exercise.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>12</Text>
                <Text style={styles.progressLabel}>Minutes</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>3</Text>
                <Text style={styles.progressLabel}>Sessions</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>5</Text>
                <Text style={styles.progressLabel}>Day Streak</Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>6 more minutes to reach your daily goal</Text>
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
  breathingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  exerciseDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  breathingBall: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
  },
  breathingCenter: {
    alignItems: 'center',
    zIndex: 1,
  },
  phaseText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  timerText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  playButton: {
    backgroundColor: '#10B981',
  },
  pauseButton: {
    backgroundColor: '#EF4444',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseCardSelected: {
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  exerciseDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  exerciseDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});