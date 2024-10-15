# Blog

Prisma를 이용해 테이블을 생성하고, Supabase와 연동하여 데이터를 주고받았습니다.

이미지 저장소로는 Supabase의 Storage를 사용하였습니다.

또한, TailwindCSS를 사용하여 스타일링을 진행했습니다. UI의 일관성을 제공하기 위해 Button, Input 등의 다양한 태그 컴포넌트를 직접 생성 및 디자인할 시간이 부족하다고 판단하여, TailwindCSS 기반으로 디자인된 컴포넌트를 제공하는 Shadcn/UI 라이브러리를 사용했습니다.

Next.js 14 버전을 사용하였으며, SSR과 동적 라우팅 기능을 적용해 보았습니다.

### Getting Started

```
yarn 또는 npm install  의존성 패키지 설치 후,
```

```
yarn dev 또는 npm run dev 실행합니다.
```

### 프로젝트 일정

| 일자        | 진행 내용                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1일차       | 일주일 동안의 계획을 세우고 시간표를 작성했습니다. Prisma ORM을 이용해 테이블을 마이그레이션하고 Supabase와 Prisma의 연동을 테스트했습니다. |
| 2일차       | 전체적인 테이블 설계 및 페이지 구성을 계획했습니다. 테스트 API를 만들어 API 테스트를 진행했습니다.                                          |
| 3일차       | 필요한 모든 API를 개발했습니다.                                                                                                             |
| 4일차       | JWT 기반의 로그인 기능을 구현했습니다. 인증이 필요한 요청을 효율적으로 관리하기 위해 미들웨어를 추가했습니다.                               |
| 5일차       | 전체 페이지를 구현했습니다.                                                                                                                 |
| 6일차~7일차 | 각 페이지에 필요한 API를 연결했습니다.                                                                                                      |

### 페이지 및 기능

1. 로그인 및 회원가입  
   JWT 기반의 로그인 방식을 사용하였습니다.  
   서버에 세션을 저장할 필요 없이 사용자 정보를 요청마다 쉽게 전달할 수 있어 효율적이기 때문입니다.  
   액세스 토큰이 만료되더라도 리프레시 토큰을 7일로 설정하여 자동으로 재발급되도록 구현했습니다.  
   로그인이 필요한 요청의 경우, 미들웨어를 통해 토큰을 검증한 후 요청을 처리하며, 이 과정에서 요청 헤더에 사용자의 ID를 추가하여, 매번 액세스 토큰을 이용해 사용자 ID를 가져오는 과정을 최소화했습니다.

2. 게시글  
   게시글 작성은 커스터마이징이 용이한 Quill 에디터를 사용하여 구현했습니다.  
   에디터에서 이미지를 업로드할 때, Supabase Storage에 이미지를 저장한 후 해당 이미지의 URL을 가져와 게시글에 삽입합니다.  
   또한, 제목에 검색어가 포함된 게시글을 모아볼 수 있는 검색 기능을 추가했습니다.  
   게시글 상세 페이지에서는 작성자 정보와 댓글을 확인할 수 있으며, 작성자는 자신의 게시글을 수정하거나 삭제할 수 있는 기능이 제공됩니다. 수정 및 삭제 요청 시, 서버에서 액세스 토큰을 통해 2차 검증을 진행합니다.  
   게시글은 userId와 관계를 맺고 있어, 각 게시글은 해당 게시글을 작성한 사용자를 식별할 수 있습니다. 이를 통해 사용자는 자신이 작성한 게시글만 수정하거나 삭제할 수 있으며, 작성자 정보를 기반으로 사용자와 게시글 간의 관계를 유지할 수 있습니다.

3. 댓글  
   게시글에 댓글을 작성할 수 있는 기능을 제공합니다.  
   댓글 테이블에는 parentId 컬럼을 두어 대댓글 기능을 구현하였습니다.  
   이를 통해 사용자는 다른 댓글에 대해 응답할 수 있으며, 보다 자연스러운 대화 형식을 유지할 수 있습니다.  
   Post의 id와 Comment의 postId를 통해 관계형 데이터베이스를 구축하여, 특정 게시글에 대한 댓글을 연결하였습니다. 이로 인해 게시글이 삭제되면 해당 게시글에 연결된 모든 댓글도 자동으로 삭제되는 기능을 구현하였습니다.

4. 회원 페이지  
   유저별 상세 페이지를 제공하여 특정 유저의 게시글을 모아볼 수 있습니다.  
   로그인한 유저의 페이지에서는 자신의 프로필을 변경할 수 있는 기능이 제공됩니다. 이를 통해 사용자는 개인 정보를 쉽게 수정하고, 자신의 게시글을 관리할 수 있습니다.

5. 기타 기능
   - **관리자 기능** : user 테이블에 role 컬럼을 추가하여 관리자는 모든 게시글에 대해 수정 및 삭제 권한을 가집니다. 일반 유저는 자신의 게시글만 수정하거나 삭제할 수 있습니다.
   - **폼 관리** : 가독성 및 성능 개선을 위해 React Hook Form을 사용하여 폼을 관리했습니다. 이를 통해 입력값 유효성 검사가 간편해지고, 렌더링 성능이 개선되었습니다.
