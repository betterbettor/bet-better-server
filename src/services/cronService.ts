import { CronJob } from 'cron';

const fetchOdds = async (): Promise<void> => {
  console.log('fetching odds', new Date().toLocaleTimeString());
};

export const oddsJob = new CronJob('* * */3 * * *', fetchOdds);
