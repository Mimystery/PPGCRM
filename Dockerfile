# Stage 1: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем только проекты и sln
COPY PPGCRM.sln ./
COPY PPGCRM.API/PPGCRM.API.csproj PPGCRM.API/
COPY PPGCRM.Application/PPGCRM.Application.csproj PPGCRM.Application/
COPY PPGCRM.Core/PPGCRM.Core.csproj PPGCRM.Core/
COPY PPGCRM.DataAccess/PPGCRM.DataAccess.csproj PPGCRM.DataAccess/

# Восстанавливаем зависимости
RUN dotnet restore PPGCRM.API/PPGCRM.API.csproj

# Копируем исходники по папкам
COPY PPGCRM.API ./PPGCRM.API
COPY PPGCRM.Application ./PPGCRM.Application
COPY PPGCRM.Core ./PPGCRM.Core
COPY PPGCRM.DataAccess ./PPGCRM.DataAccess

# Сборка Release
WORKDIR /src/PPGCRM.API
RUN dotnet publish PPGCRM.API.csproj -c Release -o /app/publish

# Stage 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "PPGCRM.API.dll"]
