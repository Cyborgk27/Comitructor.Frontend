# Comitructor Frontend 🚀

Sistema de gestión empresarial para **Comitructor**, desarrollado con **Angular 21** bajo una arquitectura moderna, modular y escalable. Esta aplicación está diseñada para ofrecer una experiencia eficiente en la gestión de inventario, facturación y requerimientos empresariales.

---

## 📋 Descripción del Proyecto

Este frontend funciona como una **Single Page Application (SPA)** construida con Angular 18, utilizando una arquitectura basada en **Signals** y componentes standalone para mejorar el rendimiento, la mantenibilidad y la escalabilidad del sistema.

La aplicación se comunica con un backend desarrollado en .NET mediante un cliente HTTP generado automáticamente utilizando **OpenAPI Generator**, permitiendo mantener sincronizados los contratos de la API y reducir errores manuales.

---

## 🛠️ Tecnologías Principales

- **Framework:** Angular 18 (Standalone Components & Signals)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + DaisyUI
- **Iconografía:** PrimeIcons
- **Generación de API:** OpenAPI Generator (TypeScript Angular Client)
- **Servidor Web:** Nginx sobre Alpine Linux
- **Contenedorización:** Docker Multi-stage Build

---

# 🐳 Despliegue con Docker

El proyecto utiliza un **Dockerfile Multi-stage** para optimizar el tamaño final de la imagen y automatizar todo el proceso de construcción y despliegue.

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos:

1. Tener instalado:
   - Docker
   - Docker Desktop (opcional pero recomendado)

2. El backend debe estar ejecutándose para que OpenAPI Generator pueda descargar correctamente el archivo `swagger.json`.

---

## 🚧 Construcción de la Imagen Docker

Desde la raíz del proyecto, ejecuta el siguiente comando:

```bash
docker build -t comitructor-frontend .
