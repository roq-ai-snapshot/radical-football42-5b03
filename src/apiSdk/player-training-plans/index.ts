import axios from 'axios';
import queryString from 'query-string';
import { PlayerTrainingPlanInterface } from 'interfaces/player-training-plan';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerTrainingPlans = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-training-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerTrainingPlan = async (playerTrainingPlan: PlayerTrainingPlanInterface) => {
  const response = await axios.post('/api/player-training-plans', playerTrainingPlan);
  return response.data;
};

export const updatePlayerTrainingPlanById = async (id: string, playerTrainingPlan: PlayerTrainingPlanInterface) => {
  const response = await axios.put(`/api/player-training-plans/${id}`, playerTrainingPlan);
  return response.data;
};

export const getPlayerTrainingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/player-training-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deletePlayerTrainingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/player-training-plans/${id}`);
  return response.data;
};
