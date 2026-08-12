import { business } from "../data/business";

/**
 * Build a wa.me deep link with a pre-filled, context-aware message.
 * Passing a project/property name produces an enquiry the sales team can act
 * on without a follow-up question.
 */
export const whatsappLink = (context) => {
  const number = business.contact.whatsappNumber;
  const message = context
    ? `Hi, I'm interested in ${context}. I'd like to know more about availability and pricing.`
    : `Hi, I'd like to know more about properties available with ${business.brand.name} in Thanjavur.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export default whatsappLink;
