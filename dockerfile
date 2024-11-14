# ใช้ Base Image ที่ติดตั้ง Bun อยู่แล้ว หรือคุณสามารถติดตั้งเองได้
FROM oven/bun:latest

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ package.json, bun.lockb, และไฟล์ที่จำเป็น
COPY package.json bun.lockb ./

# ติดตั้ง dependencies ด้วย Bun
RUN bun install

# คัดลอกโค้ดทั้งหมดเข้าไปใน container
COPY . .

# กำหนดพอร์ตที่แอปจะทำงาน (สมมติว่าเป็น 3000)
EXPOSE 3000

# สั่งรันแอป
CMD ["bun", "run", "start"]
