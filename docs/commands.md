# TaskApp AI Commands

Tài liệu các command prompts để sử dụng với Cursor AI cho việc phát triển TaskApp.

## 🎯 Overview

Các command này được thiết kế để hỗ trợ quy trình phát triển AI-powered với Cursor, giúp tăng năng suất và đảm bảo chất lượng code.

## 📋 Command List

### 1. **create-brief**

Tạo product brief cho tính năng mới hoặc cập nhật product brief hiện tại.

### 2. **plan-feature**

Lập kế hoạch chi tiết cho tính năng mới, bao gồm technical analysis và implementation steps.

### 3. **code-review**

Đánh giá code tự động, kiểm tra chất lượng, security, performance và compliance.

---

## 🚀 Command Details

### 1. **create-brief** Command

#### Usage

```
@create-brief [feature-name] [target-audience] [business-goal]
```

#### Description

Tạo hoặc cập nhật product brief cho tính năng mới, bao gồm:

- Tổng quan tính năng
- Đối tượng người dùng
- Mục tiêu kinh doanh
- Success metrics
- Technical requirements

#### Example

```
@create-brief "Task Collaboration" "Team Users" "Increase user engagement by 40%"
```

#### Output Template

```markdown
# [Feature Name] Product Brief

## 📋 Feature Overview

[Detailed description of the feature]

## 👥 Target Audience

[Who will use this feature]

## 🎯 Business Goals

[What business objectives this feature achieves]

## 📊 Success Metrics

[How to measure success]

## 🛠️ Technical Requirements

[Technical specifications and constraints]

## 🎨 User Experience

[UX considerations and design requirements]

## 📅 Timeline

[Estimated development timeline]

## 🔗 Dependencies

[Other features or systems this depends on]
```

---

### 2. **plan-feature** Command

#### Usage

```
@plan-feature [feature-name] [complexity-level] [timeline]
```

#### Description

Lập kế hoạch chi tiết cho tính năng mới, bao gồm:

- Phân tích các file cần thay đổi
- Database schema changes
- API endpoints
- UI components
- Implementation steps

#### Example

```
@plan-feature "Real-time Notifications" "medium" "2 weeks"
```

#### Output Template

```markdown
# [Feature Name] Implementation Plan

## 📋 Feature Overview

[Brief description of the feature]

## 🎯 Requirements Analysis

[Functional and non-functional requirements]

## 🗄️ Database Schema Changes

[New collections, fields, indexes needed]

## 🔌 API Endpoints

[New or modified API endpoints]

## 🎨 UI Components

[New or modified UI components]

## 📁 Files to Modify

[List of files that need changes]

## 🛠️ Implementation Steps

[Step-by-step implementation guide]

## 🧪 Testing Strategy

[Testing approach and test cases]

## 📊 Performance Considerations

[Performance impact and optimizations]

## 🔒 Security Considerations

[Security measures and validations]

## 📅 Timeline Breakdown

[Detailed timeline with milestones]
```

---

### 3. **code-review** Command

#### Usage

```
@code-review [file-path] [review-type] [focus-areas]
```

#### Description

Đánh giá code tự động, kiểm tra:

- Code quality và best practices
- Security vulnerabilities
- Performance issues
- Accessibility compliance
- Error handling

#### Example

```
@code-review "src/components/TaskCard.jsx" "comprehensive" "security,performance,accessibility"
```

#### Output Template

```markdown
# Code Review Report

## 📋 File Information

- **File**: [file-path]
- **Review Date**: [current-date]
- **Reviewer**: AI Assistant
- **Review Type**: [review-type]

## ✅ Positive Aspects

[What's working well in the code]

## ⚠️ Issues Found

[Issues that need attention]

### 🔒 Security Issues

[Security vulnerabilities and recommendations]

### 🚀 Performance Issues

[Performance problems and optimizations]

### ♿ Accessibility Issues

[Accessibility problems and fixes]

### 🐛 Bug Risks

[Potential bugs and error handling]

### 📚 Code Quality Issues

[Code quality problems and improvements]

## 🔧 Recommended Fixes

[Specific recommendations for each issue]

## 📊 Overall Assessment

[Overall code quality rating and summary]

## 🎯 Next Steps

[Priority actions to take]
```

---

## 🎨 Custom Command Templates

### 1. **Feature Analysis Template**

#### Usage

```
@analyze-feature [feature-name] [current-state] [desired-state]
```

#### Description

Phân tích tính năng hiện tại và đề xuất cải tiến.

#### Example

```
@analyze-feature "Task Management" "Basic CRUD" "Advanced filtering and sorting"
```

---

### 2. **Performance Optimization Template**

#### Usage

```
@optimize-performance [component-name] [performance-metrics] [target-improvement]
```

#### Description

Phân tích và tối ưu hiệu năng của component hoặc feature.

#### Example

```
@optimize-performance "Dashboard" "load-time:3s" "load-time:1s"
```

---

### 3. **Security Audit Template**

#### Usage

```
@security-audit [scope] [security-level] [compliance-requirements]
```

#### Description

Kiểm tra bảo mật và đề xuất cải tiến.

#### Example

```
@security-audit "authentication" "high" "GDPR,WCAG"
```

---

## 🔧 Command Configuration

### 1. **Environment Setup**

#### Required Files

- `.cursorrules` - Project rules và guidelines
- `docs/product-brief.md` - Product brief hiện tại
- `docs/architecture/` - Architecture documentation
- `docs/design-system/` - Design system documentation

#### Required Context

- Current codebase structure
- Technology stack
- Coding standards
- Testing requirements
- Security guidelines

### 2. **Command Customization**

#### Adding New Commands

1. Define command syntax
2. Create output template
3. Add to this documentation
4. Test with sample inputs

#### Modifying Existing Commands

1. Update template structure
2. Adjust output format
3. Update documentation
4. Test changes

---

## 📚 Usage Guidelines

### 1. **Best Practices**

#### Command Usage

- Use specific, descriptive parameters
- Provide context when needed
- Review output carefully
- Apply recommendations thoughtfully

#### Output Review

- Validate technical accuracy
- Check for completeness
- Ensure alignment with project goals
- Consider implementation feasibility

### 2. **Common Patterns**

#### Feature Development

1. Use `@create-brief` for initial planning
2. Use `@plan-feature` for detailed implementation
3. Use `@code-review` for quality assurance

#### Code Improvement

1. Use `@code-review` for existing code
2. Use `@optimize-performance` for performance issues
3. Use `@security-audit` for security concerns

#### Problem Solving

1. Use `@analyze-feature` for feature issues
2. Use `@code-review` for bug investigation
3. Use `@plan-feature` for solution design

---

## 🚨 Troubleshooting

### 1. **Common Issues**

#### Command Not Working

- Check command syntax
- Verify required context
- Ensure proper file structure
- Review error messages

#### Incomplete Output

- Provide more context
- Use more specific parameters
- Check file permissions
- Verify documentation exists

#### Incorrect Recommendations

- Review project requirements
- Check technology stack
- Validate against best practices
- Consider project constraints

### 2. **Getting Help**

#### Documentation

- Review this documentation
- Check project README
- Consult architecture docs
- Review coding standards

#### Community

- GitHub discussions
- Discord server
- Stack Overflow
- Developer forums

---

## 📈 Continuous Improvement

### 1. **Command Evolution**

#### Regular Updates

- Update templates based on feedback
- Add new commands as needed
- Improve output quality
- Optimize for common use cases

#### User Feedback

- Collect usage feedback
- Identify common patterns
- Address pain points
- Enhance user experience

### 2. **Metrics and Monitoring**

#### Usage Tracking

- Monitor command usage
- Track success rates
- Identify popular patterns
- Measure user satisfaction

#### Quality Metrics

- Code quality improvements
- Bug reduction
- Performance gains
- Security enhancements

---

**Lưu ý**: Các command này được thiết kế để hỗ trợ quy trình phát triển với Cursor AI. Hãy sử dụng chúng một cách thông minh và luôn review output trước khi implement.
