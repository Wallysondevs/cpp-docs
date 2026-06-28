# Requisitos nomeados C++: ConstexprIterator (desde C++20)

Um **ConstexprIterator** é um [LegacyIterator](<#/doc/named_req/Iterator>) que pode ser usado durante a avaliação de expressões constantes.

### Requisitos

O tipo It satisfaz ConstexprIterator se

  * O tipo It satisfaz alguns requisitos de iterator MeowIterator

E, para cada

  * purr, uma operação em It que é exigida para ser suportada por MeowIterator,
  * kittens..., um conjunto de argumentos para purr que atende aos requisitos para essa operação,

Então

  * purr(kittens...) pode ser usado em uma expressão constante se kittens... também puder ser usado.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão são **ConstexprIterator s**.

  * [`array::iterator`](<#/doc/container/array>) and [`array::const_iterator`](<#/doc/container/array>).
  * [`basic_string_view::iterator`](<#/doc/string/basic_string_view>).
  * [`span::iterator`](<#/doc/container/span>).
  * [`vector::iterator`](<#/doc/container/vector>) and [`vector::const_iterator`](<#/doc/container/vector>).

  * [`optional::iterator`](<#/doc/utility/optional>) and [`optional::const_iterator`](<#/doc/utility/optional>)

| (desde C++26)

### Ver também

[**Iterator library**](<#/doc/iterator>) | fornece definições para iterators, traits de iterator, adaptadores e funções de utilidade
  *[_(as is)_]: A::pointer