# std::localtime

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
std::tm* localtime( const std::time_t* time );
```

Converte o tempo dado desde a época como um valor [std::time_t](<#/doc/chrono/c/time_t>) em tempo de calendário, expresso em tempo local.

### Parâmetros

- **time** — ponteiro para um objeto [std::time_t](<#/doc/chrono/c/time_t>) a ser convertido

### Valor de retorno

Ponteiro para um objeto [std::tm](<#/doc/chrono/c/tm>) interno estático em caso de sucesso, ou ponteiro nulo caso contrário. A estrutura pode ser compartilhada entre [std::gmtime](<#/doc/chrono/c/gmtime>), **std::localtime**, e [std::ctime](<#/doc/chrono/c/ctime>), e pode ser sobrescrita a cada invocação.

### Notas

Esta função pode não ser thread-safe.

POSIX exige que esta função defina [errno](<#/doc/error/errno>) para [EOVERFLOW](<#/doc/error/errno_macros>) se falhar porque o argumento é muito grande.

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/localtime.html>) que a informação de fuso horário é determinada por esta função como se chamasse [`tzset`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/tzset.html>), que lê a variável de ambiente TZ.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        setenv("TZ", "/usr/share/zoneinfo/America/Los_Angeles", 1); // POSIX-specific
    
        std::tm tm{}; // Zero initialise
        tm.tm_year = 2020 - 1900; // 2020
        tm.tm_mon = 2 - 1; // February
        tm.tm_mday = 15; // 15th
        tm.tm_hour = 10;
        tm.tm_min = 15;
        tm.tm_isdst = 0; // Not daylight saving
        std::time_t t = std::mktime(&tm); 
    
        std::cout << "UTC:   " << std::put_time(std::gmtime(&t), "%c %Z") << '\n';
        std::cout << "local: " << std::put_time(std::localtime(&t), "%c %Z") << '\n';
    }
```

Saída possível:
```
    UTC:   Sat Feb 15 18:15:00 2020 GMT
    local: Sat Feb 15 10:15:00 2020 PST
```

### Veja também

[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a época em tempo de calendário expresso como Tempo Universal Coordenado
(função)
[ localtimelocaltime_rlocaltime_s](<#/>)(C23)(C11) | converte o tempo desde a época em tempo de calendário expresso como tempo local
(função)
[Documentação C](<#/>) para localtime