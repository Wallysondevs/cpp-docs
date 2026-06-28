# Atributo C++: maybe_unused (desde C++17)

Suprime avisos sobre entidades não utilizadas.

### Sintaxe

---
`[[maybe_unused]]`

### Explicação

Este atributo pode aparecer na declaração das seguintes entidades:

  * [classe/struct/union](<#/doc/language/classes>): struct [[maybe_unused]] S;
  * [typedef](<#/doc/language/typedef>), incluindo aqueles declarados por [declaração de alias](<#/doc/language/type_alias>): [[maybe_unused]] typedef S* PS;, using PS [[maybe_unused]] = S*;
  * variável, incluindo [membro de dados estático](<#/doc/language/static>): [[maybe_unused]] int x;
  * [membro de dados não estático](<#/doc/language/data_members>): union U { [[maybe_unused]] int n; };,
  * [função](<#/doc/language/function>): [[maybe_unused]] void f();
  * [enumeração](<#/doc/language/enum>): enum [[maybe_unused]] E {};
  * enumerador: enum { A [[maybe_unused]], B [[maybe_unused]] = 42 };
  * [structured binding](<#/doc/language/structured_binding>): [[maybe_unused]] auto [a, b] = [std::make_pair](<#/doc/utility/pair/make_pair>)(42, 0.23);

Para entidades declaradas [[maybe_unused]], se as entidades ou seus structured bindings não forem utilizados, o aviso sobre entidades não utilizadas emitido pelo compilador é suprimido.

Para rótulos declarados [[maybe_unused]], se eles não forem utilizados, o aviso sobre rótulos não utilizados emitido pelo compilador é suprimido. | (desde C++26)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    
    [[maybe_unused]] void f([[maybe_unused]] bool thing1,
                            [[maybe_unused]] bool thing2)
    {
        [[maybe_unused]] lb: // o rótulo “lb” não é usado, sem aviso
        [[maybe_unused]] bool b = thing1 && thing2;
        assert(b); // no modo release, assert é compilado para fora, e “b” não é usado
                   // sem aviso porque é declarado [[maybe_unused]]
    } // os parâmetros “thing1” e “thing2” não são usados, sem aviso
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 2360](<https://cplusplus.github.io/CWG/issues/2360.html>) | C++17 | não era possível aplicar [[maybe_unused]] a structured bindings | permitido

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 9.12.8 Maybe unused attribute [dcl.attr.unused]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 9.12.7 Maybe unused attribute [dcl.attr.unused]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 10.6.6 Maybe unused attribute [dcl.attr.unused]

### Veja também

[Documentação C](<#/>) para maybe_unused
---