// Email validation utility to prevent fake/temporary emails

// Allowed email domains - only major trusted providers
const ALLOWED_DOMAINS = [
  // Google
  'gmail.com',
  
  // Microsoft
  'outlook.com', 
  'hotmail.com',
  'live.com',
  
  // Apple
  'icloud.com',
  'me.com',
  'mac.com',
  
  // Yahoo (major provider)
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.ca',
  'yahoo.com.au',
  
  // Other major established providers only
  'aol.com'
];

// Known temporary/disposable email domains (comprehensive blocklist)
const TEMP_EMAIL_DOMAINS = [
  // Popular temporary email services
  '10minutemail.com',
  '10minutemail.org',
  '10minutemail.net',
  'tempmail.org',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'mailinator.com',
  'yopmail.com',
  'throwaway.email',
  'maildrop.cc',
  'mohmal.com',
  'sharklasers.com',
  'grr.la',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'bccto.me',
  'chacuo.net',
  'dispostable.com',
  'emailondeck.com',
  'fakeinbox.com',
  'hide.biz.st',
  'mytrashmail.com',
  'no-spam.ws',
  'nowmymail.com',
  'sogetthis.com',
  'spambog.com',
  'spambog.de',
  'spambog.ru',
  'spamgourmet.com',
  'spamhole.com',
  'spamify.com',
  'spammotel.com',
  'spamthis.co.uk',
  'tempinbox.com',
  'tmailinator.com',
  'trashmail.at',
  'trashmail.com',
  'trashmail.de',
  'trashmail.me',
  'trashmail.net',
  'trashmail.org',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'zehnminuten.de',
  'zetmail.com',
  '0-mail.com',
  '0815.ru',
  '0clickemail.com',
  '0wnd.net',
  '0wnd.org',
  '10mail.org',
  '20email.eu',
  '2prong.com',
  '30minutemail.com',
  '3d-painting.com',
  '4warding.com',
  '4warding.net',
  '4warding.org',
  '9ox.net',
  
  // Additional comprehensive list
  'tempemail.com',
  'tempemailaddress.com',
  'tempr.email',
  'tempmail.email',
  'tempmail.plus',
  'tempmail24.com',
  'temporary-email.net',
  'temporaryemail.us',
  'temporarymail.com',
  'disposable.email',
  'disposableemailaddresses.com',
  'disposablemail.com',
  'fakemailgenerator.com',
  'fastmail.fm',
  'getnada.com',
  'incognitomail.org',
  'instant-email.org',
  'jetable.org',
  'mailcatch.com',
  'maildrop.info',
  'maildx.com',
  'mailforspam.com',
  'mailnesia.com',
  'mailsac.com',
  'mailtemp.info',
  'minuteinbox.com',
  'nada.email',
  'pookmail.com',
  'quickinbox.com',
  'receivesmsonline.net',
  'spambox.us',
  'spamheroes.com',
  'spaml.de',
  'spammask.com',
  'super-sam.com',
  'superrito.com',
  'tafmail.com',
  'tempmailaddress.com',
  'tempsky.com',
  'thanksnospam.info',
  'throwawayemailaddresses.com',
  'tmail.ws',
  'tmpmail.net',
  'tmpmail.org',
  'trashinbox.com',
  'trash-amil.com',
  'trbvm.com',
  'tryalert.com',
  'tvchd.com',
  'twinmail.de',
  'u14269.ml',
  'upliftnow.com',
  'veryrealemail.com',
  'vpn.st',
  'walala.org',
  'whyspam.me',
  'willselfdestruct.com',
  'xemaps.com',
  'xents.com',
  'yep.it',
  'yomail.info',
  'z1p.biz'
];

// Additional suspicious patterns
const SUSPICIOUS_PATTERNS = [
  /temp/i,
  /fake/i,
  /disposable/i,
  /trash/i,
  /throw/i,
  /spam/i,
  /guerrilla/i,
  /mailinator/i,
  /yopmail/i,
  /10min/i,
  /\d{2,}min/i // patterns like 20min, 30min etc.
];

export interface EmailValidationResult {
  isValid: boolean;
  isAllowed: boolean;
  error?: string;
  provider?: string;
}

export class EmailValidator {
  
  /**
   * Comprehensive email validation
   */
  static validateEmail(email: string): EmailValidationResult {
    // Basic email format validation
    const basicValidation = this.isValidEmailFormat(email);
    if (!basicValidation.isValid) {
      return basicValidation;
    }

    // Extract domain
    const domain = email.toLowerCase().split('@')[1];
    
    // Check if domain is in allowed list
    if (!this.isDomainAllowed(domain)) {
      return {
        isValid: false,
        isAllowed: false,
        error: `Only Gmail, Outlook, iCloud, Yahoo, and AOL email addresses are allowed. Please use one of these trusted providers.`,
        provider: domain
      };
    }

    // Check if domain is a known temporary email service
    if (this.isTempEmailDomain(domain)) {
      return {
        isValid: false,
        isAllowed: false,
        error: `Temporary and disposable email addresses are not allowed. Please use a permanent email from Gmail, Outlook, iCloud, Yahoo, or AOL.`,
        provider: domain
      };
    }

    // Check for suspicious patterns
    if (this.hasSuspiciousPattern(domain)) {
      return {
        isValid: false,
        isAllowed: false,
        error: `This email provider is not allowed. Please use a trusted email service.`,
        provider: domain
      };
    }

    return {
      isValid: true,
      isAllowed: true,
      provider: domain
    };
  }

  /**
   * Basic email format validation
   */
  private static isValidEmailFormat(email: string): EmailValidationResult {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email || email.trim() === '') {
      return {
        isValid: false,
        isAllowed: false,
        error: 'Email address is required.'
      };
    }

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        isAllowed: false,
        error: 'Please enter a valid email address.'
      };
    }

    return {
      isValid: true,
      isAllowed: true
    };
  }

  /**
   * Check if domain is in the allowed list
   */
  private static isDomainAllowed(domain: string): boolean {
    return ALLOWED_DOMAINS.includes(domain.toLowerCase());
  }

  /**
   * Check if domain is a known temporary email service
   */
  private static isTempEmailDomain(domain: string): boolean {
    return TEMP_EMAIL_DOMAINS.includes(domain.toLowerCase());
  }

  /**
   * Check for suspicious patterns in domain
   */
  private static hasSuspiciousPattern(domain: string): boolean {
    return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(domain));
  }

  /**
   * Get the list of allowed domains
   */
  static getAllowedDomains(): string[] {
    return [...ALLOWED_DOMAINS];
  }

  /**
   * Check if a specific domain is allowed
   */
  static isSpecificDomainAllowed(domain: string): boolean {
    return this.isDomainAllowed(domain);
  }

  /**
   * Add a new allowed domain (for admin purposes)
   */
  static addAllowedDomain(domain: string): void {
    const cleanDomain = domain.toLowerCase().trim();
    if (!ALLOWED_DOMAINS.includes(cleanDomain)) {
      ALLOWED_DOMAINS.push(cleanDomain);
    }
  }

  /**
   * Get email provider name for display
   */
  static getProviderDisplayName(email: string): string {
    const domain = email.toLowerCase().split('@')[1];
    
    switch (domain) {
      case 'gmail.com':
        return 'Gmail';
      case 'outlook.com':
      case 'hotmail.com':
      case 'live.com':
      case 'msn.com':
        return 'Microsoft';
      case 'icloud.com':
      case 'me.com':
      case 'mac.com':
      case 'apple.com':
        return 'Apple';
      case 'yahoo.com':
        return 'Yahoo';
      case 'aol.com':
        return 'AOL';
      case 'protonmail.com':
        return 'ProtonMail';
      case 'tutanota.com':
        return 'Tutanota';
      default:
        return domain;
    }
  }
}

// Export for easy use
export const validateEmail = EmailValidator.validateEmail.bind(EmailValidator);
export const isEmailAllowed = (email: string) => EmailValidator.validateEmail(email).isAllowed;