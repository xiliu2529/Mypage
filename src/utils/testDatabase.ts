// 测试数据库功能的工具函数
import { articleService } from '../services/articleService';

export const testDatabase = () => {
  console.log('🧪 开始测试数据库功能...');
  
  try {
    // 测试创建文章
    console.log('1. 测试创建文章...');
    const newArticle = articleService.createArticle({
      title: '测试文章标题',
      content: '<p>这是一篇测试文章的内容。</p><h2>子标题</h2><ul><li>列表项1</li><li>列表项2</li></ul>'
    });
    console.log('✅ 创建文章成功:', newArticle);
    
    // 测试获取所有文章
    console.log('2. 测试获取所有文章...');
    const allArticles = articleService.getArticles();
    console.log('✅ 获取文章成功，文章数量:', allArticles.length);
    
    // 测试根据ID获取文章
    console.log('3. 测试根据ID获取文章...');
    const foundArticle = articleService.getArticleById(newArticle.id);
    console.log('✅ 根据ID获取文章成功:', foundArticle?.title);
    
    // 测试搜索文章
    console.log('4. 测试搜索文章...');
    const searchResults = articleService.searchArticles('测试');
    console.log('✅ 搜索文章成功，找到文章数量:', searchResults.length);
    
    // 测试更新文章
    console.log('5. 测试更新文章...');
    const updatedArticle = articleService.updateArticle({
      id: newArticle.id,
      title: '更新后的测试文章标题'
    });
    console.log('✅ 更新文章成功:', updatedArticle?.title);
    
    console.log('🎉 所有数据库测试通过！');
    return true;
  } catch (error) {
    console.error('❌ 数据库测试失败:', error);
    return false;
  }
};

// 在浏览器控制台中运行测试
if (typeof window !== 'undefined') {
  (window as any).testDatabase = testDatabase;
  console.log('💡 在控制台输入 testDatabase() 来测试数据库功能');
}