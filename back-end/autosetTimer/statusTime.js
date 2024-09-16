const cron = require('node-cron');
const Tournament = require('../models/tournamentModel'); // Adjust the path as needed

const startCronJobs = () => {
  // Job to update tournament status from 'upcoming' to 'ongoing'
  cron.schedule('*/5 * * * *', async () => { // Runs every 5 minutes
    try {
      const now = new Date();
      
      // Update tournaments from 'upcoming' to 'ongoing' if 5 minutes have passed since creation
      await Tournament.updateMany(
        {
          status: 'upcoming',
          statusUpdatedAt: { $lte: new Date(now - 5 * 60 * 1000) } // Check if 5 minutes have passed
        },
        {
          $set: { 
            status: 'ongoing',
            statusUpdatedAt: now // Update statusUpdatedAt to the current time
          }
        }
      );
      console.log('Updated tournaments to ongoing');
      
      // Update tournaments from 'ongoing' to 'completed' if 30 minutes have passed since status was 'ongoing'
      await Tournament.updateMany(
        {
          status: 'ongoing',
          statusUpdatedAt: { $lte: new Date(now - 30 * 60 * 1000) } // Check if 30 minutes have passed since status was 'ongoing'
        },
        {
          $set: { 
            status: 'completed',
            statusUpdatedAt: now // Update statusUpdatedAt to the current time
          }
        }
      );
      console.log('Updated tournaments to completed');
      
    } catch (error) {
      console.error('Error updating tournament statuses:', error);
    }
  });
};

module.exports = startCronJobs;
