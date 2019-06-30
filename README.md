
# [107-2] Web Programming Final - PlanNGo
一個旅遊規劃平台，可以自己加入景點，拖曳排序想要的順序，並route出最佳的路線。
![](https://i.imgur.com/asDzrDn.png)


## 安裝/使用/操作方式 (含伺服器端以及使用者端)

### 安裝/使用
1. GitHub
```
git clone https://github.com/1998Isabel/PlanNGo.git
```
```
// for backend
cd frontend
npm install
npm start

// for front end
cd frontend
npm install
// (optional: if you want to generate PDF files, replace ./node_modules/pdfmake/build/vfs_fonts.js with vfs_fonts.js provided by us) 
npm start
```


### 操作方式
* 登入介面(可以創建project、登入)：
    * 創建project
    ![](https://i.imgur.com/ZLdwMis.png)
    * 輸入Project Name和密碼即可登入
    ![](https://i.imgur.com/1OfPFOG.png)
* 進入畫面後可開始規劃行程
![](https://i.imgur.com/9bjgPkH.png)
    * 可將想去的地方存在中間的欄位
    ![](https://i.imgur.com/3TNAIqu.png)
    卡片中會有地點相關資訊，使用者可以自行輸入欲停留的時間、地點的描述和筆記和預計的花費並儲存。
    * 可將想去的地方拖曳到左方欄位中規畫行程的先後，最上方的BAR有Scroll功能
    ![](https://i.imgur.com/CMq8MYw.png)
    * 點擊DAY旁邊的ROUTE即可規劃出路線
    ![](https://i.imgur.com/zYyHhgd.png)

* 其他功能
![](https://i.imgur.com/WHUDlbu.png)
    * 點擊日曆即可更改日期
    * 點擊列印即可輸出PDF檔
    ![](https://i.imgur.com/jLvvd5l.png)

    * 點擊LOGOUT可以切換帳號



## 使用與參考之框架/模組/原始碼
### Frontend
* react : 略
* react-beautiful-dnd：此project前端主要用的套件、實現**拖移功能**
* apollo-client : 與graphql後端溝通用
* google-map-react : Google Map API 
* crypto-js : 帳號密碼的加密
* uuid : 略
* react-router-dom : 控制前端網頁的routing 
* socket.io-client : react cross component的溝通會利用到socket
* graphql : graphql 前端 
### Backend
* graphql-yoga : graphql 後端
* mongoose : 我們使用的db
* pdfmake : 將資料匯出成pdf
* socket.io : 略

## 專題製作心得
* 楊采綸：這次的project寫了好久，雖然最後來不及接到住宿和機票的API，但大部分想要的功能都有實現，覺得很感動。最大的收穫是更了解GraphQL的運作(剛開始有點不熟)和前後端及資料庫的連接方式。可以拿來規劃畢旅XD
* 賴沂謙：
* 賴言禮：這次主要都在處理後端的部分，前面花了一段時間研究GraphQL，在理解他的概念之後就決定使用他。雖然前面操作不熟悉，加上有bug都沒噴error，經歷一段撞牆期，但熟悉之後的GraphQL真的是一個蠻強大的後端套件。之後db我們採用mongodb，在將db從local的假db替換成真的過程中也是遇到了很多匪夷所思的bug，但也熟悉了mongodb的基礎操作。最後前端的部分一度想要寫好optimistic rendering可惜最後時間不夠沒有實現。總而言之，這次的專題讓我對網頁前後端的互動有了更深的了解。
    
## Demo 影片連結

## 每位組員之貢獻
* 楊采綸：
    * 以react-beautiful-dnd實現跨欄或同欄拖曳功能
    * 生成PDF
* 賴沂謙：
    * Google Map API
* 賴言禮：
    * 登入和創建帳號的前端、後端(Graphql + mongoose)

#### ***其他(前端/後端/資料庫)幾乎是共同完成***

## 其他說明
### future work
* deploy至Heroku: 因為我們這次還有用到一點socket來操作MAP，會讓deploy失敗
* 連結機票、住宿相關API
### other
1. 我們使用的react-beautiful-dnd有個Issue會在transition完成後才觸發OnDragEnd，因此我們向server發出Mutation時，會讓卡片短暫的閃回原本的位置
2. Generate PDF時需要關閉Ad block的插件，並記得取代vfs_font.js讓pdfmake可以找到中文字體

## (Optional)對於此課程的建議
* 可以講更多後端及資料庫的部分
* 課程內容幾乎涵蓋了大部分的前後端，但因為資訊量太多，很多細節沒辦法講清楚，內容間的連貫性有點不夠。總體而言是一門好課