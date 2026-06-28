# Requisitos nomeados C++: RangeAdaptorClosureObject (desde C++20)

_Objetos de fechamento de adaptador de range_ são [FunctionObjects](<#/doc/named_req/FunctionObject>) que são chamáveis através do operador pipe: se C é um objeto de fechamento de adaptador de range e R é um [`range`](<#/doc/ranges/range>), estas duas expressões são [equivalentes](<#/doc/language/expressions>):
```cpp
    C(R)
    R | C
```

Dois objetos de fechamento de adaptador de range podem ser encadeados pelo operador| para produzir outro objeto de fechamento de adaptador de range: se C e D são objetos de fechamento de adaptador de range, então C | D produz um objeto de fechamento de adaptador de range E com as seguintes propriedades:

*   E armazena uma cópia de C e D, inicializadas diretamente (não por lista) a partir de [std::forward](<#/doc/utility/forward>)<decltype((C))>(C) e [std::forward](<#/doc/utility/forward>)<decltype((D))>(D) respectivamente. Se tal inicialização for inválida, C | D também é inválido.
*   Sejam c e d as cópias armazenadas (com a mesma constness e categoria de valor que E), e R seja um objeto [`range`](<#/doc/ranges/range>), as seguintes expressões são [equivalentes](<#/doc/language/expressions>):

```cpp
    d(c(R))
    R | c | d
    E(R)
    R | E // R | (C | D)
```

Notas: operator() não é suportado para versões qualificadas como volatile ou const-volatile de tipos de objeto de fechamento de adaptador de range.

Objetos cujo tipo é o mesmo que um dos seguintes objetos (ignorando a qualificação cv) são objetos de fechamento de adaptador de range:

*   objetos de adaptador de range unários,
*   objetos de tipos definidos pelo usuário que atendem [aos requisitos para implementar um objeto de fechamento de adaptador de range](<#/doc/ranges/range_adaptor_closure>),

| (desde C++23)

*   os resultados da vinculação de argumentos finais por objetos de adaptador de range, e
*   os resultados do encadeamento de dois objetos de fechamento de adaptador de range pelo operador|.

### Veja também

[ ranges::range_adaptor_closure](<#/doc/ranges/range_adaptor_closure>)(C++23) | template de classe base auxiliar para definir um objeto de fechamento de adaptador de range
(template de classe)
*[_(as is)_]: A::pointer