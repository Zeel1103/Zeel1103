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
  doctorName: string;
  patientName: string;
  appointmentDate: string;
  meetLink: string;
}

export default function DoctorNotificationEmail({
  doctorName,
  patientName,
  appointmentDate,
  meetLink,
}: Props) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-300 rounded-lg p-8 mx-auto my-8 max-w-lg">
            <Heading className="text-2xl font-bold text-gray-800">
              📅 New Appointment Scheduled
            </Heading>
            <Text className="text-gray-600 text-base">
              Hello Dr. {doctorName},
            </Text>
            <Text className="text-gray-600 text-base">
              A new appointment has been booked with you. Here are the details:
            </Text>
            <Hr className="border-gray-300 my-4" />
            <Text className="text-gray-800 text-base">
              <strong>👤 Patient Name:</strong> {patientName}
            </Text>
            <Text className="text-gray-800 text-base">
              <strong>📅 Date & Time:</strong> {appointmentDate}
            </Text>
            <Text className="text-gray-800 text-base">
              <strong>🎥 Video Call Link:</strong>
            </Text>
            <Button
              href={meetLink}
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md"
            >
              Join Video Consultation
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
              <strong>Reminder:</strong> Please be ready 5 minutes before the scheduled appointment time.
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
