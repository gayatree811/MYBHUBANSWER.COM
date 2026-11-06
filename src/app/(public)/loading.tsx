import { LoadingState } from "@/components/ui/States";
import { Container, Section } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Section className="pt-32">
      <Container>
        <LoadingState />
      </Container>
    </Section>
  );
}
