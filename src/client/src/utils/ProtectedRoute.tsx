import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function ProtectedRoute(props) {
  const { user, redirectPath, children } = props;

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
  user: state.user.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
