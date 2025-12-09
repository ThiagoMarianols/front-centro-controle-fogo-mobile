import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    marginTop: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
    marginTop: 16,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  userSubtitle: {
    fontSize: 16,
    color: '#FF6B35',
    marginTop: 8,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#2a2f4a',
  },
  infoItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2f4a',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    lineHeight: 22,
  },
  loadingContainer: {
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    padding: 40,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#999',
    fontSize: 16,
    marginTop: 16,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
