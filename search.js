// 全文搜索功能
class FullTextSearch {
    constructor() {
        this.searchBox = document.getElementById('searchBox');
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--gray-200);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        // 将搜索结果容器添加到搜索框后面
        this.searchBox.parentNode.style.position = 'relative';
        this.searchBox.parentNode.appendChild(this.searchResults);
        
        // 存储所有内容章节的数据
        this.sectionsData = [];
        this.init();
    }
    
    init() {
        // 提取所有章节的内容数据
        this.extractSectionsData();
        
        // 绑定搜索事件
        this.bindEvents();
    }
    
    // 提取所有章节的内容数据
    extractSectionsData() {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            const id = section.id;
            const title = section.querySelector('h2') ? section.querySelector('h2').textContent : '';
            const content = section.textContent;
            
            this.sectionsData.push({
                id,
                title,
                content,
                element: section
            });
        });
    }
    
    // 绑定搜索事件
    bindEvents() {
        // 输入事件
        this.searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            this.performSearch(searchTerm);
        });
        
        // 点击外部关闭搜索结果
        document.addEventListener('click', (e) => {
            if (!this.searchBox.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });
        
        // 键盘导航
        this.searchBox.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideResults();
            }
            
            if (e.key === 'Enter') {
                const firstResult = this.searchResults.querySelector('.search-result-item');
                if (firstResult) {
                    firstResult.click();
                }
            }
        });
    }
    
    // 执行搜索
    performSearch(searchTerm) {
        if (!searchTerm) {
            this.hideResults();
            this.showAllSections();
            return;
        }
        
        const results = this.searchSections(searchTerm);
        this.displayResults(results, searchTerm);
        
        // 隐藏所有章节
        this.hideAllSections();
    }
    
    // 在所有章节中搜索
    searchSections(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase();
        
        this.sectionsData.forEach(section => {
            // 在标题和内容中搜索
            const titleMatch = section.title.toLowerCase().includes(term);
            const contentMatch = section.content.toLowerCase().includes(term);
            
            if (titleMatch || contentMatch) {
                // 找到匹配的段落
                const matches = this.findMatches(section.content, searchTerm);
                
                results.push({
                    id: section.id,
                    title: section.title,
                    matches: matches.slice(0, 3), // 限制每个章节最多显示3个匹配项
                    element: section.element
                });
            }
        });
        
        return results;
    }
    
    // 查找匹配的文本段落
    findMatches(content, searchTerm) {
        const matches = [];
        const term = searchTerm.toLowerCase();
        const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
        
        for (const paragraph of paragraphs) {
            if (paragraph.toLowerCase().includes(term)) {
                // 高亮匹配的关键词
                const highlighted = this.highlightMatch(paragraph, searchTerm);
                matches.push(highlighted);
                
                if (matches.length >= 3) break; // 限制每个段落最多3个匹配
            }
        }
        
        return matches;
    }
    
    // 高亮匹配的关键词
    highlightMatch(text, searchTerm) {
        const term = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义特殊字符
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    // 显示搜索结果
    displayResults(results, searchTerm) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: var(--gray-600);">
                    未找到与 "${searchTerm}" 相关的内容
                </div>
            `;
            this.showResults();
            return;
        }
        
        let html = '';
        
        results.forEach(result => {
            html += `
                <div class="search-result-item" 
                     data-section-id="${result.id}" 
                     style="padding: 1rem; border-bottom: 1px solid var(--gray-100); cursor: pointer; transition: var(--transition);">
                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: var(--primary);">
                        ${result.title}
                    </div>
            `;
            
            result.matches.forEach(match => {
                html += `<div style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--gray-700);">...${match}...</div>`;
            });
            
            html += `</div>`;
        });
        
        this.searchResults.innerHTML = html;
        
        // 绑定点击事件
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const sectionId = item.getAttribute('data-section-id');
                this.navigateToSection(sectionId);
            });
            
            item.addEventListener('mouseenter', () => {
                item.style.background = 'var(--gray-100)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'white';
            });
        });
        
        this.showResults();
    }
    
    // 导航到指定章节
    navigateToSection(sectionId) {
        this.hideResults();
        this.searchBox.value = '';
        
        const section = document.getElementById(sectionId);
        if (section) {
            // 显示该章节及其父级容器
            section.style.display = 'block';
            section.scrollIntoView({ behavior: 'smooth' });
            
            // 高亮显示3秒
            section.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
            setTimeout(() => {
                section.style.backgroundColor = '';
            }, 3000);
        }
    }
    
    // 显示搜索结果
    showResults() {
        this.searchResults.style.display = 'block';
    }
    
    // 隐藏搜索结果
    hideResults() {
        this.searchResults.style.display = 'none';
    }
    
    // 显示所有章节
    showAllSections() {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'block';
        });
    }
    
    // 隐藏所有章节
    hideAllSections() {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
    }
}

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加搜索高亮样式
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: #fff3cd;
            padding: 0.1em 0.2em;
            border-radius: 3px;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // 初始化全文搜索
    window.fullTextSearch = new FullTextSearch();
});