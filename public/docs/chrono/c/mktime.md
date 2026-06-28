# std::mktime

Definido no header `[<ctime>](<#/doc/header/ctime>)`

```cpp
std::time_t mktime( std::tm* time );
```

Converte o tempo de calendário local para um tempo desde a epoch como um objeto [std::time_t](<#/doc/chrono/c/time_t>). time->tm_wday e time->tm_yday são ignorados. Os valores em time podem estar fora de seus intervalos normais.

Um valor negativo de time->tm_isdst faz com que `mktime` tente determinar se o Horário de Verão estava em vigor.

Se a conversão for bem-sucedida, o objeto time é modificado. Todos os campos de time são atualizados para se ajustarem aos seus intervalos apropriados. time->tm_wday e time->tm_yday são recalculados usando informações disponíveis em outros campos.

### Parâmetros

- **time** — ponteiro para um objeto [std::tm](<#/doc/chrono/c/tm>) especificando o tempo de calendário local a ser convertido

### Valor de retorno

Tempo desde a epoch como um objeto [std::time_t](<#/doc/chrono/c/time_t>) em caso de sucesso ou -1 se o tempo não puder ser representado como um objeto [std::time_t](<#/doc/chrono/c/time_t>).

### Notas

Se o objeto [std::tm](<#/doc/chrono/c/tm>) foi obtido de [std::get_time](<#/doc/io/manip/get_time>) ou do POSIX [`strptime`](<https://pubs.opengroup.org/onlinepubs/009695399/functions/strptime.html>), o valor de `tm_isdst` é indeterminado e precisa ser definido explicitamente antes de chamar `mktime`.

### Exemplo

Constrói um tempo local explicitamente.

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
        std::tm local = *std::localtime(&t);
    
        std::cout << "local: " << std::put_time(&local, "%c %Z") << '\n';
    }
```

Saída possível:
```
    local: Sat Feb 15 10:15:00 2020 PST
```

### Veja também

[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a epoch para o tempo de calendário expresso como tempo local
(função)
[documentação C](<#/>) para mktime