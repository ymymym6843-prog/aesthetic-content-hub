# MariaDB 외부 접속 허용 요청서

**요청일**: 2026-03-31
**요청자**: IM AESTHETIC 콘텐츠 관리 시스템 개발팀
**대상 서버**: 118.45.181.229 (MariaDB, 포트 3306)
**데이터베이스**: im-insta-yumin

---

## 1. 요청 배경

IM AESTHETIC(아이엠에스테틱) 대구 에스테틱 클리닉의 **인스타그램 콘텐츠 관리 시스템**을 운영하고 있습니다.

이 시스템은 **Vercel**(https://vercel.com)이라는 클라우드 플랫폼에 배포되어 있으며, 원장님과 직원들이 웹 브라우저에서 접속하여 인스타그램 콘텐츠를 제작합니다.

**현재 문제**: Vercel 서버에서 MariaDB(118.45.181.229:3306)로 접속할 때 연결이 차단되고 있습니다. 이로 인해 배포된 웹 서비스에서 데이터 저장/조회가 불가능합니다.

**원인 추정**: MariaDB 서버의 방화벽 또는 네트워크 설정에서 외부 IP의 3306 포트 접근을 차단하고 있는 것으로 보입니다.

---

## 2. 요청 사항

### 2-1. 방화벽 (Firewall) 설정

MariaDB의 3306 포트에 대해 **Vercel 서버 IP 대역**의 접근을 허용해 주세요.

**Vercel의 IP 대역** (Serverless Functions 기준):
- Vercel은 AWS를 사용하며, 고정 IP가 없습니다
- 따라서 아래 두 가지 옵션 중 선택이 필요합니다

#### 옵션 A: 전체 외부 접속 허용 (간편, 보안 낮음)
```bash
# iptables 사용 시
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT

# firewalld 사용 시
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload

# ufw 사용 시
sudo ufw allow 3306/tcp
```

#### 옵션 B: 특정 대역만 허용 (권장, 보안 높음)
Vercel의 주요 AWS 리전 IP 대역을 허용합니다:
```bash
# Vercel 주요 리전 (us-east-1, us-west-2 등)
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="76.76.21.0/24" port protocol="tcp" port="3306" accept'
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="64.29.18.0/24" port protocol="tcp" port="3306" accept'
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="66.33.45.0/24" port protocol="tcp" port="3306" accept'
sudo firewall-cmd --reload
```

> **참고**: Vercel IP는 변동될 수 있어, 옵션 A가 운영상 더 안정적입니다. 대신 아래 MariaDB 사용자 권한으로 보안을 보완합니다.

---

### 2-2. MariaDB bind-address 확인

MariaDB 설정 파일에서 외부 접속을 허용하는지 확인해 주세요.

**설정 파일 위치** (OS에 따라 다름):
- `/etc/mysql/mariadb.conf.d/50-server.cnf`
- `/etc/my.cnf`
- `/etc/mysql/my.cnf`

**확인 항목**:
```ini
[mysqld]
# 아래 값이 0.0.0.0 이어야 외부 접속 가능
bind-address = 0.0.0.0

# 만약 127.0.0.1로 되어 있으면 로컬만 접속 가능 (변경 필요)
# bind-address = 127.0.0.1  ← 이 설정이면 외부 접속 불가
```

**변경 후 재시작**:
```bash
sudo systemctl restart mariadb
# 또는
sudo systemctl restart mysql
```

---

### 2-3. MariaDB 사용자 접속 권한 확인

현재 `root` 계정이 외부에서 접속 가능한지 확인해 주세요.

```sql
-- 현재 사용자 권한 확인
SELECT user, host FROM mysql.user WHERE user = 'root';
```

**결과가 `localhost`만 있는 경우** — 외부 접속 불가. 아래 명령으로 허용:

```sql
-- 방법 1: 모든 외부 IP 허용 (간편)
GRANT ALL PRIVILEGES ON `im-insta-yumin`.* TO 'root'@'%' IDENTIFIED BY 'Qusrud8545!!@@';
FLUSH PRIVILEGES;

-- 방법 2: 보안 강화 — 전용 계정 생성 (권장)
CREATE USER 'im_app'@'%' IDENTIFIED BY '새로운비밀번호';
GRANT SELECT, INSERT, UPDATE, DELETE ON `im-insta-yumin`.* TO 'im_app'@'%';
FLUSH PRIVILEGES;
```

> **보안 권장**: 프로덕션에서는 `root` 대신 **전용 계정(im_app)**을 만들어 필요한 권한만 부여하는 것이 안전합니다. 전용 계정을 만들면 저희 쪽에서 환경변수를 변경하겠습니다.

---

## 3. 설정 후 확인 방법

설정 완료 후 아래 명령으로 외부 접속이 되는지 확인할 수 있습니다:

```bash
# 다른 PC/서버에서 실행
mysql -h 118.45.181.229 -u root -p'Qusrud8545!!@@' im-insta-yumin -e "SHOW TABLES;"
```

정상이면 아래와 같이 출력됩니다:
```
+---------------------------+
| Tables_in_im-insta-yumin  |
+---------------------------+
| clinics                   |
| directors                 |
| maker_sessions            |
| post_images               |
| posts                     |
| week_strategies           |
+---------------------------+
```

또는 저희가 원격으로 확인할 수 있도록 설정 완료 후 알려주시면 됩니다.

---

## 4. 보안 참고사항

| 항목 | 현재 | 권장 |
|------|------|------|
| DB 포트 | 3306 (기본) | 유지 가능 (방화벽으로 제한) |
| 접속 계정 | root | **전용 계정 (im_app)** 생성 권장 |
| 계정 권한 | ALL PRIVILEGES | SELECT, INSERT, UPDATE, DELETE만 |
| SSL | 미사용 (추정) | 장기적으로 SSL 연결 권장 |

---

## 5. 영향 범위

이 설정은 아래 서비스에만 영향을 미칩니다:
- **데이터베이스**: `im-insta-yumin` (IM AESTHETIC 전용)
- **테이블**: clinics, directors, week_strategies, posts, post_images, maker_sessions
- **접속 주체**: Vercel 서버리스 함수 (API 요청 처리용)
- **데이터 유형**: 인스타그램 콘텐츠 메타데이터 (이미지 파일은 별도 저장)

다른 데이터베이스나 서비스에는 영향이 없습니다.

---

## 6. 연락처

설정 관련 문의나 확인이 필요하시면:
- 요청자에게 연락 부탁드립니다
- 설정 완료 후 저희가 원격으로 연결 테스트를 진행하겠습니다

감사합니다.
