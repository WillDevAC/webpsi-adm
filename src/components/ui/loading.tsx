import { ThreeDots } from "react-loader-spinner";

interface ILoadingProps {
  color: string;
  size: string;
}

export function Loading({ color, size }: ILoadingProps) {
  return (
    <>
      <ThreeDots height={size} width={size} color={color} />
    </>
  );
}
