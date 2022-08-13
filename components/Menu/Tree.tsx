const Menu = (props: any) => {
  const { data } = props;

  return (
    <div>
      {data.length > 0 &&
        data.map((item:any) => {
          return (
            <div key={item.id}>
              <div>{item.title}</div>
              <div style={{ marginLeft: "10px" }}>
                {item.children?.length && <Menu data={item.children}></Menu>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Menu;
