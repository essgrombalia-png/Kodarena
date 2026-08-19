export type DifficultyLevel = 'nyborjare' | 'medel' | 'avancerad' | 'proffs';
export type WebTrack = 'html' | 'css' | 'js';

export interface HtmlTestCase {
  id: string;
  description: string;
  selector?: string; // e.g. "h1", "a[target='_blank']", "form input[type='email'][required]"
  attributeCheck?: {
    name: string;
    expectedValue?: string;
    shouldExist?: boolean;
  };
  cssCheck?: {
    selector: string;
    property: string;
    expectedValue?: string | RegExp;
  };
  jsCheck?: {
    type: 'console_log' | 'variable_value' | 'dom_mutation' | 'function_call' | 'script_contains';
    expectedValue?: any;
    identifier?: string;
    snippet?: string;
  };
  containsText?: string;
  minCount?: number;
  customValidator?: (doc: Document, rawHtml: string, consoleLogs?: string[]) => boolean | { pass: boolean; message: string };
  expectedHtml?: string;
}

export interface HtmlExercise {
  id: string;
  track?: WebTrack;
  title: string;
  shortDesc: string;
  difficulty: DifficultyLevel;
  xpReward: number;
  theory: string; // Pedagogical theory & explanation in Swedish
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
  testCases: HtmlTestCase[];
}

export interface HtmlLessonLevel {
  id: number;
  track?: WebTrack;
  levelTitle: string;
  levelSubtitle: string;
  icon: string;
  badgeName: string;
  badgeDesc: string;
  requiredXp: number;
  exercises: HtmlExercise[];
}

export interface CustomCodeTemplate {
  id: string;
  title: string;
  category: string;
  icon?: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  track?: WebTrack;
}

export interface UserHtmlProgress {
  totalXp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  activeTrack: WebTrack;
  completedExerciseIds: string[];
  solvedQuizIds: string[];
  unlockedBadgeIds: string[];
  savedPlaygroundCodes: Array<{
    id: string;
    title: string;
    code: string;
    updatedAt: string;
  }>;
  savedTemplates?: CustomCodeTemplate[];
  activeExerciseId: string;
}

export interface QuizQuestion {
  id: string;
  track?: WebTrack;
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
  track?: WebTrack;
  title: string;
  icon: string;
  items: Array<{
    name: string;
    syntax: string;
    description: string;
    example: string;
    output?: string;
  }>;
}

export interface DomNodeInfo {
  tag: string;
  attributes: Record<string, string>;
  textPreview: string;
  childrenCount: number;
  depth: number;
}

export interface HtmlExecutionResult {
  success: boolean;
  html: string;
  domTree: DomNodeInfo[];
  errors: string[];
  warnings: string[];
  consoleLogs: string[];
  testResults: Array<{
    testId: string;
    description: string;
    passed: boolean;
    actual: string;
    expected: string;
  }>;
  allTestsPassed: boolean;
  executionTimeMs: number;
}
