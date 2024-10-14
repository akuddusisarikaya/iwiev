// services/packageService.ts
import Package from '../models/package';
import mongoose from 'mongoose';

export const createPackage = async (data: any) => {
  const newPackage = new Package(data);
  return await newPackage.save();
};

export const getAllPackages = async () => {
  return await Package.find();
};

export const getPackageByID = async (id: string) => {
  const packageId = new mongoose.Types.ObjectId(id);
  return await Package.findById(packageId);
};

export const updatePackage = async (id: string, data: any) => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
};

export const deletePackage = async (id: string) => {
  return await Package.findByIdAndDelete(id);
};
