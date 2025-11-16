import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Icon,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { services } from '../data/services'
import { FaArrowRight } from 'react-icons/fa'

export default function Services() {
  const [expandedId, setExpandedId] = useState(null)

  const handleToggle = id => {
    setExpandedId(expandedId === id ? null : id)
  }

  // First 3 services load eagerly, rest lazy load
  const isEagerLoad = (index) => index < 3

  return (
    <Box as="main" w="100%">
      {/* Hero */}
      <Box 
        color="white" 
        py={{ base: 12, md: 16 }}
        position="relative" 
        overflow="hidden"
      >
        {/* Background Image - Preloaded */}
        <Image
          src="/assets/Pictures/services-hero-section.webp"
          alt="Services Hero Background"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          zIndex={0}
          loading="eager"
          filter="blur(1px)"
        />

        {/* Dark Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={1}
        />

        <Container maxW="5xl" px={{ base: 6, md: 8 }} position="relative" zIndex={2}>
          <VStack align="start" spacing={4}>
            <Heading as="h1" size="2xl" color={"white"}>
              Our Services
            </Heading>
            <Text fontSize="lg" color="gray.100">
              From custom fabrication to heavy industrial work, we deliver precision and quality on every project
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box py={{ base: 16, md: 20 }} bg="white">
        <Container maxW="7xl" px={{ base: 6, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {services.map((service, index) => (
              <Box
                key={service.id}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.3s"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-4px)' }}
                bg="white"
              >
                {/* Service Image */}
                <Box position="relative" h="250px" overflow="hidden" bg="gray.100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _groupHover={{ transform: 'scale(1.05)' }}
                    loading={isEagerLoad(index) ? 'eager' : 'lazy'}
                  />
                </Box>

                {/* Service Info */}
                <VStack align="start" spacing={3} p={6}>
                  <Heading as="h3" size="md" color="brand.800">
                    {service.title}
                  </Heading>
                  <Text color="brand.600" fontSize="sm" fontWeight="600">
                    {service.description}
                  </Text>
                  <Text 
                    color="gray.600" 
                    fontSize="sm" 
                    lineHeight="1.6"
                    noOfLines={expandedId === service.id ? undefined : 3}
                  >
                    {service.details}
                  </Text>

                  <Button
                    as={RouterLink}
                    to={`/services/${service.id}`}
                    colorScheme="brand"
                    size="sm"
                    rightIcon={<Icon as={FaArrowRight} />}
                    mt={2}
                  >
                    Learn More
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}
