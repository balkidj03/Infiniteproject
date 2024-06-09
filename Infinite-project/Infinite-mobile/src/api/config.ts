import {create} from 'apisauce';
import {AppConstants} from '../lib';

export const http = create({
  baseURL: AppConstants.STORAGE_KEY.BASE_URL,
});
