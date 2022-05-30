import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function IsUserRedirect(props) {
  const { user, loggedInPath, children } = props;

  const router = useRouter();

  if (!user) {
    return children;
  }

  if (user && typeof window !== 'undefined') {
    router.push(loggedInPath);
  }

  return null;
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(IsUserRedirect);
