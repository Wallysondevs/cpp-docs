# std::tm

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
struct tm;
```

Estrutura que armazena uma data e hora de calendário decompostas em seus componentes.

### Membros de objeto

int tm_sec | segundos após o minuto – `[`​0​`, `61`]`(ate C++11) `[`​0​`, `60`]`(desde C++11)[nota 1](<#/doc/chrono/c/tm>)
(membro de objeto público)
int tm_min | minutos após a hora – `[`​0​`, `59`]`
(membro de objeto público)
int tm_hour | horas desde a meia-noite – `[`​0​`, `23`]`
(membro de objeto público)
int tm_mday | dia do mês – `[`1`, `31`]`
(membro de objeto público)
int tm_mon | meses desde janeiro – `[`​0​`, `11`]`
(membro de objeto público)
int tm_year | anos desde 1900
(membro de objeto público)
int tm_wday | dias desde domingo – `[`​0​`, `6`]`
(membro de objeto público)
int tm_yday | dias desde 1º de janeiro – `[`​0​`, `365`]`
(membro de objeto público)
int tm_isdst | Flag de Horário de Verão. O valor é positivo se o Horário de Verão estiver em vigor, zero se não estiver e negativo se nenhuma informação estiver disponível.
(membro de objeto público)

1. [↑](<#/doc/chrono/c/tm>) O intervalo permite um segundo bissexto positivo. Dois segundos bissextos no mesmo minuto não são permitidos (o intervalo `[`​0​`, `61`]` foi um defeito introduzido em C89 e corrigido em C99).

### Notas

As bibliotecas C BSD, GNU e musl suportam dois membros adicionais, que são padronizados em [POSIX.1-2024](<https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/time.h.html>).

long tm_gmtoff | segundos a leste do UTC
(membro de objeto público)
const char* tm_zone | abreviação do fuso horário
(membro de objeto público)

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
     
    int main()
    {
        std::tm tm{};
        tm.tm_year = 2022 - 1900;
        tm.tm_mday = 1;
        std::mktime(&tm);
     
        std::cout << std::asctime(&tm); // note implicit trailing '\n'
    }
```

Saída possível:
```
    Sat Jan  1 00:00:00 2022
```

### Veja também

[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a época para o tempo de calendário expresso como hora local
(função)
[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a época para o tempo de calendário expresso como Tempo Universal Coordenado
(função)
[Documentação C](<#/>) para tm