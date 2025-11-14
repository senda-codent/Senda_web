/**
 * SENDA - LocalStorage Management
 * Handles all data persistence in the browser
 */

const Storage = {
    // Keys used in localStorage
    KEYS: {
        USER: 'senda_user',
        TOKEN: 'senda_token',
        WORKOUTS: 'senda_workouts',
        MEALS: 'senda_meals',
        MEDITATIONS: 'senda_meditations',
        PROGRESS: 'senda_progress',
        PREFERENCES: 'senda_preferences',
        STREAK: 'senda_streak'
    },

    // ==========================================
    // Generic Storage Methods
    // ==========================================

    /**
     * Save data to localStorage
     */
    set(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Get data from localStorage
     */
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    /**
     * Remove data from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Clear all Senda data from localStorage
     */
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            this.remove(key);
        });
    },

    // ==========================================
    // User Management
    // ==========================================

    /**
     * Save user data
     */
    saveUser(user) {
        return this.set(this.KEYS.USER, user);
    },

    /**
     * Get current user
     */
    getUser() {
        return this.get(this.KEYS.USER);
    },

    /**
     * Update user profile
     */
    updateUser(updates) {
        const user = this.getUser();
        if (user) {
            const updatedUser = { ...user, ...updates };
            return this.saveUser(updatedUser);
        }
        return false;
    },

    /**
     * Check if user is logged in
     */
    isAuthenticated() {
        return this.get(this.KEYS.USER) !== null;
    },

    /**
     * Logout user
     */
    logout() {
        this.remove(this.KEYS.USER);
        this.remove(this.KEYS.TOKEN);
    },

    // ==========================================
    // Workout Management
    // ==========================================

    /**
     * Save workout history
     */
    saveWorkout(workout) {
        const workouts = this.get(this.KEYS.WORKOUTS) || [];
        workouts.push({
            ...workout,
            id: Utils.generateId(),
            timestamp: new Date().toISOString()
        });
        return this.set(this.KEYS.WORKOUTS, workouts);
    },

    /**
     * Get all workouts
     */
    getWorkouts() {
        return this.get(this.KEYS.WORKOUTS) || [];
    },

    /**
     * Mark workout as completed
     */
    completeWorkout(workoutId) {
        const workouts = this.getWorkouts();
        const workout = workouts.find(w => w.id === workoutId);
        if (workout) {
            workout.completed = true;
            workout.completedAt = new Date().toISOString();
            return this.set(this.KEYS.WORKOUTS, workouts);
        }
        return false;
    },

    // ==========================================
    // Meal Management
    // ==========================================

    /**
     * Save meal plan
     */
    saveMeal(meal) {
        const meals = this.get(this.KEYS.MEALS) || [];
        meals.push({
            ...meal,
            id: Utils.generateId(),
            timestamp: new Date().toISOString()
        });
        return this.set(this.KEYS.MEALS, meals);
    },

    /**
     * Get all meals
     */
    getMeals() {
        return this.get(this.KEYS.MEALS) || [];
    },

    /**
     * Mark meal as eaten
     */
    completeMeal(mealId) {
        const meals = this.getMeals();
        const meal = meals.find(m => m.id === mealId);
        if (meal) {
            meal.completed = true;
            meal.completedAt = new Date().toISOString();
            return this.set(this.KEYS.MEALS, meals);
        }
        return false;
    },

    // ==========================================
    // Meditation Management
    // ==========================================

    /**
     * Save meditation session
     */
    saveMeditation(meditation) {
        const meditations = this.get(this.KEYS.MEDITATIONS) || [];
        meditations.push({
            ...meditation,
            id: Utils.generateId(),
            timestamp: new Date().toISOString()
        });
        return this.set(this.KEYS.MEDITATIONS, meditations);
    },

    /**
     * Get all meditations
     */
    getMeditations() {
        return this.get(this.KEYS.MEDITATIONS) || [];
    },

    /**
     * Mark meditation as completed
     */
    completeMeditation(meditationId) {
        const meditations = this.getMeditations();
        const meditation = meditations.find(m => m.id === meditationId);
        if (meditation) {
            meditation.completed = true;
            meditation.completedAt = new Date().toISOString();
            this.updateStreak(); // Update streak when meditation is completed
            return this.set(this.KEYS.MEDITATIONS, meditations);
        }
        return false;
    },

    // ==========================================
    // Progress Tracking
    // ==========================================

    /**
     * Save progress data
     */
    saveProgress(type, value) {
        const progress = this.get(this.KEYS.PROGRESS) || {};
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        if (!progress[date]) {
            progress[date] = {};
        }

        progress[date][type] = value;
        return this.set(this.KEYS.PROGRESS, progress);
    },

    /**
     * Get progress data
     */
    getProgress(days = 30) {
        const progress = this.get(this.KEYS.PROGRESS) || {};
        const today = new Date();
        const result = [];

        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            result.push({
                date: dateStr,
                data: progress[dateStr] || {}
            });
        }

        return result.reverse();
    },

    // ==========================================
    // Streak Management
    // ==========================================

    /**
     * Update meditation streak
     */
    updateStreak() {
        const streak = this.get(this.KEYS.STREAK) || {
            current: 0,
            longest: 0,
            lastDate: null
        };

        const today = new Date().toISOString().split('T')[0];

        if (streak.lastDate === today) {
            // Already completed today
            return streak.current;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (streak.lastDate === yesterdayStr || streak.lastDate === null) {
            // Continue streak
            streak.current += 1;
        } else {
            // Streak broken
            streak.current = 1;
        }

        streak.lastDate = today;

        if (streak.current > streak.longest) {
            streak.longest = streak.current;
        }

        this.set(this.KEYS.STREAK, streak);
        return streak.current;
    },

    /**
     * Get current streak
     */
    getStreak() {
        return this.get(this.KEYS.STREAK) || {
            current: 0,
            longest: 0,
            lastDate: null
        };
    },

    // ==========================================
    // Preferences Management
    // ==========================================

    /**
     * Save user preferences
     */
    savePreferences(preferences) {
        const current = this.get(this.KEYS.PREFERENCES) || {};
        const updated = { ...current, ...preferences };
        return this.set(this.KEYS.PREFERENCES, updated);
    },

    /**
     * Get user preferences
     */
    getPreferences() {
        return this.get(this.KEYS.PREFERENCES) || {
            theme: 'light',
            notifications: true,
            preferAI: true,
            language: 'es'
        };
    },

    /**
     * Get single preference
     */
    getPreference(key, defaultValue = null) {
        const preferences = this.getPreferences();
        return preferences[key] !== undefined ? preferences[key] : defaultValue;
    },

    // ==========================================
    // Data Export/Import
    // ==========================================

    /**
     * Export all user data
     */
    exportData() {
        const data = {};
        Object.values(this.KEYS).forEach(key => {
            data[key] = this.get(key);
        });
        return data;
    },

    /**
     * Import user data
     */
    importData(data) {
        Object.entries(data).forEach(([key, value]) => {
            this.set(key, value);
        });
        return true;
    },

    /**
     * Download data as JSON file
     */
    downloadData() {
        const data = this.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `senda-data-${new Date().toISOString()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Export for use in other modules
window.Storage = Storage;
