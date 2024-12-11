const MyNodeComponent: FC<ComponentProps> = ({ props }) => {
  console.log('Received props:', props)
  return (
    <div
      style={{
        color: '#fff',
      }}
    >
      test
    </div>
  )
}
export default MyNodeComponent
