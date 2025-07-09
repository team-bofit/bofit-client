const LoginPage = () => {
  const handleError = () => {
    throw new Error('로그인 페이지에서 오류 발생');
  };
  return (
    <div>
      LoginPage
      <button onClick={handleError}>하하하</button>
    </div>
  );
};

export default LoginPage;
