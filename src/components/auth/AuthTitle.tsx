type AuthTitleProps = {
  text: string
}

const AuthTitle = ({ text }: AuthTitleProps) => {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col gap-2">
      <img
        src="/TrelloFakeLogo.svg"
        alt="logo"
        className="w-48 mx-auto" />

      <p className="text-center text-gray-600">
        {text}
      </p>
    </div>
  )
}

export default AuthTitle