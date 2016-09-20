console.log('cron running');

dpd.appointments.get({date: { $lte: new Date().toISOString() }, sent: false})
    .then(appointments => 
        appointments.forEach(appointment => {
            
            const { title, to, message } = appointment;
            const newMessage = { from: appointment.title, to, message };

            dpd.messages
                .post(newMessage)
                .then(() => {
                    const newAppointment = Object.assign({}, appointment, {sent: true})
                    dpd.appointments
                        .put(newAppointment.id, newAppointment);
                })
                .catch(e => console.log(`Error sending cron messages: ${e.message}`));
        })
    );;