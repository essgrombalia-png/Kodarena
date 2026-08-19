export type DifficultyLevel = 'nyborjare' | 'medel' | 'avancerad' | 'proffs';

export interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput?: string;
  expectedReturnValue?: any;
  customCheckCode?: string; // Optional Python assertion code
}

export interface PythonExercise {
  id: string;
  title: string;
  shortDesc: string;
  difficulty: DifficultyLevel;
  xpReward: number;
  theory: string; // Markdown/HTML formatted theoretical background & explanation
  examples: Array<{
    title: string;
    code: string;
    explanation: string;
  }>;
  task: string; // Specific instructions for the exercise
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
  hints: string[];
  testCases: TestCase[];
}

export interface PythonLessonLevel {
  id: number;
  levelTitle: string;
  levelSubtitle: string;
  icon: string;
  badgeName: string;
  badgeDesc: string;
  requiredXp: number;
  exercises: PythonExercise[];
}

export interface UserPythonProgress {
  totalXp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedExerciseIds: string[];
  solvedQuizIds: string[];
  unlockedBadgeIds: string[];
  savedPlaygroundCodes: Array<{
    id: string;
    title: string;
    code: string;
    updatedAt: string;
  }>;
  activeExerciseId: string;
}

export interface QuizQuestion {
  id: string;
  levelId: number;
  title: string;
  codeSnippet?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xp: number;
}

export interface CheatsheetCategory {
  id: string;
  title: string;
  icon: string;
  items: Array<{
    name: string;
    syntax: string;
    description: string;
    example: string;
    output: string;
  }>;
}

export interface VariableState {
  name: string;
  type: string;
  value: string;
  isCustomObject?: boolean;
}

export interface CanvasDrawCommand {
  type: 'line' | 'circle' | 'rect' | 'dot' | 'text' | 'clear' | 'barChart';
  params: any;
}

export interface ExecutionResult {
  success: boolean;
  output: string[];
  returnValue?: any;
  error?: string | null;
  executionTimeMs: number;
  variables?: VariableState[];
  canvasCommands?: CanvasDrawCommand[];
  testResults?: Array<{
    testId: string;
    description: string;
    passed: boolean;
    expected: string;
    actual: string;
    errorMessage?: string;
  }>;
  allTestsPassed?: boolean;
}
