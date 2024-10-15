const FormErrorMessage = ({ err }: { err: string }) => {
  return <div className="text-red-500 text-xs p-1">{err}</div>;
};

export default FormErrorMessage;
