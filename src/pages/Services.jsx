import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Stack,
  HStack,
  Image,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {
  return (
    <Box as="main" w="100%">
      {/* Hero */}
      <Box 
        color="white" 
        py={{ base: 10, sm: 12, md: 16 }}
        position="relative" 
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/Pictures/services-section-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',
          zIndex: 0,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      >
        <Container maxW="5xl" px={{ base: 4, sm: 5, md: 8 }} position="relative" zIndex={2}>
          <VStack align="start" spacing={{ base: 3, md: 4 }}>
            <Heading as="h1" size={{ base: 'lg', sm: 'xl', md: '2xl' }} color="white">
              Our Services
            </Heading>
            <Text fontSize={{ base: 'sm', sm: 'base', md: 'lg' }} color="gray.100">
              Custom welding, fabrication, repairs, and installations. Whatever you need, we can build it.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Services List */}
      <Box py={{ base: 12, sm: 16, md: 20 }} bg="white">
        <Container maxW="6xl" px={{ base: 4, sm: 5, md: 8 }}>
          <VStack spacing={{ base: 12, sm: 16, md: 20 }} align="stretch">
            {services.map((service, idx) => (
              <Box key={idx}>
                <Stack
                  direction={{ base: 'column', md: idx % 2 === 0 ? 'row' : 'row-reverse' }}
                  spacing={{ base: 8, md: 12 }}
                  align={{ base: 'stretch', md: 'flex-start' }}
                >
                  {/* Text */}
                  <VStack align="start" spacing={{ base: 4, md: 6 }} flex={1}>
                    <Box>
                      <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="brand.800" mb={1}>
                        {service.title}
                      </Heading>
                      <Text color="accent.500" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="600">
                        {service.description}
                      </Text>
                    </Box>
                    <Text color="brand.600" whiteSpace="pre-line" lineHeight="1.9" fontSize={{ base: 'xs', sm: 'sm', md: 'base' }}>
                      {service.details}
                    </Text>
                    <Button
                      as={RouterLink}
                      to="/contact"
                      bg="accent.500"
                      color="white"
                      _hover={{ bg: 'accent.600', transform: 'translateY(-2px)' }}
                      size={{ base: 'sm', md: 'md' }}
                      w={{ base: '100%', sm: 'auto' }}
                      transition="all 0.2s"
                    >
                      Get a Quote for This Service
                    </Button>
                  </VStack>

                  {/* Image */}
                  <Box
                    flex={1}
                    h={{ base: '250px', sm: '300px', md: '400px' }}
                    w={{ base: '100%', md: 'auto' }}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="brand.200"
                    position="relative"
                    overflow="hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      fallback={<Box bg="brand.100" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center" color="brand.400" fontSize="xs">{service.title}</Box>}
                    />
                  </Box>
                </Stack>

                {idx < services.length - 1 && <Box h="1px" bg="brand.200" mt={{ base: 8, md: 16 }} />}
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* Process Section */}
      <Box py={{ base: 12, sm: 16, md: 20 }} bg="brand.50">
        <Container maxW="6xl" px={{ base: 4, sm: 5, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            <VStack spacing={{ base: 1, md: 2 }} align="start">
              <Heading as="h2" size={{ base: 'md', md: 'xl' }} color="brand.800">
                Our Process
              </Heading>
              <Text color="brand.600" fontSize={{ base: 'sm', md: 'base' }}>
                From your idea to finished product
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
              {[
                {
                  step: '1',
                  title: 'Consultation',
                  desc: 'You bring your idea. We listen, ask questions, and understand your needs.',
                },
                {
                  step: '2',
                  title: 'Design & Quote',
                  desc: 'We create a design, provide a detailed quote, and discuss options with you.',
                },
                {
                  step: '3',
                  title: 'Fabrication',
                  desc: 'We build it right. Our team works with precision and quality on every detail.',
                },
                {
                  step: '4',
                  title: 'Installation & Handover',
                  desc: 'We finish strong. Professional installation and your complete satisfaction.',
                },
              ].map((phase, idx) => (
                <Box key={idx} p={{ base: 4, md: 6 }} bg="white" borderRadius="lg" textAlign="center">
                  <Box
                    w={{ base: 10, md: 12 }}
                    h={{ base: 10, md: 12 }}
                    bg="accent.500"
                    color="white"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    mx="auto"
                    mb={4}
                  >
                    {phase.step}
                  </Box>
                  <Heading as="h3" size={{ base: 'xs', md: 'sm' }} color="brand.800" mb={2}>
                    {phase.title}
                  </Heading>
                  <Text color="brand.600" fontSize={{ base: 'xs', md: 'sm' }}>
                    {phase.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 12, sm: 16, md: 20 }} bg="accent.600" color="white">
        <Container maxW="5xl" px={{ base: 4, sm: 5, md: 8 }}>
          <VStack spacing={{ base: 4, md: 6 }} align="center" textAlign="center">
            <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="white">
              Ready for a Detailed Project Quote?
            </Heading>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.100">
              Provide us with your specifications and we’ll prepare a competitive, transparent quote with accurate lead times.
            </Text>
            <VStack 
              spacing={{ base: 2, sm: 3, md: 4 }} 
              w={{ base: '100%', sm: 'auto' }}
              align={{ base: 'stretch', sm: 'center' }}
            >
             <Button
              as={RouterLink}
              to="/contact"
              size={{ base: 'sm', md: 'lg' }}
              bg="white"
              color="accent.600"
              borderColor="white"
              rounded="lg"
              px={{ base: 6, md: 10 }}
              _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
              w={{ base: '100%', sm: 'auto' }}
              fontSize={{ base: 'sm', md: 'base' }}
              transition="all 0.2s"
              >
              Request a Quote
            </Button>
              
            <Button
              as={RouterLink}
              to="/contact"
              size={{ base: 'sm', md: 'lg' }}
              bg="brand.800"
              color="white"
              rounded="lg"
              px={{ base: 6, md: 10 }}
              variant="outline"
              _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
              w={{ base: '100%', sm: 'auto' }}
              fontSize={{ base: 'sm', md: 'base' }}
              transition="all 0.2s"
              >
              Get in Touch
           </Button>
          </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
