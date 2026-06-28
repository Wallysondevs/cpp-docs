# ATOMIC_FLAG_INIT

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
#define ATOMIC_FLAG_INIT /* implementation-defined */
```

Define o inicializador que pode ser usado para inicializar [std::atomic_flag](<#/doc/atomic/atomic_flag>) para o estado limpo (falso) na forma [std::atomic_flag](<#/doc/atomic/atomic_flag>) v = ATOMIC_FLAG_INIT;. É não especificado se pode ser usado com outros contextos de inicialização.

Se a flag for um [complete object](<#/doc/language/objects>) com [static storage duration](<#/doc/language/storage_duration>), esta [initialization is static](<#/doc/language/initialization>).

Esta é a única maneira de inicializar [std::atomic_flag](<#/doc/atomic/atomic_flag>) para um valor definido: o valor mantido após qualquer outra inicialização é não especificado. | (até C++20)
---|---
Esta macro não é mais necessária, pois o construtor padrão de [std::atomic_flag](<#/doc/atomic/atomic_flag>) a inicializa para o estado limpo. Ela é mantida para compatibilidade com C. | (desde C++20)

### Exemplo

Execute este código
```cpp
    #include <atomic>
    
    std::atomic_flag static_flag = ATOMIC_FLAG_INIT; // inicialização estática,
    // garantido para estar disponível durante a inicialização dinâmica de objetos estáticos.
    
    int main()
    {
        std::atomic_flag automatic_flag = ATOMIC_FLAG_INIT; // garantido para funcionar
    //    std::atomic_flag another_flag(ATOMIC_FLAG_INIT); // não especificado
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2159](<https://cplusplus.github.io/LWG/issue2159>) | C++11 | não estava claro se `ATOMIC_FLAG_INIT`
pode ser usado com outros contextos de inicialização | outros usos não são garantidos
[LWG 3659](<https://cplusplus.github.io/LWG/issue3659>) | C++20 | `ATOMIC_FLAG_INIT` foi descontinuado, mas necessário em C em algumas plataformas | não está mais descontinuado

### Veja também

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano sem bloqueio
(class)
[Documentação C](<#/>) para ATOMIC_FLAG_INIT