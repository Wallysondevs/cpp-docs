# Atributo C++: carries_dependency (desde C++11)

Indica que a cadeia de dependência em [std::memory_order](<#/doc/atomic/memory_order>) release-consume se propaga para dentro e para fora da função, o que permite ao compilador pular instruções de barreira de memória desnecessárias.

### Sintaxe

---
`[[carries_dependency]]`
---

### Explicação

Este atributo pode aparecer em duas situações:

1) pode ser aplicado às declarações de parâmetros de uma função ou lambda-expressions, caso em que indica que a inicialização do parâmetro carrega dependência para a conversão de lvalue para rvalue desse objeto.

2) Pode ser aplicado à declaração da função como um todo, caso em que indica que o valor de retorno carrega dependência para a avaliação da expressão de chamada da função.

Este atributo deve aparecer na primeira declaração de uma função ou de um de seus parâmetros em qualquer unidade de tradução. Se não for usado na primeira declaração de uma função ou de um de seus parâmetros em outra unidade de tradução, o programa estará malformado; nenhum diagnóstico é exigido.

### Exemplo

Adaptado quase sem alterações de [SO](<https://stackoverflow.com/a/6411703>).

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
     
    void print(int* val)
    {
        std::cout << *val << std::endl;
    }
     
    void print2(int* val [[carries_dependency]])
    {
        std::cout << *val << std::endl;
    }
     
    int main()
    {
        int x{42};
        std::atomic<int*> p = &x;
        int* local = p.load(std::memory_order_consume);
     
        if (local)
        {
            // The dependency is explicit, so the compiler knows that local is
            // dereferenced, and that it must ensure that the dependency chain
            // is preserved in order to avoid a fence (on some architectures).
            std::cout << *local << std::endl;
        }
     
        if (local)
        {
            // The definition of print is opaque (assuming it is not inlined),
            // so the compiler must issue a fence in order to ensure that
            // reading *p in print returns the correct value.
            print(local);
        }
     
        if (local)
        {
            // The compiler can assume that although print2 is also opaque then
            // the dependency from the parameter to the dereferenced value is
            // preserved in the instruction stream, and no fence is necessary (on
            // some architectures). Obviously, the definition of print2 must actually
            // preserve this dependency, so the attribute will also impact the
            // generated code for print2.
            print2(local);
        }
    }
```

Saída possível:
```
    42
    42
    42
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 9.12.4 Atributo carries dependency [dcl.attr.depend]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 9.12.3 Atributo carries dependency [dcl.attr.depend]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 10.6.3 Atributo carries dependency [dcl.attr.depend]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 7.6.4 Atributo carries dependency [dcl.attr.depend]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 7.6.4 Atributo carries dependency [dcl.attr.depend]

### Veja também

[ kill_dependency](<#/doc/atomic/kill_dependency>)(C++11) | remove o objeto especificado da árvore de dependência [std::memory_order_consume](<#/doc/atomic/memory_order>)
(function template)