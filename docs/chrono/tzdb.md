# std::chrono::tzdb

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
struct tzdb;
```

A classe `tzdb` representa uma cópia do [banco de dados de fuso horário IANA](<https://www.iana.org/time-zones>). Usuários não podem construir um `tzdb` e só podem obter acesso somente leitura a um através das funções livres std::chrono::get_tzdb_list e std::chrono::get_tzdb.

### Objetos Membro

Objeto Membro | Descrição
---|---
`version` | Uma [std::string](<#/doc/string/basic_string>) que contém a versão do banco de dados
`zones` | Um [std::vector](<#/doc/container/vector>)<[std::chrono::time_zone](<#/doc/chrono/time_zone>)> ordenado contendo a descrição dos fusos horários
`links` | Um [std::vector](<#/doc/container/vector>)<[std::chrono::time_zone_link](<#/doc/chrono/time_zone_link>)> ordenado contendo a descrição de nomes alternativos de fusos horários (links)
`leap_seconds` | Um [std::vector](<#/doc/container/vector>)<[std::chrono::leap_second](<#/doc/chrono/leap_second>)> ordenado contendo a descrição dos segundos bissextos

### Funções Membro

[ locate_zone](<#/doc/chrono/tzdb/locate_zone>) | localiza um fuso horário com o nome fornecido
(função membro pública)
[ current_zone](<#/doc/chrono/tzdb/current_zone>) | retorna o fuso horário local
(função membro pública)