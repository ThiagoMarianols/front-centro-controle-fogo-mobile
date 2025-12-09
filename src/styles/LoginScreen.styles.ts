import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Hero Section
  heroSection: {
    height: height * 0.42,
    backgroundColor: '#1a1f3a',
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 4,
    textAlign: 'center',
  },
  heroTitleBold: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#FF6B35',
    marginVertical: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 1,
  },
  // Login Card
  loginCard: {
    flex: 1,
    backgroundColor: '#0A0E27',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32,
  },
  // Form
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  required: {
    color: '#FF6B35',
    fontSize: 14,
  },
  inputWrapper: {
    backgroundColor: '#1a1f3a',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputWrapperError: {
    borderColor: '#FF6B6B',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#fff',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 4,
    gap: 6,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    flex: 1,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B35',
  },
  rememberMeText: {
    color: '#999',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#804020',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#1a1f3a',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  footerVersion: {
    color: '#444',
    fontSize: 10,
    textAlign: 'center',
  },
});
