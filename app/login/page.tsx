'use client';

import React from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    // 1. Kéo mảng người dùng từ bộ nhớ máy tính lên
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 2. Kiểm tra tài khoản mật khẩu
    const foundUser = existingUsers.find((u: any) => u.email === values.email && u.password === values.password);

    if (foundUser) {
      // 3. Nếu đúng, lưu trạng thái "Đã đăng nhập"
      localStorage.setItem('currentUser', JSON.stringify({ email: foundUser.email, fullName: foundUser.fullName }));
      message.success(`Chào mừng trở lại, ${foundUser.fullName}!`);
      router.push('/profile'); 
    } else {
      message.error('Email hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#001529', margin: 0 }}>Đăng Nhập</Title>
          <Text type="secondary">Chào mừng bạn trở lại VibeSpace</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập Email!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" size="large" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#001529', height: '45px' }}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text>Chưa có tài khoản? <Link href="/register" style={{ color: '#1677ff' }}>Đăng ký ngay</Link></Text>
        </div>
      </Card>
    </div>
  );
}