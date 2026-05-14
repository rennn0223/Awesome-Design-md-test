export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  readTime: string;
  en: { title: string; excerpt: string; body: string[]; summary: string[] };
  zh: { title: string; excerpt: string; body: string[]; summary: string[] };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dgx-spark-deep-dive",
    date: "2026-04-15",
    tags: ["DGX", "INFRASTRUCTURE", "EDGE-AI"],
    readTime: "8 min",
    en: {
      title: "Deploying NemoClaw on DGX Spark: Lessons from the Field",
      excerpt: "What I learned from running LLM-driven automation on NVIDIA's edge AI platform at MSI Innovation Center.",
      summary: [
        "DGX Spark is NVIDIA's compact edge AI platform, designed for developers who need powerful inference capabilities without the footprint of a full data center rig.",
        "Setting up NemoClaw involved environment configuration, GPU memory optimization, and network latency tuning. The key challenge was balancing real-time inference with power constraints.",
        "By leveraging TensorRT and quantization, we achieved sub-100ms response times on vision tasks. This enabled real-time digital twin synchronization with our Omniverse environment.",
        "The DGX Spark's form factor makes it ideal for edge deployments in manufacturing, where space and power are at a premium but AI inference is critical.",
      ],
      body: [
        "# Deploying NemoClaw on DGX Spark: Lessons from the Field\n\nDuring my residency at MSI Innovation Center, one of the core technical challenges was deploying LLM-driven automation workflows on edge hardware. The chosen platform was NVIDIA DGX Spark — a compact, powerful edge AI system.\n\n## Why DGX Spark?\n\nDGX Spark is designed for edge deployments where traditional GPU servers aren't feasible. It packs significant inference power into a form factor that fits on any workstation desk.\n\n## NemoClaw Integration\n\nNemoClaw provided the bridge between our LLM workflows and the Omniverse simulation environment. The integration required:\n\n1. **Environment Setup**: Configuring the NVIDIA AI software stack, including CUDA drivers and TensorRT.\n2. **Memory Optimization**: Managing GPU memory for concurrent LLM inference and rendering.\n3. **Network Tuning**: Achieving sub-millisecond latency for real-time digital twin sync.\n\n## Results\n\nThe deployment achieved real-time inference with sub-100ms response times for vision-based tasks. This was critical for our digital twin synchronization, where every millisecond of delay affected the accuracy of the virtual environment.\n\n## Key Takeaway\n\nEdge AI doesn't mean compromising on capability. With the right optimization strategies, DGX Spark can power production-grade AI workflows in constrained environments.",
      ],
    },
    zh: {
      title: "在 DGX Spark 上部署 NemoClaw：實戰經驗分享",
      excerpt: "在微星創新前瞻中心於 NVIDIA 邊緣 AI 平台運行 LLM 驅動自動化 workflows 的學習心得。",
      summary: [
        "DGX Spark 是 NVIDIA 的邊緣 AI 平台，為需要在邊緣端部署強大推理能力的開發者設計。",
        "部署 NemoClaw 涉及環境配置、GPU 記憶體最佳化與網路延遲調校。主要的挑戰在於即時推理與功耗限制之間的平衡。",
        "透過 TensorRT 和量化技術，我們在視覺任務上達成了不到 100ms 的回應時間，實現了與 Omniverse 環境的即時數位孿生同步。",
        "DGX Spark 的體積使其非常適合邊緣部署，特別是在空間和電力都有限制的製造環境中。",
      ],
      body: [
        "# 在 DGX Spark 上部署 NemoClaw：實戰經驗分享\n\n在微星創新前瞻中心駐點期間，一項核心的技術挑戰是在邊緣硬體上部署 LLM 驅動的自動化工作流程。選擇的平台是 NVIDIA DGX Spark —— 一款緊湊而強大的邊緣 AI 系統。\n\n## 為什麼選擇 DGX Spark？\n\nDGX Spark 專為邊緣部署設計，在傳統 GPU 伺服器不適合使用的場景中發揮重要作用。它以工作站大小提供了強大的推理能力。\n\n## NemoClaw 整合\n\nNemoClaw 提供了 LLM 工作流程與 Omniverse 模擬環境之間的橋樑。整合過程包括：\n\n1. **環境配置**：設定 NVIDIA AI 軟體堆疊，包括 CUDA 驅動程式和 TensorRT。\n2. **記憶體最佳化**：管理 GPU 記憶體以處理並發 LLM 推理和渲染。\n3. **網路調校**：達成亞毫秒延遲以實現即時數位孿生同步。\n\n## 成果\n\n部署實現了即時推理，視覺任務回應時間不到 100ms。這對於我們的數位孿生同步至關重要，因為每毫秒的延遲都會影響虛擬環境的準確性。\n\n## 關鍵心得\n\n邊緣 AI 並不意味著要犧牲能力。透過適當的最佳化策略，DGX Spark 可以在受限環境中驅動生產級的 AI 工作流程。",
      ],
    },
  },
  {
    slug: "digital-twin-architecture",
    date: "2026-03-20",
    tags: ["DIGITAL-TWIN", "OMNIVERSE", "ARCHITECTURE"],
    readTime: "12 min",
    en: {
      title: "Building Industrial-Grade Digital Twins with Omniverse",
      excerpt: "Architecture decisions and technical challenges when building a campus inspection system using NVIDIA Omniverse and USD.",
      summary: [
        "Digital Twins are not just 3D models — they are living systems that mirror physical reality in real-time. The architecture must support continuous data flow from sensors to simulation.",
        "We chose USD (Universal Scene Description) as the foundation because it natively supports collaborative workflows and massive scene scales. Omniverse provides the rendering and physics engine.",
        "The campus inspection system integrates LiDAR point clouds, camera feeds, and IMU data into a unified USD scene. Each physical element maps to a digital twin prim with real-time attribute updates.",
        "One of the biggest challenges was synchronizing sub-millisecond sensor data with the simulation loop. We solved this with a custom WebSocket-based sync protocol optimized for Omniverse's streaming API.",
      ],
      body: [
        "# Building Industrial-Grade Digital Twins with Omniverse\n\nWhen building a Digital Twin for campus inspection, the architecture decisions made in the early stages determine whether the system becomes a living mirror of reality or just a pretty 3D model.\n\n## Why USD?\n\nUniversal Scene Description (USD) is the backbone of any serious Omniverse project. It supports:\n\n- **Collaborative workflows**: Multiple systems can modify different layers simultaneously.\n- **Massive scene scales**: From individual components to entire campuses.\n- **Physically-based rendering**: Accurate materials and lighting for realistic simulation.\n\n## System Architecture\n\nOur campus inspection Digital Twin consists of:\n\n1. **Data Ingestion Layer**: Real-time sensor data (LiDAR, camera, IMU) ingested via ROS2.\n2. **USD Scene Management**: Each physical element maps to a USD prim with live attribute updates.\n3. **Synchronization Engine**: Custom WebSocket protocol bridges sensor data to Omniverse's streaming API.\n4. **Visualization**: Real-time rendering with NVIDIA RTX for photorealistic digital representation.\n\n## Key Technical Challenge\n\nSynchronizing sub-millisecond sensor data with the simulation loop was the hardest part. The solution involved a custom protocol that batches sensor updates and applies them atomically to the USD scene graph.\n\n## The Result\n\nA working Digital Twin that accurately mirrors campus conditions in real-time, enabling autonomous inspection workflows and remote monitoring capabilities.",
      ],
    },
    zh: {
      title: "使用 Omniverse 建構工業級數位孿生",
      excerpt: "使用 NVIDIA Omniverse 和 USD 建構校園巡檢系統的架構決策與技術挑戰。",
      summary: [
        "數位孿生不只是 3D 模型——它是即時反映物理現實的活躍系統。架構必須支援從感測器到模擬的持續資料流。",
        "我們選擇 USD（通用場景描述）作為基礎，因為它原生支援協作工作流程和龐大的場景規模。Omniverse 提供渲染和物理引擎。",
        "校園巡檢系統將 LiDAR 點雲、相機影像和 IMU 資料整合到統一的 USD 場景中。每個物理元素都映射到具有即時屬性更新的數位孿生 prim。",
        "最大的挑戰之一是將亞毫秒級的感測器資料與模擬迴圈同步。我們透過客製化的 WebSocket 同步協定解決了這個問題。",
      ],
      body: [
        "# 使用 Omniverse 建構工業級數位孿生\n\n當為校園巡檢建構數位孿生時，早期作出的架構決策將決定這個系統成為現實的即時映照，還是只是一個漂亮的 3D 模型。\n\n## 為什麼選擇 USD？\n\n通用場景描述（USD）是任何serious Omniverse 專案的骨幹。它支援：\n\n- **協作工作流程**：多個系統可以同時修改不同的層。\n- **龐大場景規模**：從單一元件到整個校園。\n- **基於物理的渲染**：準確的材质和光照以實現逼真的模擬。\n\n## 系統架構\n\n我們的校園巡檢數位孿生包括：\n\n1. **資料接入層**：透過 ROS2 即時感測器資料（LiDAR、相機、IMU）。\n2. **USD 場景管理**：每個物理元素映射為 USD prim，具有即時屬性更新。\n3. **同步引擎**：客製化 WebSocket 協定橋接感測器資料到 Omniverse 串流 API。\n4. **視覺化**：使用 NVIDIA RTX 的即時渲染，實現真實的數位呈現。\n\n## 關鍵技術挑戰\n\n將亞毫秒級的感測器資料與模擬迴圈同步是最困難的部分。解決方案是一個客製化協定，將感測器更新分批並原子化應用到 USD 場景圖。\n\n## 成果\n\n一個能夠即時準確反映校園狀況的數位孿生，支援自動巡檢工作流程和遠端監控能力。",
      ],
    },
  },
  {
    slug: "ros2-sensor-fusion",
    date: "2026-01-10",
    tags: ["ROS2", "SENSORS", "AUTONOMOUS"],
    readTime: "6 min",
    en: {
      title: "ROS2 Sensor Fusion for Autonomous Systems",
      excerpt: "Technical notes on integrating LiDAR, IMU, and camera data for autonomous vehicle architectures.",
      summary: [
        "ROS2 is the backbone of our autonomous systems stack. It provides the real-time communication layer needed to fuse data from multiple heterogeneous sensors.",
        "LiDAR provides precise depth data, IMU gives orientation and acceleration, and cameras supply visual features. The challenge is time-synchronization and coordinate transformation.",
        "We use ROS2's built-in sensor_msgs and tf2 for frame transformations. All sensor topics are published with proper timestamp headers for accurate fusion.",
        "The resulting sensor fusion pipeline enables reliable perception for navigation, obstacle detection, and spatial mapping in our Ackermann-steered platform.",
      ],
      body: [
        "# ROS2 Sensor Fusion for Autonomous Systems\n\nROS2 has become the standard middleware for robotic systems, and for good reason. Its real-time capabilities and node-based architecture make sensor fusion both flexible and reliable.\n\n## Sensor Stack\n\nOur autonomous platform integrates:\n\n- **LiDAR**: 360-degree depth perception for mapping and obstacle detection.\n- **IMU**: 9-axis orientation and acceleration data for dead reckoning.\n- **Cameras**: Visual features for object detection and semantic mapping.\n\n## Time Synchronization\n\nThe critical insight: all sensors must be time-synchronized. ROS2's `time_sensor_bridge` ensures that every sensor_msgs message carries an accurate timestamp, enabling precise fusion in the callback.\n\n## Coordinate Transforms\n\nUsing tf2, we maintain a dynamic tree of coordinate frames:\n\n`base_link` → `lidar_link`, `camera_link`, `imu_link`\n\nThis allows any sensor reading to be expressed in any other frame, which is essential for accurate fusion.\n\n## The Result\n\nA robust sensor fusion pipeline that powers our autonomous navigation stack, enabling reliable perception in complex environments.",
      ],
    },
    zh: {
      title: "自治系統的 ROS2 感測器融合",
      excerpt: "整合 LiDAR、IMU 和相機資料用於自動駕駛架構的技術筆記。",
      summary: [
        "ROS2 是我們自治系統堆疊的骨幹。它提供了整合多個異質感感器資料所需的即時通訊層。",
        "LiDAR 提供精確的深度資料，IMU 給出方向和加速度，相機提供視覺特徵。挑戰在於時間同步和座標變換。",
        "我們使用 ROS2 內建的 sensor_msgs 和 tf2 進行幀變換。所有感測器主題都帶有正確的時間戳標頭以進行準確融合。",
        "最終的感測器融合管道支援我們 Ackermann 轉向平台的可靠導航、障礙物偵測和空間映射。",
      ],
      body: [
        "# ROS2 感測器融合技術筆記\n\nROS2 已成為機器人系統的標準中間件， reasons 很充分。它的即時能力和節點式架構使感測器融合既靈活又可靠。\n\n## 感測器堆疊\n\n我們的自治平台整合了：\n\n- **LiDAR**：360度深度感知用於映射和障礙物偵測。\n- **IMU**：9軸方向和加速度資料用於推算。\n- **相機**：視覺特徵用於物件偵測和語義映射。\n\n## 時間同步\n\n關鍵要點：所有感測器必須時間同步。ROS2 的 `time_sensor_bridge` 確保每個 sensor_msgs 訊息攜帶準確的時間戳。\n\n## 座標變換\n\n使用 tf2，我們維持動態的座標幀樹：\n\n`base_link` → `lidar_link`, `camera_link`, `imu_link`\n\n這使得任何感測器讀取都可以以任何其他幀表示，這對準確融合至關重要。",
      ],
    },
  },
  {
    slug: "gtc-2026-recap",
    date: "2026-03-25",
    tags: ["GTC2026", "OMNIVERSE", "AI"],
    readTime: "5 min",
    en: {
      title: "GTC 2026: Highlights, Connections, and What's Next",
      excerpt: "Reflections from NVIDIA GTC 2026 — keynotes, the MSI DGX Spark booth, BAIR lab visit, and the future of embodied AI.",
      summary: [
        "GTC 2026 was a pivotal moment. Jensen's keynote reinforced NVIDIA's vision of a comprehensive AI infrastructure stack — from silicon to simulation.",
        "The MSI DGX Spark booth was the center of attention. Visitors were amazed by the real-time digital twin demo, particularly the sub-millisecond synchronization between physical and virtual worlds.",
        "Post-GTC, we were invited to UC Berkeley's BAIR lab for technical discussions on autonomous driving architectures. The convergence of foundation models and robotics is accelerating faster than anyone expected.",
        "The future of embodied AI is here, and the tools are finally mature enough to move from research labs to production environments.",
      ],
      body: [
        "# GTC 2026: Highlights, Connections, and What's Next\n\nNVIDIA GTC 2026 was more than a conference — it was a convergence point for the future of AI infrastructure.\n\n## Keynote Impressions\n\nJensen Huang's keynote reinforced a clear message: NVIDIA is building the complete stack for AI. From the Blackwell architecture to the Omniverse simulation platform, every layer is designed to work together.\n\n## The MSI DGX Spark Booth\n\nOur team set up a live demonstration at the MSI DGX Spark booth. The real-time digital twin — showing a campus environment with live sensor feeds — drew significant attention.\n\nThe most common question: \"How is the latency so low?\" The answer lies in our custom synchronization protocol and the DGX Spark's edge computing capabilities.\n\n## BAIR Lab Visit\n\nAfter GTC, we were invited to UC Berkeley's BAIR lab. The discussions centered on:\n\n- Foundation models for robotics\n- Sim-to-real transfer techniques\n- Multi-agent coordination in digital twins\n\n## Looking Forward\n\nThe tools are finally mature. What was research-grade technology just two years ago is now production-ready. The question is no longer \"can we build it?\" but \"what should we build?\"",
      ],
    },
    zh: {
      title: "GTC 2026：亮點、交流與未來展望",
      excerpt: "NVIDIA GTC 2026 的心得——主題演講、微星 DGX Spark 攤位、BAIR 實驗室訪談，以及具身智能的未來。",
      summary: [
        "GTC 2026 是一個轉捩點。黃仁勳的首長演講強化了 NVIDIA 對全面 AI 基礎設施堆疊的願景——從矽到模擬。",
        "微星 DGX Spark 攤位是焦點所在。即時數位孿生演示吸引了眾多參觀者，特別是實體與虛擬世界之間的亞毫秒同步。",
        "GTC 後，我們受邀前往 UC Berkeley BAIR 實驗室討論自動駕駛架構。基礎模型與機器人的融合加速速度超出任何人預期。",
        "具身智能的未來已來，工具終於成熟到可以從實驗室走向生產環境。",
      ],
      body: [
        "# GTC 2026：亮點、交流與未來展望\n\nNVIDIA GTC 2026 不僅是一場會議——它是 AI 基礎設施未來的匯聚點。\n\n## 首長演講心得\n\n黃仁勳的演講強化了一個清晰的訊息：NVIDIA 正在建構 AI 的完整堆疊。從 Blackwell 架構到 Omniverse 模擬平台，每一層都設計為協同工作。\n\n## 微星 DGX Spark 攤位\n\n我們的團隊在微星 DGX Spark 攤位設置了即時演示。展示校園環境搭配即時感測器資料的數位孿生，吸引了大量關注。\n\n最常問的問題：\"延遲怎麼這麼低？\"答案在於我們客製化的同步協定和 DGX Spark 的邊緣運算能力。\n\n## BAIR 實驗室訪談\n\nGTC 之後，我們受邀前往柏克萊 BAIR 實驗室。討論集中在：\n\n- 機器人的基礎模型\n- Sim-to-real 遷移技術\n- 數位孿生中的多智能體協調",
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
