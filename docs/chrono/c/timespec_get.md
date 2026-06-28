# std::timespec_get

Definido no header `[<ctime>](<#/doc/header/ctime>)`

```cpp
int timespec_get( std::timespec* ts, int base );  // (1) (desde C++17)
#define TIME_UTC /* implementation-defined */  // (2) (desde C++17)
```

1) Modifica o objeto [std::timespec](<#/doc/chrono/c/timespec>) apontado por ts para conter o tempo de calendário atual na base de tempo base.

2) Expande para um valor adequado para uso como argumento base de `std::timespec_get`.

Outras constantes de macro começando com `TIME_` podem ser fornecidas pela implementação para indicar bases de tempo adicionais.

Se base for `TIME_UTC`, então

*   ts->tv_sec é definido como o número de segundos desde uma época definida pela implementação, truncado para um valor inteiro,
*   o membro ts->tv_nsec é definido como o número inteiro de nanossegundos, arredondado para a resolução do relógio do sistema.

### Parâmetros

- **ts** — ponteiro para um objeto do tipo [std::timespec](<#/doc/chrono/c/timespec>)
- **base** — `TIME_UTC` ou outro valor inteiro não-zero indicando a base de tempo

### Valor de retorno

O valor de base se bem-sucedido, zero caso contrário.

### Notas

A função POSIX [`clock_gettime(CLOCK_REALTIME, ts)`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/clock_getres.html>) também pode ser usada para preencher um `std::timespec` com o tempo desde a Época.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
     
    int main()
    {
        std::timespec ts;
        std::timespec_get(&ts, TIME_UTC);
        char buf[100];
        std::strftime(buf, sizeof buf, "%D %T", std::gmtime(&ts.tv_sec));
        std::cout << "Current time: " << buf << '.' << ts.tv_nsec << " UTC\n";
    }
```

Saída possível:
```
    Current time: 06/24/16 20:07:42.949494132 UTC
```

### Veja também

[ timespec](<#/doc/chrono/c/timespec>)(C++17) | tempo em segundos e nanossegundos
---|---
(struct) |
[ time](<#/doc/chrono/c/time>) | retorna o tempo atual do sistema como tempo desde a época
(function) |
[Documentação C](<#/>) para timespec_get