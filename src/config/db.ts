import colors from '@colors/colors';
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(colors.green.bold(`DB Connected to: ${connection.connection.host} on port: ${connection.connection.port}`));
    } catch (error) {
        console.log(colors.red.bgRed.bold('Error trying to connect DB: '), error);
        process.exit(1);
    }
}