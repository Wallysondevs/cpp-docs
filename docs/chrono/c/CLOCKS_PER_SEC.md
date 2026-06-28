# CLOCKS_PER_SEC

Definido no header `[<ctime>](<#/doc/header/ctime>)`
#define CLOCKS_PER_SEC /* implementation-defined */

Expande para uma expressão (não necessariamente uma constante em tempo de compilação) do tipo [std::clock_t](<#/doc/chrono/c/clock_t>) igual ao número de *clock ticks* por segundo, conforme retornado por [std::clock()](<#/doc/chrono/c/clock>).

### Notas

POSIX define [CLOCKS_PER_SEC](<https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/time.h.html>) como 1'000'000, independentemente da precisão real de [std::clock()](<#/doc/chrono/c/clock>).

### Exemplo

Execute este código
```
    #include <ctime>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const std::clock_t cps{CLOCKS_PER_SEC};
        std::cout.imbue(std::locale("en_US.utf8"));
        std::cout << cps << '\n';
    }
```

Saída possível:
```
    1,000,000
```

### Veja também

[ clock](<#/doc/chrono/c/clock>) | retorna o tempo de clock bruto do processador desde o início do programa
(função)
[ clock_t](<#/doc/chrono/c/clock_t>) | tempo de execução do processo
(typedef)
[Documentação C](<#/>) para CLOCKS_PER_SEC