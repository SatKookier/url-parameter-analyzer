# URL Parameter Analyzer

URLのクエリパラメータを解析し、理解しやすい形で表示するWebアプリケーションです。

## 機能

- URLのクエリパラメータの自動解析
- 一般的なパラメータ（UTM、Google Analytics等）の説明表示
- パラメータ値のクリップボードへのコピー機能
- JSON形式でのエクスポート機能
- プライバシーポリシーとコンタクトページ

## ローカルでの実行

**前提条件:** Node.js

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. アプリを実行:
   ```bash
   npm run dev
   ```

## Vercel Analytics & Speed Insights の設定

このアプリケーションはVercelのAnalyticsとSpeed Insightsを使用しています。

### 本番環境での設定

Vercelにデプロイする場合、以下の環境変数を設定してください：

```bash
# Vercel Analytics
VITE_VERCEL_ANALYTICS_ID=your_analytics_id_here

# Vercel Speed Insights  
VITE_VERCEL_SPEED_INSIGHTS_ID=your_speed_insights_id_here
```

### ローカル開発での設定

ローカル開発時は、`.env.local`ファイルを作成して環境変数を設定できます：

```bash
# .env.local
VITE_VERCEL_ANALYTICS_ID=your_analytics_id_here
VITE_VERCEL_SPEED_INSIGHTS_ID=your_speed_insights_id_here
```

### Vercelプロジェクトでの設定

1. Vercelダッシュボードでプロジェクトを開く
2. Settings > Environment Variables に移動
3. 上記の環境変数を追加

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vercel Analytics
- Vercel Speed Insights
