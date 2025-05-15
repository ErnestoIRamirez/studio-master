export type TaskType = 'property' | 'scan' | 'audio';
export type TaskStatus = 'available' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  address: string;
  points: number;
  status: TaskStatus;
  description?: string;
  date?: string; // Optional: for sorting or display
}

export type RewardStatus = 'available' | 'redeemed';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  status: RewardStatus;
  imageUrl?: string;
}

export interface LocationSuggestion {
  latitude: number;
  longitude: number;
  description: string;
  dataType?: TaskType; // To help identify what AI suggested if it's not in description
}
