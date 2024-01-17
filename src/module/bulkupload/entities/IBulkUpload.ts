import { type IBase } from '../../../lib/base';

interface IBulkUpload extends IBase {
  status: string;
  endedAt?: Date;
  time: number;
  filename: string;
  successfulEntries: number;
  failedEntries: number;
  entriesCompleted: number;
  totalEntries: number;
}

export default IBulkUpload;
