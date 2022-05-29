import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function ProtectedRoute(props) {
  const { auth, redirectPath, children } = props;
  const user = !!auth.uid;

  const router = useRouter();

  if (user) {
    return children;
  }

  if (!user && typeof window !== 'undefined') {
    router.push(redirectPath);
  }

  return null;
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
