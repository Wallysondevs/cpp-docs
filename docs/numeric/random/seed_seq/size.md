# std::seed_seq::size

```cpp
std::size_t size() const noexcept;  // (desde C++11)
```

Retorna o tamanho da sequência de sementes subjacente.

### Valor de retorno

`_[v](<#/doc/numeric/random/seed_seq>)_` ﻿.size()

### Complexidade

Tempo constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <random>
     
    int main()
    {
        std::seed_seq s1 = {-1, 0, 1};
        std::cout << s1.size() << '\n';
    }
```

Saída:
```
    3
```

### Relatório de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2440](<https://cplusplus.github.io/LWG/issue2440>) | C++11 | `seed_seq::size` não era noexcept | tornado noexcept