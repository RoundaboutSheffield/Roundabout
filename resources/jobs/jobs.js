console.log('cron running');

dpd.appointments.get({date: { $lte: new Date().toISOString() }, sent: false})
    .then(appointments => 
        appointments.forEach(appointment => {
            
            const { title, to, message, userId } = appointment;
            const newMessage = { from: appointment.title, to, message, userId };
            console.log('found appointment: ', appointment);

            dpd.messages
                .post(newMessage)
                .then(() => {
                    const newAppointment = Object.assign({}, appointment, {sent: true})
                    console.log('message sent:', newMessage);
                    dpd.appointments
                        .put(newAppointment.id, newAppointment);
                })
                .catch(e => console.log(`Error sending cron messages: ${e.message}`));
        })
    )
    .catch(e => console.log(e));