import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Personal Data', 'sub1', <MailOutlined />),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />),
  getItem('Navigation Three', 'sub4', <SettingOutlined />),
];

const SettingBar = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div className='settingbar' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          flex: 1,
        }}
        defaultSelectedKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SettingBar;
