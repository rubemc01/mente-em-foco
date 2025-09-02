import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// --- INTERFACES ---
interface Subtask { id: number; text: string; isCompleted: boolean; }
interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  subtasks?: Subtask[];
}
interface Achievement { id: number; text: string; date: string; }
interface AppSettings { focusDuration: number; shortBreakDuration: number; longBreakDuration: number; }
interface RoutineTemplate { id: number; name: string; items: string[]; }
interface ToolboxItem { id: number; type: 'note' | 'link'; title: string; content: string; }
interface ShoppingListItem { id: number; text: string; isCompleted: boolean; }
interface ShoppingList { id: number; name: string; items: ShoppingListItem[]; }
interface MoodEntry {
  id: number;
  mood: string;
  note?: string;
  date: string;
}
interface UserProfile {
  xp: number;
  level: number;
}

interface AppContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  addSubtask: (parentId: number, subtaskText: string) => void;
  toggleSubtask: (parentId: number, subtaskId: number) => void;
  activeTask: Task | null;
  setActiveTask: (task: Task | null) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  achievements: Achievement[];
  addAchievement: (text: string) => void;
  currentUser: User | null;
  authLoading: boolean;
  templates: RoutineTemplate[];
  addTemplate: (name: string, items: string[]) => void;
  deleteTemplate: (templateId: number) => void;
  loadTemplate: (templateId: number) => void;
  toolboxItems: ToolboxItem[];
  addToolboxItem: (item: Omit<ToolboxItem, 'id'>) => void;
  deleteToolboxItem: (itemId: number) => void;
  shoppingLists: ShoppingList[];
  addShoppingList: (name: string) => void;
  deleteShoppingList: (listId: number) => void;
  addShoppingItem: (listId: number, itemText: string) => void;
  toggleShoppingItem: (listId: number, itemId: number) => void;
  deleteShoppingItem: (listId: number, itemId: number) => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (mood: string, note?: string) => void;
  userProfile: UserProfile;
  addXp: (amount: number) => void;
}

const defaultSettings: AppSettings = { focusDuration: 25, shortBreakDuration: 5, longBreakDuration: 15 };
const defaultProfile: UserProfile = { xp: 0, level: 1 };
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [toolboxItems, setToolboxItems] = useState<ToolboxItem[]>([]);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTasks(data.tasks || []);
            setAchievements(data.achievements || []);
            setSettings(data.settings || defaultSettings);
            setTemplates(data.templates || []);
            setToolboxItems(data.toolboxItems || []);
            setShoppingLists(data.shoppingLists || []);
            setMoodHistory(data.moodHistory || []);
            setUserProfile(data.userProfile || defaultProfile);
          } else {
            setDoc(userDocRef, { tasks: [], achievements: [], settings: defaultSettings, templates: [], toolboxItems: [], shoppingLists: [], moodHistory: [], userProfile: defaultProfile });
          }
        });
        return () => unsubscribeSnapshot();
      } else {
        setTasks([]); setAchievements([]); setSettings(defaultSettings); setTemplates([]); setToolboxItems([]); setShoppingLists([]); setMoodHistory([]); setUserProfile(defaultProfile);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const writeToDb = (data: object) => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      setDoc(userDocRef, data, { merge: true });
    }
  };

  const calculateLevel = (xp: number) => Math.floor(xp / 1000) + 1;

  const addXp = (amount: number) => {
    const newXp = (userProfile.xp || 0) + amount;
    const newLevel = calculateLevel(newXp);
    const newProfile = { xp: newXp, level: newLevel };
    writeToDb({ userProfile: newProfile });
  };

  const addTask = (text: string) => writeToDb({ tasks: [...tasks, { id: Date.now(), text, isCompleted: false, subtasks: [] }] });
  const deleteTask = (id: number) => writeToDb({ tasks: tasks.filter(task => task.id !== id) });
  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task && !task.isCompleted) {
      addXp(100);
    }
    writeToDb({ tasks: tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t) });
  };
  const addSubtask = (parentId: number, subtaskText: string) => writeToDb({ tasks: tasks.map(task => task.id === parentId ? { ...task, subtasks: [...(task.subtasks || []), { id: Date.now(), text: subtaskText, isCompleted: false }] } : task) });
  const toggleSubtask = (parentId: number, subtaskId: number) => writeToDb({ tasks: tasks.map(task => task.id === parentId ? { ...task, subtasks: task.subtasks?.map(sub => sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub) } : task) });
  const updateSettings = (newSettings: Partial<AppSettings>) => writeToDb({ settings: { ...settings, ...newSettings } });
  const addAchievement = (text: string) => {
    addXp(50);
    const newAchievement: Achievement = { id: Date.now(), text, date: new Date().toISOString().split('T')[0] };
    writeToDb({ achievements: [newAchievement, ...achievements] });
  };
  const addTemplate = (name: string, items: string[]) => writeToDb({ templates: [...templates, { id: Date.now(), name, items }] });
  const deleteTemplate = (templateId: number) => writeToDb({ templates: templates.filter(t => t.id !== templateId) });
  const loadTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    const newTasks: Task[] = template.items.map(itemText => ({ id: Date.now() + Math.random(), text: itemText, isCompleted: false, subtasks: [] }));
    writeToDb({ tasks: [...tasks, ...newTasks] });
  };
  const addToolboxItem = (item: Omit<ToolboxItem, 'id'>) => writeToDb({ toolboxItems: [...toolboxItems, { ...item, id: Date.now() }] });
  const deleteToolboxItem = (itemId: number) => writeToDb({ toolboxItems: toolboxItems.filter(item => item.id !== itemId) });
  const addShoppingList = (name: string) => writeToDb({ shoppingLists: [...shoppingLists, { id: Date.now(), name, items: [] }] });
  const deleteShoppingList = (listId: number) => writeToDb({ shoppingLists: shoppingLists.filter(list => list.id !== listId) });
  const addShoppingItem = (listId: number, itemText: string) => {
    const newItem: ShoppingListItem = { id: Date.now(), text: itemText, isCompleted: false };
    writeToDb({ shoppingLists: shoppingLists.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list) });
  };
  const toggleShoppingItem = (listId: number, itemId: number) => {
    writeToDb({ shoppingLists: shoppingLists.map(list => list.id === listId ? { ...list, items: list.items.map(item => item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item) } : list) });
  };
  const deleteShoppingItem = (listId: number, itemId: number) => {
    writeToDb({ shoppingLists: shoppingLists.map(list => list.id === listId ? { ...list, items: list.items.filter(item => item.id !== itemId) } : list) });
  };
  const addMoodEntry = (mood: string, note?: string) => {
    addXp(20);
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = { id: Date.now(), mood, note, date: today };
    const otherEntries = moodHistory.filter(entry => entry.date !== today);
    writeToDb({ moodHistory: [newEntry, ...otherEntries] });
  };

  const value = {
    tasks, addTask, deleteTask, toggleTask, addSubtask, toggleSubtask,
    activeTask, setActiveTask,
    settings, updateSettings,
    achievements, addAchievement,
    currentUser, authLoading,
    templates, addTemplate, deleteTemplate, loadTemplate,
    toolboxItems, addToolboxItem, deleteToolboxItem,
    shoppingLists, addShoppingList, deleteShoppingList, addShoppingItem, toggleShoppingItem, deleteShoppingItem,
    moodHistory, addMoodEntry,
    userProfile, addXp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}