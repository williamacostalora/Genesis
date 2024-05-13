exports.handler = async (event, context) => {
    const data = JSON.parse(event.body);
    
    // Extract form data
    const name = data.name;
    const email = data.email;
    const age = data.age || '';
    const date = data.date;
    const time = data.time;
    const interests = data.interests ? data.interests.join(", ") : '';
    const message = data.message || '';

    // Prepare email content
    const subject = "New Appointment Scheduled";
    const emailBody = `
        Name: ${name}
        Email: ${email}
        Age: ${age}
        Preferred Date: ${date}
        Preferred Time: ${time}
        Interests: ${interests}
        Additional Message: ${message}
    `;

    // Send email (You can use any email sending service here)
    // For example, using SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'waacosta13@gmail.com',
        from: email,
        subject: subject,
        text: emailBody,
    };

    try {
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send email" }),
        };
    }
};
