// services/interviewService.ts
import Interview from '../models/interview';
import mongoose from 'mongoose';

export const createInterview = async (data: any) => {
  const newInterview = new Interview(data);
  return await newInterview.save();
};

export const getAllInterviews = async () => {
  return await Interview.find();
};

export const getInterviewByID = async (id: string) => {
  const questid = new mongoose.Types.ObjectId(id);
  return await Interview.findById(questid);
};

export const updateInterview = async (id: string, data: any) => {
  return await Interview.findByIdAndUpdate(id, data, { new: true });
};

export const deleteInterview = async (id: string) => {
  return await Interview.findByIdAndDelete(id);
};

export const patchInterview = async (id: string, data : any)=> {
  return await Interview.findByIdAndUpdate(id,data);
}