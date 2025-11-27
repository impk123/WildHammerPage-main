module.exports = {
    apps: [
      {
        name: "webpage",
        cwd: "/home/game/webpage",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3500",
  
        exec_mode: "fork",
        instances: 1,
  
        // กัน OOM และ restart อัตโนมัติเมื่อโตเกิน
        max_memory_restart: "350M",
        node_args: "--max-old-space-size=320",
  
        // ความนิ่ง
        watch: false,
        autorestart: true,
        restart_delay: 5000,
        min_uptime: "10s",
        max_restarts: 20,
  
        // .env (ถ้ามี)
        env_file: "/home/game/webpage/.env",
        env: {
          NODE_ENV: "production",
          PORT: "3500",
          NEXT_PUBLIC_BASE_URL: "https://boapi.wildhammer.online",
          NEXT_PUBLIC_TOKEN: "bigohm"
        }
      }
    ]
  };
  