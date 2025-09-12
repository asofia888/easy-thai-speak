import { TopicCategory } from './types';

export const TOPIC_CATEGORIES: TopicCategory[] = [
    {
        name: '初級 (Beginner)',
        topics: [
            { id: 'b-greetings-status', title: '挨拶と近況確認', description: '基本的な挨拶、感謝、謝罪の表現と近況を尋ねる会話を学びます。', level: 'Beginner' },
            { id: 'b-self-introduction', title: '自己紹介と基本情報', description: '名前、出身地、住所、職業などの基本情報を伝える練習をします。', level: 'Beginner' },
            { id: 'b-numbers', title: '数字と数え方', description: '1から1000までの数字と、物の数え方を学びます。', level: 'Beginner' },
            { id: 'b-understanding-questions', title: '理解を深める質問', description: '「これは何？」「どういう意味？」「もう一度言って」など理解のための質問を学びます。', level: 'Beginner' },
            { id: 'b-language-learning', title: '言語学習について', description: '言語能力、学習理由、学習期間について話す表現を学びます。', level: 'Beginner' },
            { id: 'b-hobbies-preferences', title: '趣味と好みの表現', description: '趣味や好み、経験について話す基本的な表現を学びます。', level: 'Beginner' },
            { id: 'b-abilities-possessions', title: '能力と所有の表現', description: '「できる」「ある/いる」などの基本的な能力や所有を表す表現を学びます。', level: 'Beginner' },
            { id: 'b-polite-requests', title: '丁寧なお願いと許可', description: '「〜してもいいですか」「〜していただけますか」など丁寧な依頼表現を学びます。', level: 'Beginner' },
            { id: 'b-time-expressions', title: '時間に関する表現', description: '現在の時刻、日付、過去の出来事の時期について話す表現を学びます。', level: 'Beginner' },
            { id: 'b-shopping-basic', title: 'ショッピング基礎', description: '値段を尋ねたり、商品を買ったり、会計をする基本的な買い物会話を学びます。', level: 'Beginner' },
            { id: 'b-restaurant-basics', title: 'レストランでの基本会話', description: '基本的な料理の注文やおすすめを尋ねる表現を学びます。', level: 'Beginner' },
            { id: 'b-location-movement', title: '場所と移動', description: '行きたい場所を伝えたり、道順を尋ねる基本的な表現を学びます。', level: 'Beginner' },
            { id: 'b-family', title: '家族について', description: '自分の家族について簡単に紹介します。', level: 'Beginner' },
            { id: 'b-asking-about-people', title: '人について尋ねる', description: '「あの方はどなたですか」など人について尋ねる表現を学びます。', level: 'Beginner' },
        ],
    },
    {
        name: '中級 (Intermediate)',
        topics: [
            { id: 'i-transport-taxi', title: 'タクシーに乗る', description: '運転手に行き先を伝え、料金を確認します。', level: 'Intermediate' },
            { id: 'i-asking-directions', title: '道を尋ねる', description: '目的地までの道順を尋ね、教えてもらいます。', level: 'Intermediate' },
            { id: 'i-shopping-advanced', title: '買い物での交渉', description: '市場などで値段交渉をする際の表現を学びます。', level: 'Intermediate' },
            { id: 'i-restaurant-requests', title: 'レストランでのリクエスト', description: '辛さの調整やおすすめを聞くなど、より詳しい注文をします。', level: 'Intermediate' },
            { id: 'i-hotel-checkin', title: 'ホテルでチェックイン', description: '予約の確認や部屋についての質問をします。', level: 'Intermediate' },
            { id: 'i-health-symptoms', title: '体調を伝える', description: '医者や薬局で具体的な症状を説明します。', level: 'Intermediate' },
            { id: 'i-hobbies', title: '趣味について話す', description: '自分の趣味や休日の過ごし方について話します。', level: 'Intermediate' },
            { id: 'i-making-plans', title: '友人と計画を立てる', description: '友人と会う約束をするための会話を練習します。', level: 'Intermediate' },
            { id: 'i-phone-call', title: '電話での会話', description: '簡単な電話の受け答えや、要件を伝える練習をします。', level: 'Intermediate' },
            { id: 'i-describing-people', title: '人の見た目を説明する', description: '人の外見や服装について説明する表現を学びます。', level: 'Intermediate' },
        ],
    },
    {
        name: '上級 (Advanced)',
        topics: [
            { id: 'a-renting-apartment', title: 'アパートを借りる', description: '不動産屋で希望を伝え、賃貸契約について話します。', level: 'Advanced' },
            { id: 'a-opening-bank-account', title: '銀行口座の開設', description: '銀行で口座を開設する際に必要な手続きの会話です。', level: 'Advanced' },
            { id: 'a-job-interview', title: '就職の面接', description: '自分の経歴や長所をアピールする練習をします。', level: 'Advanced' },
            { id: 'a-business-meeting', title: 'ビジネス会議', description: '会議で意見を述べたり、質問したりする表現を学びます。', level: 'Advanced' },
            { id: 'a-discussing-news', title: 'ニュースについて議論する', description: '最近のニュースについて、自分の意見を交えて話します。', level: 'Advanced' },
            { id: 'a-thai-culture', title: 'タイの文化について話す', description: 'タイの文化や習慣について、より深い会話をします。', level: 'Advanced' },
            { id: 'a-expressing-emotions', title: '感情や意見を詳しく表現する', description: '喜び、悲しみ、怒りなど、複雑な感情を表現します。', level: 'Advanced' },
            { id: 'a-making-complaint', title: 'クレームを入れる', description: '商品やサービスに関する問題点を丁寧に伝えます。', level: 'Advanced' },
        ],
    },
];
