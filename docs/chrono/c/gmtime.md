# std::gmtime

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
std::tm* gmtime( const std::time_t* time );
```

Converte o tempo fornecido desde a época como um valor [std::time_t](<#/doc/chrono/c/time_t>) em tempo de calendário, expresso em Tempo Universal Coordenado (UTC).

### Parâmetros

- **time** — ponteiro para um objeto time_t a ser convertido

### Valor de retorno

Ponteiro para um objeto [std::tm](<#/doc/chrono/c/tm>) interno estático em caso de sucesso, ou ponteiro nulo caso contrário. A estrutura pode ser compartilhada entre **std::gmtime** , [std::localtime](<#/doc/chrono/c/localtime>), e [std::ctime](<#/doc/chrono/c/ctime>) e pode ser sobrescrita a cada invocação.

### Notas

Esta função pode não ser thread-safe.

POSIX exige que esta função defina [errno](<#/doc/error/errno>) para [EOVERFLOW](<#/doc/error/errno_macros>) se falhar porque o argumento é muito grande.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        setenv("TZ", "/usr/share/zoneinfo/Europe/London", 1); // POSIX-specific
    
        std::tm tm{}; // get_time does not set all fields hence {}
        tm.tm_year = 2020 - 1900; // 2020
        tm.tm_mon = 7 - 1; // July
        tm.tm_mday = 15; // 15th
        tm.tm_hour = 10;
        tm.tm_min = 15;
        tm.tm_isdst = 1; // Daylight saving in London
        std::time_t t = std::mktime(&tm); 
    
        std::cout << "UTC:   " << std::put_time(std::gmtime(&t), "%c %Z") << '\n';
        std::cout << "local: " << std::put_time(std::localtime(&t), "%c %Z") << '\n';
    }
```

Saída possível:
```
    UTC:   Wed Jul 15 09:15:00 2020 GMT
    local: Wed Jul 15 10:15:00 2020 BST
```

### Veja também

[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a época para tempo de calendário expresso como tempo local
(função)
[Documentação C](<#/>) para gmtime