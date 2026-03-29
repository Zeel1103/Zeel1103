import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Tailwind,
  Button,
  Link,
} from "@react-email/components";

interface Props {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  meetLink: string;
}

export default function PatientReminderEmail({
  patientName,
  doctorName,
  appointmentDate,
  meetLink,
}: Props) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-yellow-300 rounded-lg p-8 mx-auto my-8 max-w-lg">
            <Heading className="text-2xl font-bold text-yellow-600">
              ⏰ Appointment Reminder!
            </Heading>
            <Text className="text-gray-600 text-base">
              Hi {patientName},
            </Text>
            <Text className="text-gray-600 text-base">
              Your appointment with <strong>{doctorName}</strong> is starting soon! 
            </Text>
            <Hr className="border-gray-300 my-4" />
            <Text className="text-gray-800 text-base">
              <strong>👨‍⚕️ Doctor:</strong> {doctorName}
            </Text>
            <Text className="text-gray-800 text-base">
              <strong>📅 Date & Time:</strong> {appointmentDate}
            </Text>
            <Text className="text-gray-800 text-base">
              <strong>⏱️ Time:</strong> Starting in 10 minutes
            </Text>
            <Hr className="border-gray-300 my-4" />

            <Button
              href={meetLink}
              className="bg-green-600 text-white font-bold px-6 py-3 rounded-md"
            >
              🎥 Join Video Consultation Now
            </Button>
            <Text className="text-gray-500 text-sm mt-4">
              If the button does not work, you can copy and paste this link into your browser:
              <br />
              <Link href={meetLink} className="text-blue-600 underline">
                {meetLink}
              </Link>
            </Text>

            <Hr className="border-gray-300 my-4" />
            <Text className="text-gray-600 text-sm">
              <strong>💡 Tip:</strong> Please join 5 minutes early and ensure your camera and microphone are working.
            </Text>
            <Hr className="border-gray-300 my-4" />
            <Text className="text-gray-500 text-xs text-center">
              © 2026 HealthAI Medical Voice Agent
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
