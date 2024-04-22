import React from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FaqPage.module.scss';
const faqs = [
    { question: "What types of tea do you produce?", answer: "We produce black, green, oolong, and herbal teas." },
    { question: "How is your tea sourced?", answer: "Our tea is sourced directly from sustainable farms in various regions including China, India, and Kenya." },
    { question: "Can I visit your tea factory?", answer: "Yes, we offer guided tours of our factory from March to September. Please book in advance." },
    { question: "Do you provide international shipping?", answer: "Yes, we ship internationally. Shipping costs vary by destination and order size." },
    { question: "How should I store tea to keep it fresh?", answer: "Store tea in a cool, dry place away from direct sunlight. Use an airtight container to maintain freshness." },
    { question: "What is the shelf life of your teas?", answer: "Most of our teas have a shelf life of 18 to 24 months when stored properly in an airtight container away from light and moisture." },
    { question: "Are your teas organic?", answer: "Many of our teas are certified organic. Please check the product description for the organic certification label." },
    { question: "Do you offer tea tastings?", answer: "Yes, we host tea tasting sessions at our factory. These sessions are by appointment only, so please contact us to schedule one." },
    { question: "Can I customize my tea order?", answer: "Yes, we offer custom blending services for large orders. Contact us directly for more information and to discuss your needs." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and direct bank transfers for larger orders." },
    { question: "Do you have any loyalty or rewards program?", answer: "Yes, we have a loyalty program for returning customers which offers discounts and early access to new products." },
    { question: "What is your return policy?", answer: "We accept returns on unopened products within 30 days of purchase. Please see our website for detailed terms and conditions." },
    { question: "How do I know the tea I am buying is fresh?", answer: "We provide a 'packed on' date for all our teas, so you can be assured of its freshness." },
    { question: "Are there any benefits to drinking your teas?", answer: "Tea is rich in antioxidants and has been linked with various health benefits, including better heart health and reduced risks of certain diseases. Specific benefits can vary based on the type of tea." },
    { question: "Do you have any recommendations for first-time tea drinkers?", answer: "For new tea drinkers, we recommend starting with our sampler packs, which offer a variety of flavors to help you discover what you like best." }
];

const FaqPage = () => {
  return (
    <section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
    <Container maxWidth="md" sx={{ mt: 8, }}>
    <Typography variant="h4" gutterBottom>
      Frequently Asked Questions
    </Typography>
    {faqs.map((faq, index) => (
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel1a-header-${index}`}
        >
          <Typography sx={{color:"white"}} >{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {faq.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Container>
  </section>
);
};
export default FaqPage