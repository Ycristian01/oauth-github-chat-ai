# GitHub AI Chat 🚀  

Este es un proyecto **full-stack** que permite a los usuarios autenticarse con **GitHub OAuth** y chatear con una IA basada en **Gemini AI**.  

## 🛠️ Tecnologías Utilizadas  

### **Frontend** (React + Vite + TypeScript)  
- React con Vite ⚡  
- React Router para navegación 🛤️  
- Axios para peticiones HTTP 🔗  

### **Backend** (Django + Django REST Framework)  
- Django REST Framework para APIs ⚙️  
- PostgreSQL como base de datos 🛢️  
- requests-oauthlib para autenticación con GitHub 🔑  
- Gemini AI para respuestas de IA 🤖  

---

## 🚀 **Instalación y Ejecución**  

### **Clonar el Repositorio**  
`git clone https://github.com/tu-usuario/tu-repositorio.git`

`cd tu-repositorio`

### **Configurar backend**  

`cd backend`

`python manage.py migrate`

`python manage.py runserver`

### **Configurar frontend**  

`cd frontend`

`npm install`

`npm run dev`

### **Elección de tecnologías**

La API que iba a ser utilizada originalmente para las consultas era la de OpenAI, pero debido a su modelo de paga
que no permitía hacer ni siquiera una sola consulta de manera gratuita, se optó por el uso de Gemini, la cual de
igual manera proporciona una API fácil e intuitiva.

La base de datos originalmente iba a estar alojada utilizando los servicios de RDS de AWS, pero debido a errores de
conexión y falta de tiempo se tuvo que optar por una alternativa de postgresql en local.

## **Conclusiones**

Si se tuviera que escalar el proyecto, optaría por una mejora notable en el frontend de la aplicación para que sea más
intuitiva para el usuario final, además de hacer posible la alternativa de la base de datos alojada en AWS, así como
poder contar con el uso de la API de OpenAI para respuestas más inmediatas y estructuradas.






