import nodemailer from 'nodemailer'; // ES module import

const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: "gmail",
			port: 587,
			secure: true,
			auth: {
				user: "abhijeetkamalekar1509@gmail.com",
				pass: "tznw ctxl awna veph",
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default sendEmail; // Default export
