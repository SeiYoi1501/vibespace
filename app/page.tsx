'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Typography, Tag, Spin, Space, message } from 'antd';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { EventType } from '@/data/events';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export default function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // LƯU Ý QUAN TRỌNG: Hãy nhớ thay 'LINK_MOCKAPI_CỦA_BẠN' bằng link thật nhé!
const response = await fetch('https://6a0ffebcd2a9857070361e24.mockapi.io/events');        if (!response.ok) throw new Error('Không thể tải dữ liệu');
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        message.error('Lỗi kết nối API Server!');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const safeEvents = events || [];
  const filteredEvents = selectedCategory === 'All' 
    ? safeEvents 
    : safeEvents.filter(e => e.category === selectedCategory);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải các sự kiện giải trí..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={2} style={{ color: '#001529' }}>Trải Nghiệm Văn Hóa & Giải Trí Không Giới Hạn</Title>
        <Paragraph style={{ fontSize: '16px' }}>Khám phá các lễ hội âm nhạc, triển lãm nghệ thuật và các sự kiện văn hóa đặc sắc nhất.</Paragraph>
      </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <Space size="middle" wrap>
          <Button shape="round" type={selectedCategory === 'All' ? 'primary' : 'default'} onClick={() => setSelectedCategory('All')}>Tất cả sự kiện</Button>
          <Button shape="round" type={selectedCategory === 'Âm nhạc' ? 'primary' : 'default'} onClick={() => setSelectedCategory('Âm nhạc')}>🎤 Âm nhạc</Button>
          <Button shape="round" type={selectedCategory === 'Triển lãm' ? 'primary' : 'default'} onClick={() => setSelectedCategory('Triển lãm')}>🎨 Triển lãm</Button>
          <Button shape="round" type={selectedCategory === 'Lễ hội' ? 'primary' : 'default'} onClick={() => setSelectedCategory('Lễ hội')}>🎭 Lễ hội</Button>
          <Button shape="round" type={selectedCategory === 'Điện ảnh' ? 'primary' : 'default'} onClick={() => setSelectedCategory('Điện ảnh')}>🎬 Điện ảnh</Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {filteredEvents.map((event) => (
          <Col xs={24} sm={12} md={8} key={event.id}>
            <Card
              hoverable
              style={{ borderRadius: '12px', overflow: 'hidden' }}
              cover={<img alt={event.title} src={event.imageUrl} style={{ height: '220px', objectFit: 'cover' }} />}
              actions={[
                <Link href={`/events/${event.id}`} key="view">
                  <Button type="primary" style={{ backgroundColor: '#001529' }} shape="round">Xem Chi Tiết</Button>
                </Link>
              ]}
            >
              <Meta
                title={<span style={{ fontSize: '18px', whiteSpace: 'normal', color: '#001529' }}>{event.title}</span>}
                description={
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <Tag icon={<CalendarOutlined />} color="blue">
                        {new Date(event.date).toLocaleDateString('vi-VN')}
                      </Tag>
                      <br/>
                      <Tag icon={<EnvironmentOutlined />} color="cyan" style={{ marginTop: '5px', whiteSpace: 'normal' }}>
                        {event.location}
                      </Tag>
                    </div>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: '10px' }}>{event.description}</Paragraph>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}