# Atributo C++: fallthrough (desde C++17)

Indica que a passagem direta (fall through) do rótulo case anterior é intencional e não deve ser diagnosticada por um compilador que emite avisos sobre fallthrough.

### Sintaxe

---
`[[fallthrough]]`

### Explicação

Pode ser aplicado apenas a uma [declaração nula](<#/doc/language/statements>) para criar uma _declaração fallthrough_ ([[fallthrough]];).

Uma declaração fallthrough pode ser usada apenas em uma declaração [switch](<#/doc/language/switch>), onde a próxima declaração a ser executada é uma declaração com um rótulo case ou default para aquela declaração switch. Se a declaração fallthrough estiver dentro de um loop, a próxima declaração (rotulada) deve fazer parte da mesma iteração desse loop.

### Exemplo

Execute este código
```cpp
    void f(int n)
    {
        void g(), h(), i();
 
        switch (n)
        {
            case 1:
            case 2:
                g();
                [[fallthrough]];
            case 3: // sem aviso sobre fallthrough
                h();
            case 4: // o compilador pode avisar sobre fallthrough
                if (n < 3)
                {
                    i();
                    [[fallthrough]]; // OK
                }
                else
                {
                    return;
                }
            case 5:
                while (false)
                {
                    [[fallthrough]]; // malformado: a próxima declaração não é
                                     //             parte da mesma iteração
                }
            case 6:
                [[fallthrough]]; // malformado, sem rótulo case ou default subsequente
        }
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2406](<https://cplusplus.github.io/CWG/issues/2406.html>) | C++17 | [[fallthrough]] poderia aparecer em um loop aninhado dentro da declaração switch de destino | proibido

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

  * 9.12.6 Atributo fallthrough [dcl.attr.fallthrough]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 9.12.5 Atributo fallthrough [dcl.attr.fallthrough]

* Padrão C++17 (ISO/IEC 14882:2017):

  * 10.6.5 Atributo fallthrough [dcl.attr.fallthrough]

### Veja também

[Documentação C](<#/>) para fallthrough
---