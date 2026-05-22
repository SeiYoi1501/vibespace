'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Avatar, Result, Space } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); 
    router.push('/login');
  };

  if (!isClient) return null;

  if (!user) {
    return (
      <div style={{ padding: '60px 20px' }}>
        <Result
          status="403"
          title="Bạn chưa đăng nhập"
          subTitle="Vui lòng đăng nhập để xem thông tin hồ sơ."
          extra={<Button type="primary" style={{ backgroundColor: '#001529' }} onClick={() => router.push('/login')}>Đăng nhập ngay</Button>}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card style={{ borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#001529', marginBottom: '20px' }} />
        <Title level={2}>{user.fullName}</Title>
        <Space direction="vertical">
          <Text type="secondary" style={{ fontSize: '16px' }}>
            <MailOutlined /> {user.email}
          </Text>
          <Text type="secondary">Thành viên chính thức của VibeSpace</Text>
        </Space>
        
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
          <Button type="primary" danger icon={<LogoutOutlined />} size="large" onClick={handleLogout}>
            Đăng Xuất
          </Button>
        </div>
      </Card>
    </div>
  );
}