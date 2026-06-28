# Suporte a tipos (tipos básicos, RTTI)

Veja também [visão geral do sistema de tipos](<#/doc/language/type-id>) e [tipos fundamentais definidos pela linguagem](<#/doc/language/types>).

### Tipos básicos e macros adicionais

Definido no header `[<cstddef>](<#/doc/header/cstddef>)`
---
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)
[ ptrdiff_t](<#/doc/types/ptrdiff_t>) | tipo inteiro com sinal retornado ao subtrair dois ponteiros
(typedef)
[ nullptr_t](<#/doc/types/nullptr_t>)(desde C++11) | o tipo do literal de ponteiro nulo [`nullptr`](<#/doc/language/nullptr>)
(typedef)
[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(macro constante)
[ max_align_t](<#/doc/types/max_align_t>)(desde C++11) | tipo trivial com requisito de alinhamento tão grande quanto qualquer outro tipo escalar
(typedef)
[ offsetof](<#/doc/types/offsetof>) | deslocamento em bytes do início de um tipo [standard-layout](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)
[ byte](<#/doc/types/byte>)(desde C++17) | o tipo byte
(enum)
---
Definido no header `[<cstdbool>](<#/doc/header/cstdbool>)(obsoleto) (até C++20)`

```cpp
Definido no header `<stdbool.h>`
__bool_true_false_are_defined(desde C++11)(obsoleto)
(macro constante)
Definido no header `<cstdalign>(obsoleto) (até C++20)`
Definido no header `<stdalign.h>`
__alignas_is_defined(desde C++11)(obsoleto)
(macro constante)
__alignof_is_defined(desde C++11)(obsoleto)
(macro constante)
```

### [Tipos inteiros de largura fixa](<#/doc/types/integer>) (desde C++11)

### [Tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>) (desde C++23)

### Limites numéricos

Definido no header `[<limits>](<#/doc/header/limits>)`
---
[ numeric_limits](<#/doc/types/numeric_limits>) | fornece uma interface para consultar propriedades de todos os tipos numéricos fundamentais
(modelo de classe)

#### [Interface de limites numéricos C](<#/doc/types/climits>)

### Identificação de tipo em tempo de execução

Definido no header `[<typeinfo>](<#/doc/header/typeinfo>)`
---
[ type_info](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)
[ bad_typeid](<#/doc/types/bad_typeid>) | exceção lançada se um argumento em uma [expressão typeid](<#/doc/language/typeid>) for nulo
(classe)
[ bad_cast](<#/doc/types/bad_cast>) | exceção lançada por uma expressão [`dynamic_cast`](<#/doc/language/dynamic_cast>) inválida, ou seja, uma conversão de tipo de referência falha
(classe)
Definido no header `[<typeindex>](<#/doc/header/typeindex>)`

```cpp
 type_index(desde C++11)
(classe)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 4036](<https://cplusplus.github.io/LWG/issue4036>) | C++11 | `__alignof_is_defined` foi subespecificado no padrão C++ | especificado e obsoleto

### Veja também

[Biblioteca de type traits e metaprogramação](<#/doc/meta>)
---
[Documentação C](<#/>) para a biblioteca de suporte a tipos