import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const SettingBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon, children, type, onClick) {
    const isSelected = location.pathname === `/settings/${key}`;
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick,
      isSelected,
    };
  }

  const items = [
    getItem('Personal Data', 'personalData', <MailOutlined />, null, null, () => navigate('/settings/personalData')),
    getItem('Description', 'bioandskills', <AppstoreOutlined />, null, null, () => navigate('/settings/bioandskills')),
    getItem('Change Your Password', 'changepassword', <SettingOutlined />, null, null, () => navigate('/settings/changepassword')),
    getItem('Balance Management', 'balancemanagement', <SettingOutlined />, null, null, () => navigate('/settings/balancemanagement')),
  ];

  const selectedKeys = items.filter((item) => item.isSelected).map((item) => item.key);

  return (
    <div className='settingbar' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu
        style={{
          width: 256,
          flex: 1,
        }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </div>
  );
};

export default SettingBar;
