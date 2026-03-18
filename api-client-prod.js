// AI导演工作室 - 生产环境API客户端
// 用于GitHub Pages部署，需要配合外部API服务器使用

class AIDirectorClient {
  constructor(baseUrl = null) {
    // 生产环境API服务器地址
    // 需要部署API服务器到云服务（如Vercel、Railway等）
    this.baseUrl = baseUrl || 'https://ai-director-api.yourdomain.com';
    this.apiKey = null;
    this.agentContexts = {
      director: [],
      screenwriter: [],
      visual: [],
      dreamai: [],
      storyboard: []
    };
  }

  // 设置API密钥
  async setApiKey(apiKey) {
    try {
      const response = await fetch(`${this.baseUrl}/api/set-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });

      const data = await response.json();
      
      if (data.success) {
        this.apiKey = apiKey;
        console.log('🔑 API密钥设置成功');
        return { success: true };
      } else {
        throw new Error(data.error || '设置API密钥失败');
      }
    } catch (error) {
      console.error('设置API密钥错误:', error);
      return { success: false, error: error.message };
    }
  }

  // 与智能体聊天
  async chatWithAgent(agent, message, useStream = false) {
    if (!this.apiKey) {
      throw new Error('请先设置API密钥');
    }

    const context = this.agentContexts[agent] || [];
    
    if (useStream) {
      return this.streamChat(agent, message, context);
    } else {
      return this.normalChat(agent, message, context);
    }
  }

  // 普通聊天
  async normalChat(agent, message, context) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat/${agent}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message, 
          context 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // 更新上下文
        this.agentContexts[agent].push({ role: 'user', content: message });
        this.agentContexts[agent].push({ role: 'assistant', content: data.response });
        
        // 限制上下文长度
        if (this.agentContexts[agent].length > 20) {
          this.agentContexts[agent] = this.agentContexts[agent].slice(-20);
        }
        
        return data;
      } else {
        throw new Error(data.error || '智能体响应失败');
      }
    } catch (error) {
      console.error('聊天错误:', error);
      return { 
        success: false, 
        error: error.message,
        response: `抱歉，${this.getAgentName(agent)}暂时无法响应。请检查网络连接或API密钥。`
      };
    }
  }

  // 流式聊天（暂不支持）
  async streamChat(agent, message, context) {
    console.log('⚠️ 流式聊天在生产环境暂未实现');
    return this.normalChat(agent, message, context);
  }

  // 获取智能体信息
  async getAgentInfo(agent) {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/${agent}`);
      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.error || '获取智能体信息失败');
      }
    } catch (error) {
      console.error('获取智能体信息错误:', error);
      return { 
        success: false, 
        error: error.message,
        agent: this.getDefaultAgentInfo(agent)
      };
    }
  }

  // 获取所有智能体
  async getAgents() {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents`);
      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.error || '获取智能体列表失败');
      }
    } catch (error) {
      console.error('获取智能体列表错误:', error);
      return { 
        success: false, 
        error: error.message,
        agents: this.getDefaultAgents()
      };
    }
  }

  // 健康检查
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('健康检查错误:', error);
      return { 
        status: 'unhealthy',
        service: 'AI导演工作室API',
        version: '1.0.0',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // 清除智能体上下文
  clearAgentContext(agent) {
    if (this.agentContexts[agent]) {
      this.agentContexts[agent] = [];
      console.log(`🧹 已清除${this.getAgentName(agent)}的上下文`);
      return true;
    }
    return false;
  }

  // 获取智能体名称
  getAgentName(agent) {
    const names = {
      director: 'AI导演',
      screenwriter: '总编剧',
      visual: '视觉风格智能体',
      dreamai: 'DreamAI专家',
      storyboard: '分镜智能体'
    };
    return names[agent] || '智能体';
  }

  // 默认智能体信息
  getDefaultAgentInfo(agent) {
    const info = {
      director: {
        name: 'AI导演',
        role: '创作总指挥',
        description: '负责整体协调、任务分配、进度监控和质量控制',
        capabilities: ['项目规划', '团队协调', '质量控制', '艺术指导']
      },
      screenwriter: {
        name: '总编剧',
        role: '故事架构师',
        description: '负责故事创作、角色设计、情节发展和剧本优化',
        capabilities: ['故事创作', '角色设计', '情节发展', '对话写作']
      },
      visual: {
        name: '视觉风格智能体',
        role: '视觉研究员',
        description: '研究视觉风格特征，创建风格指南，提供视觉方向指导',
        capabilities: ['色彩设计', '构图指导', '灯光设计', '视觉风格']
      },
      dreamai: {
        name: 'DreamAI专家',
        role: '技术专家',
        description: '精通AI工具套件，优化提示词和参数，确保生成质量',
        capabilities: ['提示词优化', '参数调整', '技术诊断', '方案设计']
      },
      storyboard: {
        name: '分镜智能体',
        role: '视觉叙事师',
        description: '将剧本转化为视觉语言，设计镜头、构图、节奏和分镜',
        capabilities: ['镜头规划', '节奏控制', '故事板制作', '视觉叙事']
      }
    };
    
    return info[agent] || {
      name: '未知智能体',
      role: '专业助手',
      description: '该智能体信息暂时无法获取',
      capabilities: ['基础对话']
    };
  }

  // 默认智能体列表
  getDefaultAgents() {
    return [
      { id: 'director', name: 'AI导演', status: 'offline' },
      { id: 'screenwriter', name: '总编剧', status: 'offline' },
      { id: 'visual', name: '视觉风格', status: 'offline' },
      { id: 'dreamai', name: 'DreamAI专家', status: 'offline' },
      { id: 'storyboard', name: '分镜智能体', status: 'offline' }
    ];
  }

  // 自动检测API服务器
  async autoDetectServer() {
    const possibleUrls = [
      'https://ai-director-api.vercel.app',
      'https://ai-director-api.onrender.com',
      'https://ai-director-api.railway.app',
      'http://localhost:3001' // 开发环境
    ];

    for (const url of possibleUrls) {
      try {
        console.log(`🔍 尝试连接: ${url}`);
        const response = await fetch(`${url}/api/health`, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000) // 3秒超时
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'healthy') {
            this.baseUrl = url;
            console.log(`✅ 检测到API服务器: ${url}`);
            return url;
          }
        }
      } catch (error) {
        console.log(`❌ 连接失败: ${url}`);
        continue;
      }
    }
    
    console.log('⚠️ 未检测到可用的API服务器');
    return null;
  }
}

// 创建全局实例
window.AIDirectorAPI = new AIDirectorClient();

// 自动检测服务器
(async function() {
  console.log('🚀 AI导演工作室API客户端初始化...');
  
  // 尝试自动检测服务器
  const detectedUrl = await window.AIDirectorAPI.autoDetectServer();
  
  if (detectedUrl) {
    console.log(`✅ 使用API服务器: ${detectedUrl}`);
  } else {
    console.log('⚠️ 请手动设置API服务器地址');
    console.log('💡 提示: 需要部署API服务器到云服务，然后更新api-client-prod.js中的baseUrl');
  }
})();

console.log('🤖 AI导演工作室生产环境API客户端已加载');