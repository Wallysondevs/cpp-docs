# std::timespec

Definido no header `[<ctime>](<#/doc/header/ctime>)`

```cpp
struct timespec;  // (desde C++17)
```

  
Estrutura que armazena um intervalo dividido em segundos e nanossegundos.

### Membros de dados

Membro  |  Descrição   
---|---
[std::time_t](<#/doc/chrono/c/time_t>) `tv_sec` |  segundos inteiros, o valor é >= ​0​   
(objeto membro público)  
long `tv_nsec` |  nanossegundos, o valor está no intervalo `[`​0​`, `999999999`]`   
(objeto membro público)  
  
A ordem de declaração de `tv_sec` e `tv_nsec` não é especificada. A implementação pode adicionar outros membros de dados a `timespec`.

### Notas

O tipo de `tv_nsec` é long long em algumas plataformas, o que atualmente não está em conformidade com C++, mas é permitido em C desde C23.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
     
    int main()
    {
        std::timespec ts;
        std::timespec_get(&ts, TIME_UTC);
        char buff[0x80];
        std::strftime(buff, sizeof buff, "%D %T", std::gmtime(&ts.tv_sec));
     
    //  auto [sec, nsec] = ts; // UB: structured bindings não devem ser usados porque a
                               // ordem de declaração e a lista de membros de dados não são especificadas
     
        std::cout << "Current time: " << buff << " (UTC)\n"
                  << "Raw timespec.tv_sec: " << ts.tv_sec << '\n'
                  << "Raw timespec.tv_nsec: " << ts.tv_nsec << '\n';
    }
```

Saída possível:
```
    Current time: 04/06/23 12:03:31 (UTC)
    Raw timespec.tv_sec: 1680782611
    Raw timespec.tv_nsec: 678437213
```

### Veja também

[ timespec_get](<#/doc/chrono/c/timespec_get>)(C++17) |  retorna o tempo do calendário em segundos e nanossegundos com base em uma dada base de tempo   
(função)  
[ tm](<#/doc/chrono/c/tm>) |  tipo de tempo do calendário   
(classe)  
[documentação C](<#/>) para timespec