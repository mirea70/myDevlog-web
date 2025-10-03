import Layout from '@/components/Layout';
import { Github, Twitter, Mail, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">B</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              안녕하세요, 개발자입니다
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              프론트엔드 개발에 열정을 가지고 있으며, 
              새로운 기술을 배우고 공유하는 것을 좋아합니다.
            </p>
          </div>

          {/* About Content */}
          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">소개</h2>
                <p className="text-gray-600 mb-4">
                  안녕하세요! 저는 웹 개발자로서 5년 이상의 경험을 가지고 있습니다. 
                  주로 React, Next.js, TypeScript를 사용하여 현대적인 웹 애플리케이션을 개발하고 있습니다.
                </p>
                <p className="text-gray-600 mb-4">
                  사용자 경험을 중시하며, 성능과 접근성을 고려한 개발을 지향합니다. 
                  새로운 기술을 배우고 이를 팀과 공유하는 것을 즐깁니다.
                </p>
                <p className="text-gray-600">
                  이 블로그에서는 개발 과정에서 얻은 경험과 지식을 공유하고, 
                  다른 개발자들과 함께 성장하고자 합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">기술 스택</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">프론트엔드</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">백엔드</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">도구</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'Docker', 'AWS', 'Vercel', 'Figma'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">경력</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">시니어 프론트엔드 개발자</h3>
                  <p className="text-gray-600">Tech Company • 2022 - 현재</p>
                  <p className="text-gray-600 mt-2">
                    React와 Next.js를 사용한 대규모 웹 애플리케이션 개발 및 팀 리딩
                  </p>
                </div>
                
                <div className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">프론트엔드 개발자</h3>
                  <p className="text-gray-600">Startup Inc. • 2020 - 2022</p>
                  <p className="text-gray-600 mt-2">
                    React 기반의 웹 애플리케이션 개발 및 UI/UX 개선
                  </p>
                </div>
                
                <div className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">주니어 개발자</h3>
                  <p className="text-gray-600">Web Agency • 2019 - 2020</p>
                  <p className="text-gray-600 mt-2">
                    다양한 클라이언트 프로젝트의 프론트엔드 개발
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">연락하기</h2>
              <p className="text-gray-600 mb-6">
                프로젝트 협업이나 기술적인 질문이 있으시면 언제든 연락해주세요!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail size={20} />
                  <span>contact@example.com</span>
                </a>
                
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={20} />
                  <span>서울, 대한민국</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
